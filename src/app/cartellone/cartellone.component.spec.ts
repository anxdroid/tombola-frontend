import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelloneComponent } from './cartellone.component';

describe('CartelloneComponent', () => {
  let component: CartelloneComponent;
  let fixture: ComponentFixture<CartelloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartelloneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
