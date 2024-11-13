import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierStaticComponent } from './supplier-static.component';

describe('SupplierStaticComponent', () => {
  let component: SupplierStaticComponent;
  let fixture: ComponentFixture<SupplierStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
