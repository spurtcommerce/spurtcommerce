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
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {
  public regex: RegExp;
  private specialKeys: any = ['Backspace', 'Tab', 'End', 'Home'];
  @Input() isDot: any;
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  KeyDown(event: KeyboardEvent) {
    if (this.isDot) {
      this.regex = new RegExp(/^[0-9]*\.?[0-9]*$/);
    } else {
      this.regex = new RegExp(/^\s*(?=.*[0-9])\d*(?:\.\d{1,2})?\s*$/);
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}

@Directive({
  selector: '[appAlphabetOnly]'
})
export class AlphabetOnlyDirective {
  constructor() {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    const input = event.target.value;
    const regex = /^[a-zA-Z]*$/;
    if (!regex.test(input)) {
      event.target.value = input.replace("^[a-zA-Z0-9 ]+$", '');
    }
  }
  
}

@Directive({
  selector: '[appNoLeadingZero]'
})
export class NoLeadingZeroDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    if (input.value.startsWith('0')) {
      input.value = input.value.replace(/^0+/, '');
    }
  }
}

@Directive({
  selector: '[appNoSpecialChars]'
})
export class NoSpecialCharsDirective {
  private regex: RegExp = /^[a-zA-Z0-9 ]*$/;
  
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent): void {
    const input = this.el.nativeElement.value;
    if (!this.regex.test(input)) {
      this.el.nativeElement.value = input.replace(/[^a-zA-Z0-9 ]/g, '');
    }
  }
}