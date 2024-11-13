import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantStaticComponent } from './product-variant-static.component';

describe('ProductVariantStaticComponent', () => {
  let component: ProductVariantStaticComponent;
  let fixture: ComponentFixture<ProductVariantStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductVariantStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductVariantStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
