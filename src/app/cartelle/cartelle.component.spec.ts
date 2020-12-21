import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelleComponent } from './cartelle.component';

describe('CartelleComponent', () => {
  let component: CartelleComponent;
  let fixture: ComponentFixture<CartelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartelleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
