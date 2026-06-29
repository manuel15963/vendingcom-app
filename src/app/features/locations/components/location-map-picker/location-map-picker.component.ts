/// <reference types="google.maps" />
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

import { hasGoogleMapsKey, loadGoogleMaps } from '@shared/maps/google-maps-loader';

/** Lo que el mapa devuelve al elegir un punto. */
export interface PickedLocation {
  latitude: number;
  longitude: number;
  addressLine?: string;
  district?: string;
  province?: string;
  department?: string;
  country?: string;
  postalCode?: string;
}

/**
 * Selector de ubicación con Google Maps:
 * - Caja de búsqueda con autocompletado (Places), sesgada a Perú.
 * - Mapa con un pin arrastrable; también se puede hacer clic en el mapa.
 * - Al elegir/arrastrar, hace reverse-geocoding y emite coordenadas + dirección.
 * Si falta la API key, muestra un aviso y el formulario sigue funcionando a mano.
 */
@Component({
  selector: 'app-location-map-picker',
  templateUrl: './location-map-picker.component.html',
  styleUrls: ['./location-map-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, IonSpinner],
})
export class LocationMapPickerComponent implements AfterViewInit, OnChanges {

  /** Coordenadas iniciales (al editar una ubicación existente). */
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;
  /** Solo lectura: pin fijo, sin buscador ni arrastre (para la ficha de la ubicación). */
  @Input() readOnly = false;
  @Output() picked = new EventEmitter<PickedLocation>();

  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  @ViewChild('mapEl') mapEl?: ElementRef<HTMLDivElement>;

  loading = true;
  loadError = '';

  /** Centro por defecto: Lima, Perú. */
  private static readonly DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };

  private map?: google.maps.Map;
  private marker?: google.maps.Marker;
  private geocoder?: google.maps.Geocoder;

  get hasApiKey(): boolean {
    return hasGoogleMapsKey();
  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.hasApiKey) {
      this.loading = false;
      this.loadError = 'Mapa no disponible: falta configurar la API key de Google Maps (environment.googleMapsApiKey).';
      return;
    }

    try {
      await loadGoogleMaps(['maps', 'places', 'geocoding']);
      this.geocoder = new google.maps.Geocoder();
      this.setupMap();
      if (!this.readOnly) {
        this.setupAutocomplete();
      }
      this.loading = false;
    } catch {
      this.loading = false;
      this.loadError = 'No se pudo cargar Google Maps. Revisa la API key y que las APIs (Maps JavaScript, Places, Geocoding) estén habilitadas.';
    }
  }

  /** Si las coordenadas llegan después (modo edición), recentra el mapa. */
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['latitude'] || changes['longitude']) && this.map && this.latitude != null && this.longitude != null) {
      const pos = { lat: this.latitude, lng: this.longitude };
      this.map.setCenter(pos);
      this.map.setZoom(16);
      this.marker?.setPosition(pos);
    }
  }

  /** Abre Google Maps con la ruta desde la ubicación actual del usuario hasta este punto. */
  openDirections(): void {
    if (this.latitude == null || this.longitude == null) {
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&destination=${this.latitude},${this.longitude}&travelmode=driving`;
    window.open(url, '_blank');
  }

  private setupMap(): void {
    const hasInitial = this.latitude != null && this.longitude != null;
    const center = hasInitial
      ? { lat: this.latitude as number, lng: this.longitude as number }
      : LocationMapPickerComponent.DEFAULT_CENTER;

    this.map = new google.maps.Map(this.mapEl!.nativeElement, {
      center,
      zoom: hasInitial ? 16 : 12,
      // En modo edición: deja ampliar a pantalla completa y cambiar a satélite para ubicar con precisión.
      mapTypeControl: !this.readOnly,
      streetViewControl: false,
      fullscreenControl: !this.readOnly,
      clickableIcons: false,
    });

    this.marker = new google.maps.Marker({ map: this.map, position: center, draggable: !this.readOnly });

    if (this.readOnly) {
      return;
    }

    this.marker.addListener('dragend', () => {
      const pos = this.marker?.getPosition();
      if (pos) {
        this.reverseGeocode(pos.lat(), pos.lng());
      }
    });

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.marker?.setPosition(event.latLng);
        this.reverseGeocode(event.latLng.lat(), event.latLng.lng());
      }
    });
  }

  private setupAutocomplete(): void {
    if (!this.searchInput) {
      return;
    }
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, {
      fields: ['geometry', 'address_components', 'formatted_address'],
      componentRestrictions: { country: 'pe' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
      if (!location) {
        return;
      }
      const lat = location.lat();
      const lng = location.lng();
      this.map?.setCenter({ lat, lng });
      this.map?.setZoom(16);
      this.marker?.setPosition({ lat, lng });
      this.picked.emit({ latitude: lat, longitude: lng, ...this.parseComponents(place.address_components ?? []) });
    });
  }

  /** Tras clic/arrastre en el mapa: busca la dirección de esas coordenadas. */
  private reverseGeocode(lat: number, lng: number): void {
    if (!this.geocoder) {
      this.picked.emit({ latitude: lat, longitude: lng });
      return;
    }
    this.geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      const parsed = status === 'OK' && results && results[0]
        ? this.parseComponents(results[0].address_components)
        : {};
      this.picked.emit({ latitude: lat, longitude: lng, ...parsed });
    });
  }

  /** Traduce los address_components de Google a los campos del formulario (mapeo Perú). */
  private parseComponents(components: google.maps.GeocoderAddressComponent[]): Partial<PickedLocation> {
    const pick = (type: string) => components.find((c) => c.types.includes(type))?.long_name;
    const route = pick('route');
    const streetNumber = pick('street_number');
    const addressLine = [route, streetNumber].filter(Boolean).join(' ') || undefined;
    return {
      addressLine,
      district: pick('locality') || pick('sublocality_level_1') || pick('administrative_area_level_3'),
      province: pick('administrative_area_level_2'),
      department: pick('administrative_area_level_1'),
      country: pick('country'),
      postalCode: pick('postal_code'),
    };
  }
}
