import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPriceStaticComponent } from './assign-price-static.component';

describe('AssignPriceStaticComponent', () => {
  let component: AssignPriceStaticComponent;
  let fixture: ComponentFixture<AssignPriceStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPriceStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignPriceStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
