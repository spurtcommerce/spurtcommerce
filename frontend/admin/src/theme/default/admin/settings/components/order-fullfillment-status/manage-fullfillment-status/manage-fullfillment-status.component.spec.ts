import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFullfillmentStatusComponent } from './manage-fullfillment-status.component';

describe('ManageFullfillmentStatusComponent', () => {
  let component: ManageFullfillmentStatusComponent;
  let fixture: ComponentFixture<ManageFullfillmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFullfillmentStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFullfillmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
