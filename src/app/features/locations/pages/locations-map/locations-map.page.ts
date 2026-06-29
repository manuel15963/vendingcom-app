/// <reference types="google.maps" />
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { listOutline, locateOutline } from 'ionicons/icons';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

import { hasGoogleMapsKey, loadGoogleMaps } from '@shared/maps/google-maps-loader';
import { LocationCatalogApiService } from '../../data-access/location-catalog-api.service';
import { LocationsApiService } from '../../data-access/locations-api.service';
import { LocationParameter, LocationResponse } from '../../models/location.models';
import { ParameterGroup, StatusLabel } from '../../models/location.constants';

@Component({
  selector: 'app-locations-map',
  templateUrl: './locations-map.page.html',
  styleUrls: ['./locations-map.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonButton,
    IonContent, IonSpinner, IonIcon,
  ],
})
export class LocationsMapPage implements AfterViewInit {

  private readonly locationsApi = inject(LocationsApiService);
  private readonly catalogApi = inject(LocationCatalogApiService);
  private readonly router = inject(Router);

  @ViewChild('mapEl') mapEl?: ElementRef<HTMLDivElement>;

  loading = true;
  loadError = '';
  total = 0;
  withCoords = 0;
  zones: LocationParameter[] = [];
  selectedZoneId: number | null = null;

  private map?: google.maps.Map;
  private infoWindow?: google.maps.InfoWindow;
  private myMarker?: google.maps.Marker;
  private clusterer?: MarkerClusterer;
  private markers: { marker: google.maps.Marker; location: LocationResponse }[] = [];

  constructor() {
    addIcons({ locateOutline, listOutline });
    this.catalogApi.getByGroup(ParameterGroup.LOCATION_ZONE).subscribe({
      next: (zones) => (this.zones = zones),
    });
  }

  async ngAfterViewInit(): Promise<void> {
    if (!hasGoogleMapsKey()) {
      this.loading = false;
      this.loadError = 'Mapa no disponible: falta configurar la API key de Google Maps.';
      return;
    }
    try {
      await loadGoogleMaps(['maps', 'marker']);
      this.initMap();
      await this.loadLocations();
      this.loading = false;
    } catch {
      this.loading = false;
      this.loadError = 'No se pudo cargar el mapa. Revisa la API key y las APIs habilitadas.';
    }
  }

  private initMap(): void {
    this.map = new google.maps.Map(this.mapEl!.nativeElement, {
      center: { lat: -12.0464, lng: -77.0428 },
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    });
    this.infoWindow = new google.maps.InfoWindow();
  }

  private async loadLocations(): Promise<void> {
    const paged = await firstValueFrom(this.locationsApi.search({ page: 0, size: 100 }));
    this.total = paged.totalElements;
    const located = paged.content.filter((l) => l.latitude != null && l.longitude != null);
    this.withCoords = located.length;

    this.markers = located.map((loc) => ({ marker: this.buildMarker(loc), location: loc }));
    this.clusterer = new MarkerClusterer({ map: this.map, markers: this.markers.map((m) => m.marker) });

    if (located.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      located.forEach((l) => bounds.extend({ lat: l.latitude as number, lng: l.longitude as number }));
      this.map!.fitBounds(bounds);
      if (located.length === 1) {
        this.map!.setZoom(16);
      }
    }
  }

  /** Filtra los pines por zona (null = todas). */
  filterZone(zoneId: number | null): void {
    this.selectedZoneId = zoneId;
    if (!this.clusterer) {
      return;
    }
    const visible = this.markers
      .filter((m) => zoneId == null || m.location.zoneId === zoneId)
      .map((m) => m.marker);
    this.clusterer.clearMarkers();
    this.clusterer.addMarkers(visible);
  }

  private buildMarker(loc: LocationResponse): google.maps.Marker {
    const active = loc.locationStatusName === StatusLabel.ACTIVE;
    const marker = new google.maps.Marker({
      position: { lat: loc.latitude as number, lng: loc.longitude as number },
      title: loc.locationName,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 9,
        fillColor: active ? '#16a34a' : '#94a3b8',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      },
    });
    marker.addListener('click', () => this.openInfo(marker, loc));
    return marker;
  }

  private openInfo(marker: google.maps.Marker, loc: LocationResponse): void {
    const place = loc.zoneName || loc.district || '';
    const subtitle = `${loc.locationTypeName ?? 'Ubicación'}${place ? ' · ' + place : ''}`;
    this.infoWindow!.setContent(
      `<div style="font-family:Inter,system-ui,sans-serif;min-width:190px">
        <strong style="font-size:14px;color:#0b1736">${loc.locationName}</strong>
        <div style="font-size:12px;color:#64748b;margin:4px 0">${subtitle}</div>
        <div style="font-size:12px;color:#64748b">${loc.addressLine ?? ''}</div>
        <button id="go-${loc.locationId}" style="margin-top:8px;border:0;cursor:pointer;background:#126fff;color:#fff;font-weight:700;font-size:12px;padding:7px 12px;border-radius:8px">Ver ficha</button>
      </div>`,
    );
    this.infoWindow!.open(this.map, marker);
    google.maps.event.addListenerOnce(this.infoWindow!, 'domready', () => {
      document
        .getElementById(`go-${loc.locationId}`)
        ?.addEventListener('click', () => void this.router.navigateByUrl(`/locations/${loc.locationId}`));
    });
  }

  /** Centra el mapa en la ubicación actual del usuario (geolocalización del navegador, gratis). */
  locateMe(): void {
    if (!navigator.geolocation || !this.map) {
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const here = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.map!.setCenter(here);
      this.map!.setZoom(14);
      if (this.myMarker) {
        this.myMarker.setPosition(here);
      } else {
        this.myMarker = new google.maps.Marker({
          map: this.map,
          position: here,
          title: 'Mi ubicación',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#126fff',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
        });
      }
    });
  }

  goToList(): void {
    void this.router.navigateByUrl('/locations');
  }
}
