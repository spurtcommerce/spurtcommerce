import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardChangesComponent } from './discard-changes.component';

describe('DiscardChangesComponent', () => {
  let component: DiscardChangesComponent;
  let fixture: ComponentFixture<DiscardChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
