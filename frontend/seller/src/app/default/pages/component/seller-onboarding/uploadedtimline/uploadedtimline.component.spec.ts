import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedtimlineComponent } from './uploadedtimline.component';

describe('UploadedtimlineComponent', () => {
  let component: UploadedtimlineComponent;
  let fixture: ComponentFixture<UploadedtimlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedtimlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedtimlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
