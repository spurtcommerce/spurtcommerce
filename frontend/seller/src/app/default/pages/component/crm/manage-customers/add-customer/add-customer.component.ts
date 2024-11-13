// Angular
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// Sandbox
import { crmGroupsSandbox } from '../../../../../../../../src/app/core/crmGroups/crmGroups.sandbox';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  // Modal Inputs
  @Input() id: any;
  @Input() detailsId: any;
  // List
  customerArray: any = [];
  rightDataArray: any = [];
  buyerIds: any = [];
  customerList: any = [];
  detailsIdArray: any = [];
  // Variables
  selectedAccount: any;
  selectedItems: any;
  submitted: boolean = false;
  requiredField: boolean = false;
  name: any;
  selectedName: any
  // Subscription
  private subscription: Array<Subscription> = [];

  constructor(public activeModal: NgbActiveModal, public customerSandbox: crmGroupsSandbox, public ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Customer List Api
    this.custometList();
  }

  // Get Customer List
  custometList(): void {
    this.customerSandbox.customerList({})
    this.subscription.push(this.customerSandbox.customerList$.subscribe(val => {
      val.forEach(element => {
        element.customerName = element.firstName + " " + element.lastName
      })
      this.customerList = val;

      if (val && this.detailsId) {
        this.coustomerDetail(this.detailsId)
      }
    }))
  }

  // Add Available to Selected
  addDataArray(item: any, index: any): void {
    this.rightDataArray.push(item);
    this.rightDataArray = [...this.rightDataArray];
    this.customerList.forEach(element => {
      this.rightDataArray.forEach(elem => {
        if (element.id == elem.id) {
          this.customerList = this.customerList.filter(val => val.id != elem.id);
          this.customerList = [...this.customerList]
        }
      });

    });

  }

  // Remove Selected 
  cancelData(item: any, index: any): void {
    this.customerList.push(item)
    this.customerList = [...this.customerList]
    this.rightDataArray.splice(index, 1)
    this.rightDataArray = [...this.rightDataArray]
  }

  // Submit 
  saveCustomer(): void {
    this.rightDataArray.forEach(val => {
      this.buyerIds.push(val.id)
    })
    let param: any = {}
    param.customerIds = this.buyerIds
    param.id = this.id
    if (this.detailsId) {
      this.customerSandbox.updateCustomerGroup(param)
      this.subscription.push(this.customerSandbox.updateCustomerGroup$.subscribe(val => {
        if (val?.status == 1) {
          this.rightDataArray = []
          this.activeModal.close("close");
        }
      }));
    } else {
      this.customerSandbox.addCustomer(param);
      this.subscription.push(this.customerSandbox.addCustomer$.subscribe(val => {
        if (val?.status == 1) {
          this.rightDataArray = []
          this.activeModal.close("close");
        }
      }));
    }
  }

  // Customer Detail
  coustomerDetail(detailsId): void {
    this.rightDataArray = [];

    this.customerSandbox.customerDetails(detailsId)
    this.subscription.push(this.customerSandbox.customerDetails$.subscribe(val => {
      if (val && val.length > 0) {
        val.forEach(element => {
          let a = this.customerList.filter(val => val.id == element.id);
          if (a.length > 0) {
            this.rightDataArray.push(a[0]);
            this.rightDataArray = [...this.rightDataArray]
          }
          this.ref.detectChanges();
          this.customerList = this.customerList.filter(val => val.id != element.id);
          this.customerList = [...this.customerList]
          this.ref.detectChanges();
        })
      }
    }))
  }

  // Close Modal
  close(): void {
    this.activeModal.close("dismiss");
  }

  // Destroy
  ngOnDestroy(): void {
    this.subscription.forEach(val => val.unsubscribe())
  }
}