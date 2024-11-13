import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../../../core/order/order.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { contents } from './orderstatus-constant';

@Component({
  selector: 'app-orderstatushistory',
  templateUrl: './orderstatushistory.component.html',
  styleUrls: ['./orderstatushistory.component.scss']
})
export class OrderstatushistoryComponent implements OnInit {
  public activeOrderId: any;
  statusHistory:any = [];
  content = contents;
  subOrederId:any

  constructor(private activeModal: NgbActiveModal,public route: ActivatedRoute, public orderSandbox: OrderSandbox,public translate:TranslateService, ) { }

  ngOnInit(): void {
    this.getOrderLogList();
  }
  getOrderLogList() {
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    this.orderSandbox.getLogOrderList(params);
    this.orderSandbox.logOrderList$.subscribe((data)=>{
      this.statusHistory = data;
    })
  }

  public dismiss() {
    this.activeModal.close();
  }

}
