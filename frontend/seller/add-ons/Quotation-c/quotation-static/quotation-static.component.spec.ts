import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationStaticComponent } from './quotation-static.component';

describe('QuotationStaticComponent', () => {
  let component: QuotationStaticComponent;
  let fixture: ComponentFixture<QuotationStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotationStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotationStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
