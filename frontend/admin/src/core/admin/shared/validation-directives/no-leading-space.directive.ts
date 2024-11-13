import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoLeadingSpace]'
})
export class NoLeadingSpaceDirective {
  constructor(private el: ElementRef) {
  }
  
  @HostListener('keydown.space', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if ((this.el.nativeElement as HTMLInputElement).value.trim() === '' && event.key === ' ') {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value.startsWith(' ')) {
      inputElement.value = inputElement.value.trim();
    }
}

}
