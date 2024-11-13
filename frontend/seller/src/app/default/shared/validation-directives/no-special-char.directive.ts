import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNoSpecialChar]',
  standalone: false
})
export class NoSpecialCharDirective {

  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    if (sanitizedValue !== inputValue) {
      this.control.control?.setValue(sanitizedValue);
    }
  }
}
