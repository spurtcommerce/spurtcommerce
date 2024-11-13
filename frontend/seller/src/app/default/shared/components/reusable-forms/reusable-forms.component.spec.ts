import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableFormsComponent } from './reusable-forms.component';

describe('ReusableFormsComponent', () => {
  let component: ReusableFormsComponent;
  let fixture: ComponentFixture<ReusableFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
