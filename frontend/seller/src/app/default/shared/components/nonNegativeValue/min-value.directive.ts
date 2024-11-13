import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appMinValue]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: MinValueDirective, multi: true }]
})
export class MinValueDirective {
  @Input('appMinValue') minValue: number = 1; // Default minValue is 1 if not provided

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);

    // Check if the value is less than the minValue or negative
    if (value < this.minValue) {
      input.value = this.minValue.toString();
    } else if (isNaN(value) || value < 0) {
      // input.value = '';
    }
  }
}