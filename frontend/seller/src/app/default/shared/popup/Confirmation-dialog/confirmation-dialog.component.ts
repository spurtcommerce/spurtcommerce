/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent implements OnInit {
  public errorMsg: any;
  public params: any;

  constructor(
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
  }

  public accept() {
    this.activeModal.close(1);
  }

  public dismiss() {
    this.activeModal.close(0);
  }
}
