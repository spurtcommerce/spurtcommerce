import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupComponent } from './customer-group.component';

describe('CustomerGroupComponent', () => {
  let component: CustomerGroupComponent;
  let fixture: ComponentFixture<CustomerGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
