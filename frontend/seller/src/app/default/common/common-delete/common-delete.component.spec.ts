import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDeleteComponent } from './common-delete.component';

describe('CommonDeleteComponent', () => {
  let component: CommonDeleteComponent;
  let fixture: ComponentFixture<CommonDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
