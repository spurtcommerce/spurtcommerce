
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Directive, ElementRef, AfterViewInit } from '@angular/core';


@Directive({
    selector: '[appScrollTo]'
})
export class ScrollToDirective implements AfterViewInit {
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit() {
    this.elRef.nativeElement.scrollHeight();

  }
}
