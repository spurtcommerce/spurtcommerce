import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReviewAnswerStaticComponent } from './rating-review-answer-static.component';

describe('RatingReviewAnswerStaticComponent', () => {
  let component: RatingReviewAnswerStaticComponent;
  let fixture: ComponentFixture<RatingReviewAnswerStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingReviewAnswerStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatingReviewAnswerStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
