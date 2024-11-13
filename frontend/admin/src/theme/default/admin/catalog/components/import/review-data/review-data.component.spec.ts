import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDataComponent } from './review-data.component';

describe('ReviewDataComponent', () => {
  let component: ReviewDataComponent;
  let fixture: ComponentFixture<ReviewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
