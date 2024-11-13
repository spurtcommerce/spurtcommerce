import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-common-delete',
  templateUrl: './common-delete.component.html',
  styleUrls: ['./common-delete.component.scss']
})
export class CommonDeleteComponent implements OnInit {
  productId: number;
  key: any;
  couponId: number;
  @Input() deleteMessage: string
  @Input() VariantMessage: string
  constructor(public activeModal: NgbActiveModal) {

  }
  ngOnInit() {

  }
  close() {
    this.activeModal.close();
  }
  deleteContent() {
   

      this.activeModal.close('Deleted');
     
     
    
  }


}
