import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullfillmentMaapingComponent } from './fullfillment-maaping.component';

describe('FullfillmentMaapingComponent', () => {
  let component: FullfillmentMaapingComponent;
  let fixture: ComponentFixture<FullfillmentMaapingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullfillmentMaapingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullfillmentMaapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
