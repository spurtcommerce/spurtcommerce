/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumberDirectives {
  public regex: RegExp;
  private specialKeys: any = ['Backspace', 'Tab', 'End', 'Home'];
  @Input() isDot: any;
  constructor(private el: ElementRef) {}


  @HostListener('keydown', ['$event'])
  onKeyDown(event: any) {
    // Allow special keys like Backspace, Tab, Enter, etc.
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
      // Allow: Ctrl+A/Ctrl+C/Ctrl+V/Ctrl+X
      (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) || 
      (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) || 
      (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) || 
      (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) || 
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }
  
  @HostListener('paste', ['$event'])
  onPaste(event: any) {
    // Get pasted data via clipboard API
    const pastedData = event.clipboardData.getData('text/plain');
    // Check if pasted data is not numeric
    if (isNaN(parseFloat(pastedData)) || !isFinite(pastedData)) {
      // Prevent default behavior
      event.preventDefault();
    }
  }
}
