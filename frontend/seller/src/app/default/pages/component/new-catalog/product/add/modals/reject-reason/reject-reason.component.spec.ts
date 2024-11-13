import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectReasonComponent } from './reject-reason.component';

describe('RejectReasonComponent', () => {
  let component: RejectReasonComponent;
  let fixture: ComponentFixture<RejectReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
