// Angular Imports
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// Constant
import { actionConfigs } from './bulk-action.constant';

@Component({
  selector: 'app-bulk-action',
  templateUrl: './bulk-action.component.html',
  styleUrls: ['./bulk-action.component.scss']
})
export class BulkActionComponent implements OnInit {
  @Input() count = 0;
  @Input() bulkList = actionConfigs;
  @Output() actionEvent = new EventEmitter();
  

  // Arrow functions
  trackByIndex = (index: number): number => index;
  constructor() { }

  ngOnInit(): void {
  }

}
