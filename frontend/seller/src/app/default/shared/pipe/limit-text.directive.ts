import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appLimitText]'
})
export class LimitTextDirective {
  @Input('appLimitText') maxLength!: number;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: InputEvent) {
    const input = this.el.nativeElement as HTMLInputElement;

    if (input.value.length > this.maxLength) {
      input.value = input.value.substring(0, this.maxLength);
      event.preventDefault();
    }
  }
}

