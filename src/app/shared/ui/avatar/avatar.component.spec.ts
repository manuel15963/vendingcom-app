import { TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AvatarComponent] }).compileComponents();
    component = TestBed.createComponent(AvatarComponent).componentInstance;
  });

  it('una palabra => primera letra en mayúscula', () => {
    component.name = 'falabella';
    expect(component.initials).toBe('F');
  });

  it('dos palabras => dos iniciales', () => {
    component.name = 'Saga Falabella';
    expect(component.initials).toBe('SF');
  });

  it('más de dos palabras => solo las dos primeras', () => {
    component.name = 'Banco de Crédito';
    expect(component.initials).toBe('BD');
  });

  it('vacío => fallback C', () => {
    component.name = '';
    expect(component.initials).toBe('C');
  });
});
