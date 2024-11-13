import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnlyAllowed]'
})
export class NumberOnlyAllowedDirective {
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
