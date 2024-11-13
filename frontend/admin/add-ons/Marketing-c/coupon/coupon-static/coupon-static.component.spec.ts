import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponStaticComponent } from './coupon-static.component';

describe('CouponStaticComponent', () => {
  let component: CouponStaticComponent;
  let fixture: ComponentFixture<CouponStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
