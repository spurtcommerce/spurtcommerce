/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],

})
export class DeleteConfirmationDialogComponent implements OnInit {
  key: any;
  id: number;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  // modal close event
  close() {
    this.activeModal.close();
  }
  deleteContent() {
    if (this.key === 'vendor') {
      // this.sellerSandbox.deleteLoaded$.subscribe(_delete => {
      //   if (_delete === true) {
      //     this.activeModal.close('deleted');
      //   }
      // });
      // } else if (this.key === 'product') {
      //   this.productSandbox.productDeleteLoaded$.subscribe(_delete => {
      //     if (_delete === true) {
      //       this.activeModal.close('deleted');
      //     }
      //   });
      // }
    
      this.activeModal.close('deleted');
    
    }
  }
}
