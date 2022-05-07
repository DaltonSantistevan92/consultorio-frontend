import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHorarioComponent } from './doctor-horario.component';

describe('DoctorHorarioComponent', () => {
  let component: DoctorHorarioComponent;
  let fixture: ComponentFixture<DoctorHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
