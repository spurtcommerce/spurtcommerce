import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNoNegativeAndZero]',

})
export class NoNegativeAndZeroDirective {
  private regex: RegExp = new RegExp(/^[1-9][0-9]*$/); 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    const newValue = value.replace(/[^0-9]/g, '');
    if (newValue.startsWith('0') && newValue.length > 1) {
      this.renderer.setProperty(input, 'value', newValue.substring(1));
    } else if (!this.regex.test(newValue)) {
      this.renderer.setProperty(input, 'value', '');
    } else {
      this.renderer.setProperty(input, 'value', newValue);
    }
  }


}
