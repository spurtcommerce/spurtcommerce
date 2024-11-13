import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullfillmentmodalComponent } from './fullfillmentmodal.component';

describe('FullfillmentmodalComponent', () => {
  let component: FullfillmentmodalComponent;
  let fixture: ComponentFixture<FullfillmentmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullfillmentmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullfillmentmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
