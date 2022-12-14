/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() data: any;
  public errorMsg: any;
  public params: any;

  constructor(
    private activeModal: NgbActiveModal,
    private changeDetectRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.errorMsg = this.data.message;
  }

  public accept() {
    this.params.flag = 1;
    this.activeModal.close();
  }

  public dismiss() {
    this.activeModal.close();
  }
}
