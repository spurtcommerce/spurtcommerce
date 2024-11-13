import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersViewComponent } from './all-orders-view.component';

describe('AllOrdersViewComponent', () => {
  let component: AllOrdersViewComponent;
  let fixture: ComponentFixture<AllOrdersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
