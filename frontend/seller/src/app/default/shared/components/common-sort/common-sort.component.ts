import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-common-sort',
  templateUrl: './common-sort.component.html',
  styleUrl: './common-sort.component.scss'
})
export class CommonSortComponent {

  @ViewChild('dropdownContentDynamicColumn', { static: false }) dropdownContentDynamicColumn: ElementRef;

  @Input() sortOption: string = '';
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();
  @Output() valueChangedOrder: EventEmitter<string> = new EventEmitter();

  emitValue(value) {
    this.valueChanged.emit(value);
  }

  emitValueOrder(value) {
    this.valueChangedOrder.emit(value);
  }

}
