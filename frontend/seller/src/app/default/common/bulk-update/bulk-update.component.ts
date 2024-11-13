import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../../../src/app/core/order/order.service';

@Component({
  selector: 'app-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss']
})
export class BulkUpdateComponent implements OnInit {

  //ng select action
  data: any = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'In-Active' },
  ]

  // variable for Module Name
  public Name: any

  // variable for content
  public Content: any;
  // variable for Status 
  public Status: any;

  // variable for Single or multiple 
  public action: any


  fulfillment: any;
  option: any;
  fulfillmentId: any;
  datePicker: any;
  price: any;
  inventory: any

  @Input() orderStatus: any;


  dateFormate:any=localStorage.getItem('dateFormat')


  constructor(public activeModal: NgbActiveModal, public orderService: OrderService) { }

  ngOnInit(): void {
    if (this.orderStatus?.length > 0) {
      this.data = this.orderStatus
    }
  }

  filFullmentApicall(): void {

    let params = {
      parentId: this.Status
    }
    this.orderService.fullFillmentList(params).subscribe((val) => {
      if (val && val.status == 1) {
        this.option = val?.data
      }
    })
  }


  fulfillmentChange(): void {
    this.filFullmentApicall();
    this.fulfillmentId = ""
  }


  onFromDateChange(): void {

  }

  close() {
    this.activeModal.close();
  }
  Save() {



    if (this.fulfillment == 'product') {
      let obj = {
        dateAvailableFrom: this.datePicker,
        price: this.price,
        inventory: this.inventory,
        Status: this.Status
      }
      const cleanedData = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null && value !== "")
      );

      const isEmpty2 = Object.entries(cleanedData)?.length;


      this.activeModal.close({ StatusChange: this.Status, modelStatus: 'Save', obj: obj, empty: isEmpty2 });

    } else {

      if (this.fulfillment == 'fulfillment') {
        let objs = {
          fullfillmentStatusId: this.fulfillmentId,
          Status: this.Status
        }

        const cleanedData = Object.fromEntries(
          Object.entries(objs).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );

        const isEmpty2 = Object.entries(cleanedData)?.length;

        this.activeModal.close({ StatusChange: this.Status, modelStatus: 'Save', obj: objs, empty: isEmpty2 });
      } else {
        this.activeModal.close({ StatusChange: this.Status, modelStatus: 'Save' });
      }
    }





  }


}
