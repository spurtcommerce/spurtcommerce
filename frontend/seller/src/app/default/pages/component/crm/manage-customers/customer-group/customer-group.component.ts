// Angular
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Sandbox
import { crmGroupsSandbox } from '../../../../../../../../src/app/core/crmGroups/crmGroups.sandbox';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss']
})
export class CustomerGroupComponent implements OnInit, OnDestroy {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  // Check Value
  emptyCheckArr: String[] = ['', null, undefined];
  // Variable
  data: any;
  submitted: boolean = false;
  title = 'Customer Group';
  @Input() groupId: any;
  constructor(public activeModal: NgbActiveModal, public sandbox: crmGroupsSandbox,
    public titleService: Title,
  ) {
    // Set Brower TItle
    this.titleService.setTitle(this.title);
  }


  ngOnInit(): void {
    // Customer Details Api
    if (this.groupId) {
      this.sandbox.customerGroupDetail(this.groupId)
      this.subscriptions.add(this.sandbox.customerGroupDetail$.subscribe((val: any) => {
        if (val) {
          this.setData(val)
        }
      }))
    }
  }
  // Modal Close
  close(): void {
    this.activeModal.close("delete");
  }

  // Set Customer Group Name
  setData(data) {
    this.data = data.name
  }

  // Submit
  saveData() {
    this.submitted = true
    if (['', null, undefined].includes(this.data)) {
      return
    }

    if (this.groupId) {
      let params: any = {
        id: this.groupId,
        name: this.data
      }
      this.sandbox.customerGroupUpdate(params);
      this.subscriptions.add(this.sandbox.customerGroupUpdate$.subscribe(val => {
        if (val?.status == 1) {
          this.activeModal.close('close');
        }
      }))
    }
    else {
      let param: any = {}
      param.name = this.data,
        this.sandbox.addCustomerGroup(param);
      this.subscriptions.add(this.sandbox.addCustomerGroup$.subscribe(val => {
        if (val?.status == 1) {
          this.activeModal.close('close');
        }
      }))
    }
  }

  // Destroy
  ngOnDestroy(): void {
    this.groupId = '';
    this.subscriptions.unsubscribe()
  }

}
