import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderstatushistoryComponent } from './orderstatushistory.component';

describe('OrderstatushistoryComponent', () => {
  let component: OrderstatushistoryComponent;
  let fixture: ComponentFixture<OrderstatushistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderstatushistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderstatushistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
