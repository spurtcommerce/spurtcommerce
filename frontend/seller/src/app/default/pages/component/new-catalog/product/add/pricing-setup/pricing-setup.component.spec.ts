import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingSetupComponent } from './pricing-setup.component';

describe('PricingSetupComponent', () => {
  let component: PricingSetupComponent;
  let fixture: ComponentFixture<PricingSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
