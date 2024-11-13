import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionStaticComponent } from './question-static.component';

describe('QuestionStaticComponent', () => {
  let component: QuestionStaticComponent;
  let fixture: ComponentFixture<QuestionStaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionStaticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
