import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-message-seller',

  templateUrl: './alert-message-seller.component.html',
  styleUrl: './alert-message-seller.component.scss'
})
export class AlertMessageSellerComponent {

  content:any;
  content1:any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  // modal close event
  close() {
    this.activeModal.close();
  }
  deleteContent() {
    this.activeModal.close({message:'success'});
  }
}
