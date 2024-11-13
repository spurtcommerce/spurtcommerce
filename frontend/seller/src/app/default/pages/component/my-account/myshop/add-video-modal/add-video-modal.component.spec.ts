import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoModalComponent } from './add-video-modal.component';

describe('AddVideoModalComponent', () => {
  let component: AddVideoModalComponent;
  let fixture: ComponentFixture<AddVideoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
