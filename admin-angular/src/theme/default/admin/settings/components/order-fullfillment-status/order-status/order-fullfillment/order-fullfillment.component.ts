import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderfullfillmentSandbox } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.sandbox';
import { OrderfullfillmentService } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.service';
import { OrderFullfillmentAddComponent } from '../order-fullfillment-add/order-fullfillment-add.component';

@Component({
  selector: 'app-order-fullfillment',
  templateUrl: './order-fullfillment.component.html',
  styleUrls: ['./order-fullfillment.component.scss']
})
export class OrderFullfillmentComponent implements OnInit {

  public type = 'edit';

  constructor( public modal: NgbModal,
    public Orderfullfillmentsandbox:OrderfullfillmentSandbox,
    public Orderfullfillmentservice:OrderfullfillmentService) { }

  ngOnInit(): void {
    this.orderfullfillmentlist();
  }

     /*Order fullFillment List*/

  orderfullfillmentlist(){
    let params:any={};
    params.limit=0;
    params.offset=0;
    this.Orderfullfillmentsandbox.Orderfullfillmentlist(params);
  }

  // addNewCountry() {
  //   const modalRef = this.modal.open(OrderFullfillmentAddComponent, {
  //     windowClass: 'add-customers', keyboard: false, backdrop: 'static'
  //   });
  // }

  addOrderStatus(data, type) {
    const modalRef = this.modal.open(OrderFullfillmentAddComponent, {
      windowClass: 'add-customers', keyboard: false, backdrop: 'static'
    });
    if (type === 'edit') {
      console.log('data',data)
      this.Orderfullfillmentservice.Statusordersetdata(data);
      modalRef.componentInstance.edit = this.type;
      // modalRef.componentInstance.id = data.countryId;
    } else {
      this.Orderfullfillmentservice.Statusordersetdata('');
    }
  }

   /*Order fullFillment Status*/

  orderfullfillmentstatus(){
    let params:any={};
    params.limit=0;
    params.offeset=0;
    this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
  }
  statuschange(event: any, val) {
    const params: any = {};
    params.id = val.orderStatusId;
    const FeatureValue = event.target.checked; 
    console.log('FeatureValue',FeatureValue)
    if (FeatureValue === true) {
      params.status = 1;
      this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
    } else {
      params.status = 0;
      this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
    }
  }



}
