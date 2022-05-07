import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDashComponent } from './base-dash.component';

describe('BaseDashComponent', () => {
  let component: BaseDashComponent;
  let fixture: ComponentFixture<BaseDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
