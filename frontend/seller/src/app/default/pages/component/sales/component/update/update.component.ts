import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd } from '@angular/cdk/drag-drop';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {

  public subOrderStatusId: any;
  public connectedTo: any = [];
  public vendorOrderId: any;
  public currentStatusId: any;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  private subscriptions: Array<Subscription> = [];
  limit: any  = 10;
  offset: any = 0;

  constructor(public orderSandbox: OrderSandbox, public router: Router) { }

  ngOnInit() {
    this.getOrdersList();
    this.getOrderListCount();
  }

  drop(event: CdkDragDrop<string[]>, array) {
    if (event.container) {
      this.subOrderStatusId = Number(event.container.id);
      if (this.subOrderStatusId === this.currentStatusId) {
        return;
      }
      const params: any = {};
      params.subOrderStatusId = this.subOrderStatusId;
      params.vendorOrderId = this.vendorOrderId;
      this.orderSandbox.updateAllOrderListBasedOnStatus(params);
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.subscriptions.push(this.orderSandbox.updateAllOrderListBasedOnStatus$.subscribe(data => {
      if (data) {
        this.getOrderListCount();
      }
    }));
  }

  dragEnd($event: CdkDragEnd, item) {
    this.currentStatusId = Number($event.source.dropContainer.id);
    this.vendorOrderId = item.vendorOrderId;

  }

  getOrdersList() {
    const params: any = {};
    params.limit = 10;
    params.offset = 0;
    params.keyword = '';
    params.parentId = Number(7);
    this.orderSandbox.getOrderStatusList(params);
    this.subscriptions.push(this.orderSandbox.orderStatusList$.subscribe(data => {
      if (data) {
  
        data.forEach(datas => {
          if (datas) {
            this.connectedTo.push(datas.orderStatusId);
            const params: any = {};
            params.limit = this.limit;
            params.offset = this.offset;
            params.id = datas.orderStatusId;
        this.orderSandbox.vendorOrderDetail(params);

          }
        });
      }
    }));
   
  }

  getOrderListCount() {
    const params: any = {};
    params.limit = 4;
    this.orderSandbox.vendorOrderListCount(params);

  }

  goToOrders(id) {
    this.router.navigate(['/orders/all-orders'], { queryParams: { orderId: id } });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
