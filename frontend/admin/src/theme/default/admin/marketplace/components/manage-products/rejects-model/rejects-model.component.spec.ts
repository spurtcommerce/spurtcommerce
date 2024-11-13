import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectsModelComponent } from './rejects-model.component';

describe('RejectsModelComponent', () => {
  let component: RejectsModelComponent;
  let fixture: ComponentFixture<RejectsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectsModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
