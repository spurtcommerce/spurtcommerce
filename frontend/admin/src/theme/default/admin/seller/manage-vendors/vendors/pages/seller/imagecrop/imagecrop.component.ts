import { Component, Input, OnInit } from '@angular/core';
import { CropperSettings, Dimensions, ImageTransform,} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagecrop',
  templateUrl: './imagecrop.component.html',
  styleUrls: ['./imagecrop.component.scss']
})
export class ImagecropComponent implements OnInit {

  @Input() fileName?:any;

  top = 0;
  left = 0;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  title = 'imagecrop';

  cropperMinHeight=500;
  canvasRotation = 0;
  rotation?: any;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 4 / 3;
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {
    translateUnit: 'px'
  };
  // imageURL?:any;
  loading = false;
  allowMoveImage = false;
  hidden = false;
  data: any; 
    cropperSettings!: CropperSettings;
    paramsValue: any;



 
ngOnInit(){
}
  constructor(
    private sanitizer: DomSanitizer,
    private modelService:NgbModal,
    private model:NgbActiveModal,
    public router: Router,
    
  ) {
    
  }

  imageCropped(event:any) {
    
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 ||'');
  
  }

submit(){
  const val = {
    croppedImage: this.croppedImage,
    isChoosed: true
  }
this.model.close(val);
}
    
  zoom(event: any) {
    console.log(event, "Zoom");
  
    // Determine the direction of the zoom based on the input range value.
    const inputValue = event.target.valueAsNumber;
    if (inputValue > 50) {
      // Zoom in
      this.scale = 1 + (inputValue - 50) / 100;
    } else if (inputValue < 50) {
      // Zoom out
      this.scale = 1 - (50 - inputValue) / 100;
    } else {
      // No zoom
      this.scale = 1;
    }
  
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
    
      updateRotation() {
        this.transform = {
          ...this.transform,
          rotate: this.rotation
        };
      }


      imageLoaded(event:any) {
        this.showCropper = true;
      }
    
      cropperReady(sourceImageDimensions: Dimensions) {
        this.loading = false;
      }
    
      loadImageFailed() {
        console.error('Load image failed');
      }

  modelClose(){
    this.model.close('close')
  }

}
