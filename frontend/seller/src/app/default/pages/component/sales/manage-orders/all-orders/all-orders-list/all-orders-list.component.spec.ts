import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersListComponent } from './all-orders-list.component';

describe('AllOrdersListComponent', () => {
  let component: AllOrdersListComponent;
  let fixture: ComponentFixture<AllOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
