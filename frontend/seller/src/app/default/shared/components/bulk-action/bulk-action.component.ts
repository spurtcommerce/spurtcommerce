import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { actionConfigs } from './bulk-action.constant';

@Component({
  selector: 'app-bulk-action',
  templateUrl: './bulk-action.component.html',
  styleUrls: ['./bulk-action.component.scss']
})
export class BulkActionComponent implements OnInit {

  @Input() bulkList = actionConfigs;

  @Input() count = 0;

  @Output() actionEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
