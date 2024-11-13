// Angular Imports
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { minimumDisableCount } from './dynamic-columns.constant';

@Component({
  selector: 'app-dynamic-columns',
  templateUrl: './dynamic-columns.component.html',
  styleUrls: ['./dynamic-columns.component.scss']
})
export class DynamicColumnsComponent implements OnInit {
  
  @ViewChild('dropdownContentDynamicColumn', { static: false }) dropdownContentDynamicColumn: ElementRef;

  @Input() set filterColumns(data) {
    this.backupColumnData = Object.keys(data).length > 0 ? structuredClone(data): {}
    this.filterColumnData = Object.keys(data).length > 0 ? structuredClone(data): {};
    this.calculateCount();
  }

  @Output() selectedColumns = new EventEmitter();

  // filters
  filterColumnData: any = {};
  backupColumnData: any = {};
  totalCount = 0;
  filterDisableLimit = minimumDisableCount;
  // Common
  _Object = Object;
  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor() { }

  ngOnInit(): void {
  }

  open(): void {
    this.filterColumnData = structuredClone(this.backupColumnData);
  }

  save(): void {
    this.selectedColumns.emit(this.filterColumnData as any);
    this.backupColumnData = structuredClone(this.filterColumnData);
    this.dropDownClose('dropdownContentDynamicColumn');
  }

  // filter disable
  calculateCount(): void {
    this.totalCount = Object.values(this.filterColumnData).filter((val) => val).length;
  }

  // close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

}
