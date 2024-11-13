import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFullfillmentComponent } from './order-fullfillment.component';

describe('OrderFullfillmentComponent', () => {
  let component: OrderFullfillmentComponent;
  let fixture: ComponentFixture<OrderFullfillmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFullfillmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFullfillmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
