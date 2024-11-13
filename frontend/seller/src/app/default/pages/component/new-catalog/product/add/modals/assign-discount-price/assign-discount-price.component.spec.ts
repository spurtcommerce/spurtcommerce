import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDiscountPriceComponent } from './assign-discount-price.component';

describe('AssignDiscountPriceComponent', () => {
  let component: AssignDiscountPriceComponent;
  let fixture: ComponentFixture<AssignDiscountPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDiscountPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDiscountPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
