import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableErrorMessageComponent } from './reusable-error-message.component';

describe('ReusableErrorMessageComponent', () => {
  let component: ReusableErrorMessageComponent;
  let fixture: ComponentFixture<ReusableErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableErrorMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
