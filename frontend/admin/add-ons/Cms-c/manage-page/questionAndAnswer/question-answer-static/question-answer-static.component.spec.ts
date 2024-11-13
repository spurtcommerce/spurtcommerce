import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswerStaticComponent } from './question-answer-static.component';

describe('QuestionAnswerStaticComponent', () => {
  let component: QuestionAnswerStaticComponent;
  let fixture: ComponentFixture<QuestionAnswerStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAnswerStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionAnswerStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
