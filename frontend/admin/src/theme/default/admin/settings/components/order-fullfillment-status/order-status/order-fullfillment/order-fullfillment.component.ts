// angular common 
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

// third Party 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Sandbox and services 
import { OrderfullfillmentSandbox } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.sandbox';
import { OrderfullfillmentService } from 'src/core/admin/settings/order-fullfilment/order-fullfilment.service';

// component 
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { OrderFullfillmentAddComponent } from '../order-fullfillment-add/order-fullfillment-add.component';

@Component({
  selector: 'app-order-fullfillment',
  templateUrl: './order-fullfillment.component.html',
  styleUrls: ['./order-fullfillment.component.scss']
})
export class OrderFullfillmentComponent implements OnInit {
  // edit related 
  public type = 'edit';

  constructor(public modal: NgbModal,
    public Orderfullfillmentsandbox: OrderfullfillmentSandbox,
    public Orderfullfillmentservice: OrderfullfillmentService,
    public titleService: Title,
  ) {
    this.titleService.setTitle('Settings | Order Fullfilment Status');
  }

  ngOnInit(): void {
    this.orderfullfillmentlist();
  }

  /*Order fullFillment List*/

  orderfullfillmentlist() {
    let params: any = {};
    params.limit = 0;
    params.offset = 0;
    this.Orderfullfillmentsandbox.Orderfullfillmentlist(params);
  }


  /*Order fullFillment Status*/

  orderfullfillmentstatus() {
    let params: any = {};
    params.limit = 0;
    params.offeset = 0;
    this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
  }

  addOrderStatus() {
    const modalRef = this.modal.open(OrderFullfillmentAddComponent, {
      windowClass: 'add-order-fulfilment', keyboard: false, backdrop: 'static', animation: false,
    });
    this.Orderfullfillmentservice.Statusordersetdata('');
   
  }

  editOrderStatus(data) {
    const modalRef = this.modal.open(OrderFullfillmentAddComponent, {
      windowClass: 'add-order-fulfilment', keyboard: false, backdrop: 'static', animation: false,
    });
      this.Orderfullfillmentservice.Statusordersetdata(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.defaultStatus = data.defaultStatus;

  }


  statuschange(event: any, val) {
    const params: any = {};
    params.id = val.orderStatusId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.status = 1;
      this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
    } else {
      params.status = 0;
      this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
    }
  }

  deleteOrderStatus(datas) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Order Fullfilment Status';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const params: any = {};
        params.id = datas.orderStatusId;
        this.Orderfullfillmentsandbox.DeleteOrderfullfillment(params);
        this.Orderfullfillmentsandbox.DeleteOrderfullfillment$.subscribe(val => {
          if (val?.status == 1) {

            this.orderfullfillmentlist();
          }
        })

      }
    });

  }


}
