import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagegallerymodalComponent } from './imagegallerymodal.component';

describe('ImagegallerymodalComponent', () => {
  let component: ImagegallerymodalComponent;
  let fixture: ComponentFixture<ImagegallerymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagegallerymodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagegallerymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
