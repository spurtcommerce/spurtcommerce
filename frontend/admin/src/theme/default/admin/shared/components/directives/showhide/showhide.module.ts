import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideDirective } from './show-hide.directive';



@NgModule({
  declarations: [
    ShowHideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [ShowHideDirective]
})
export class ShowhideModule { }
