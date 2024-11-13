import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedOrdersComponent } from './failed-orders.component';

describe('FailedOrdersComponent', () => {
  let component: FailedOrdersComponent;
  let fixture: ComponentFixture<FailedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
