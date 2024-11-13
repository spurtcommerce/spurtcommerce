import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBadgeComponent } from './common-badge.component';

describe('CommonBadgeComponent', () => {
  let component: CommonBadgeComponent;
  let fixture: ComponentFixture<CommonBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
