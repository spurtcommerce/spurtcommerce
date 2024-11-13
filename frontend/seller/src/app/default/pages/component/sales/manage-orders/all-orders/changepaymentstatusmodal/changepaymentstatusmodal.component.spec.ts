import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepaymentstatusmodalComponent } from './changepaymentstatusmodal.component';

describe('ChangepaymentstatusmodalComponent', () => {
  let component: ChangepaymentstatusmodalComponent;
  let fixture: ComponentFixture<ChangepaymentstatusmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangepaymentstatusmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepaymentstatusmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
