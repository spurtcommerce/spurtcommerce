import { Directive, ElementRef, Input } from '@angular/core';
import { apiResponse } from '../../services/permission.constant';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {
  @Input() appShowHide?: any = false;
  @Input() multipleHideUnAuthorized?: any = [];
  @Input() hideUnAuthorized?:string = null;

  constructor(private el: ElementRef) {
  }

   ngOnInit() {
    const permission = apiResponse;
    
    const hasTrueValue = this.multipleHideUnAuthorized.some(key => permission[key]);
   
    if(this.multipleHideUnAuthorized.length>0 && !hasTrueValue) {
      this.el.nativeElement.style.display = 'none';
    }

     if(this.hideUnAuthorized) {
        if(permission.hasOwnProperty(this.hideUnAuthorized) && !permission[this.hideUnAuthorized]) {
          this.el.nativeElement.style.display = 'none';
        }
     }
   }

}
