import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSpecificationModalComponent } from './product-specification-modal.component';

describe('ProductSpecificationModalComponent', () => {
  let component: ProductSpecificationModalComponent;
  let fixture: ComponentFixture<ProductSpecificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSpecificationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSpecificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
