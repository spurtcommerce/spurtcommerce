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
import { OrderFullfillmentAddComponent } from '../order-status/order-fullfillment-add/order-fullfillment-add.component';
import { AddFullfillmentStatusComponent } from '../add-fullfillment-status/add-fullfillment-status.component';

@Component({
  selector: 'app-manage-fullfillment-status',
  templateUrl: './manage-fullfillment-status.component.html',
  styleUrl: './manage-fullfillment-status.component.scss'
})
export class ManageFullfillmentStatusComponent {
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
   params.isFullfillment =1
   this.Orderfullfillmentsandbox.ManagefullfillmentList(params);
   this.Orderfullfillmentsandbox.ManagefullfillmentList$.subscribe((val)=>{
   })
   
 }


 /*Order fullFillment Status*/

 orderfullfillmentstatus() {
  //  let params: any = {};
  //  params.limit = 0;
  //  params.offeset = 0;
  //  this.Orderfullfillmentsandbox.orderfullfillmentstatus(params);
 }

 addOrderStatus() {
   const modalRef = this.modal.open(AddFullfillmentStatusComponent, {
     windowClass: 'add-order-fulfilment', keyboard: false, backdrop: 'static', animation: false,
   });
   this.Orderfullfillmentservice.setManageFullFillment('');
  
 }

 editOrderStatus(data) {
   const modalRef = this.modal.open(AddFullfillmentStatusComponent, {
     windowClass: 'add-order-fulfilment', keyboard: false, backdrop: 'static', animation: false,
   });
     this.Orderfullfillmentservice.setManageFullFillment({...data,stautsId:'1'});
     modalRef.componentInstance.edit = this.type;
     modalRef.componentInstance.defaultStatus = data.defaultStatus;

 }


 statuschange(event: any, val) {
   const params: any = {};
   params.id = val.id;
   params.status = event.target.checked == true ? 1:0;
  this.Orderfullfillmentsandbox.manageFullFillmentUpdateStatus(params);
 
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
       params.id = datas.id;
       this.Orderfullfillmentsandbox.manageFullFillmentDelete(params);
       this.Orderfullfillmentsandbox.manageFullFillmentDelete$.subscribe(val => {
         if (val?.status == 1) {

           this.orderfullfillmentlist();
         }
       })

     }
   });

 }

}
