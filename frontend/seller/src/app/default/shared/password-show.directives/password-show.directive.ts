import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[passwordshow]',
})
export class ToggleDirective {
  private _shown = false;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');

    span.innerHTML = '<i class="password-show-hide fa fa-eye-slash"></i>';
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');

      span.innerHTML = '<i class="password-show-hide fa fa-eye"></i>';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = '<i class="password-show-hide fa fa-eye-slash"></i>';
    }
  }
}
