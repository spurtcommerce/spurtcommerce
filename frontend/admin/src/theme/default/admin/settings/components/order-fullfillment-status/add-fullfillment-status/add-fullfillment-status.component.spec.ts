import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFullfillmentStatusComponent } from './add-fullfillment-status.component';

describe('AddFullfillmentStatusComponent', () => {
  let component: AddFullfillmentStatusComponent;
  let fixture: ComponentFixture<AddFullfillmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFullfillmentStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFullfillmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
