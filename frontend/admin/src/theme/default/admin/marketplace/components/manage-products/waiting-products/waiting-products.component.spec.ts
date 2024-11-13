import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingProductsComponent } from './waiting-products.component';

describe('WaitingProductsComponent', () => {
  let component: WaitingProductsComponent;
  let fixture: ComponentFixture<WaitingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
