import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[passwordshow]',
})
export class ToggleDirective {
  private _shown = false;

  constructor(private el: ElementRef) {
    // Initialize _shown based on the actual input type at the time of directive creation
    this._shown = this.el.nativeElement.getAttribute('type') === 'text';

    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    
    // Set the initial icon based on the input type
    span.innerHTML = this._shown
      ? '<img class="password-show-hide" src="assets/imgs/eye.svg">'
      : '<img class="password-show-hide" src="assets/imgs/eye-slash.svg">';
      
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    
    parent.appendChild(span);
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = '<img class="password-show-hide" src="assets/imgs/eye.svg">';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = '<img class="password-show-hide" src="assets/imgs/eye-slash.svg">';
    }
  }
}
