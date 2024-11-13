import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFullfillmentAddComponent } from './order-fullfillment-add.component';

describe('OrderFullfillmentAddComponent', () => {
  let component: OrderFullfillmentAddComponent;
  let fixture: ComponentFixture<OrderFullfillmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFullfillmentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFullfillmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
