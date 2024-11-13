import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSeoStaticComponent } from './product-seo-static.component';

describe('ProductSeoStaticComponent', () => {
  let component: ProductSeoStaticComponent;
  let fixture: ComponentFixture<ProductSeoStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSeoStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSeoStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
