import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedProductsComponent } from './approved-products.component';

describe('ApprovedProductsComponent', () => {
  let component: ApprovedProductsComponent;
  let fixture: ComponentFixture<ApprovedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
