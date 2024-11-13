import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQrStaticComponent } from './product-qr-static.component';

describe('ProductQrStaticComponent', () => {
  let component: ProductQrStaticComponent;
  let fixture: ComponentFixture<ProductQrStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductQrStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductQrStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
