import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusPillComponent } from './status-pill.component';

describe('StatusPillComponent', () => {
  let fixture: ComponentFixture<StatusPillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatusPillComponent] }).compileComponents();
    fixture = TestBed.createComponent(StatusPillComponent);
  });

  const pill = () => fixture.nativeElement.querySelector('.pill') as HTMLElement;

  it('muestra el label', () => {
    fixture.componentInstance.label = 'ACTIVO';
    fixture.detectChanges();
    expect(pill().textContent?.trim()).toBe('ACTIVO');
  });

  it('aplica la clase "on" cuando active=true', () => {
    fixture.componentInstance.active = true;
    fixture.detectChanges();
    expect(pill().classList).toContain('on');
  });

  it('no aplica "on" cuando active=false', () => {
    fixture.componentInstance.active = false;
    fixture.detectChanges();
    expect(pill().classList).not.toContain('on');
  });

  it('aplica la clase "sm" cuando size=sm', () => {
    fixture.componentInstance.size = 'sm';
    fixture.detectChanges();
    expect(pill().classList).toContain('sm');
  });
});
