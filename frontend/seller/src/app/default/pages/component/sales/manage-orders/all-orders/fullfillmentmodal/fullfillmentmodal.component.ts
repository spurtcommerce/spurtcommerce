import { Component } from '@angular/core';
import { OrderService } from '../../../../../../../../../src/app/core/order/order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fullfillmentmodal',
  templateUrl: './fullfillmentmodal.component.html',
  styleUrl: './fullfillmentmodal.component.scss'
})
export class FullfillmentmodalComponent {
  orderStatusId: any = ''
  option: any = []
  fullfillmentId: any = ''
  id: ''
  editvalue: any;
  submit:boolean=false;

  constructor(public orderService: OrderService, public activeModal: NgbActiveModal) { }


  ngOnInit() {

    if (!['', null, undefined].includes(this.editvalue)) {
      this.fullfillmentId = this.editvalue.fullfillmentStatusId
    }

    let params = {
      parentId: this.orderStatusId
    }
    this.orderService.fullFillmentList(params).subscribe((val) => {
      if (val && val.status == 1) {

        this.option = val?.data
      }
    })


  }



  save() {

this.submit=true
    if(!['',null,undefined].includes(this.fullfillmentId)){
      let params = {
        subOrderStatusId: this.orderStatusId,
        fullfillmentStatusId: this.fullfillmentId,
        id: this.id
      }
      this.orderService.fullFillmentPost(params).subscribe((val) => {
        this.activeModal.close({ message: 'success' });
      })
    }
  }



  close() {
    this.activeModal.close();
  }

}
