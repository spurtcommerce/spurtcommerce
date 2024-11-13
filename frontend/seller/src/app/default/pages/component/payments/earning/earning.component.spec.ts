import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningComponent } from './earning.component';

describe('EarningComponent', () => {
  let component: EarningComponent;
  let fixture: ComponentFixture<EarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
