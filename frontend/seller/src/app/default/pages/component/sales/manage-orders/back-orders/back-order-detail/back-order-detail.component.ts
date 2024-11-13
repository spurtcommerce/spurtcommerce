// AAngular
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// third party
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

// sandbox and service
import { OrderSandbox } from '../../../../../../../../../src/app/core/order/order.sandbox';
import { PaymentSandbox } from '../../../../../../../../../src/app/core/payment/payment.sandbox';
import { Subscription } from 'rxjs';

// constant file
import { environment } from '../../../../../../../../../src/environments/environment';
import { customTable } from './back-order-detail.constant';
import { OrderstatushistoryComponent } from '../../all-orders/orderstatushistory/orderstatushistory.component';
import { ChangepaymentstatusmodalComponent } from '../../all-orders/changepaymentstatusmodal/changepaymentstatusmodal.component';

@Component({
  selector: 'app-back-order-detail',
  templateUrl: './back-order-detail.component.html',
  styleUrl: './back-order-detail.component.scss'
})
export class BackOrderDetailComponent implements OnInit {
  //Dynamic columns
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  productDetail: any;
  submitted: boolean = false;

  //Shipping
  shippingFormId: UntypedFormGroup;
  shippingFormUrl: UntypedFormGroup;
  shippingmodel: any = 0;
  shippingmodels: any = 0;

  //Ordders
  subOrderId: any;
  orderStatusId: number;
  orderstatusmodel: any = 0;
  orderstatusIdvalue: any;
  ordershistory: any = 0;
  orderId: any;

  //Brower Title
  title = 'Orders'

  // Config
  config: any;
  // Query Data
  queryData: any = {};

  private activeOrderId: any;
  private subscriptions: Array<Subscription> = [];
  button: any = 'Add'

  // image url
  imageUrl = environment.imageUrl;

  //Currency
  currencySymbol: any = {};

  // query params
  queryParamsData: any = {};

  constructor(
    public titleService: Title,
    public toster: ToastrService,
    public route: ActivatedRoute,
    public orderSandbox: OrderSandbox,
    public formbuilder: UntypedFormBuilder,
    public paymentSandbox: PaymentSandbox,
    public translate: TranslateService,
    private modalService: NgbModal,
    public router: Router) {

  }


  ngOnInit(): void {
    this.activeOrderId = this.route.snapshot.paramMap.get('id');

    if (this.activeOrderId) {
    this.getOrderDetail(this.activeOrderId);
    }
    this.getOrderStatusList();
this.route.queryParams.subscribe(val=>{
  this.queryParamsData = val
})

  }

  getOrderDetail(id: number): void {
    this.activeOrderId = id;
    this.orderSandbox.backOrderDetail(this.activeOrderId);
  }


  //Product order log list
  getProductOrderLogList(): void {
    const params: any = {};
    params.orderProductId = this.productDetail.orderProductId;
    this.orderSandbox.getLogOrderList(params);
  }

  /*Order Status List */
  getOrderStatusList(): void {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.keyword = '';
    params.parentId = Number(7);
    this.orderSandbox.getOrderStatusList(params);
  }

  //Back
  back(): void {
    this.router.navigate(['/sales/manage-orders/back-orders-list'], { queryParams: this.queryParamsData });

  }

  // Get Order Log List
  getOrderLogList(): void {
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    this.orderSandbox.getLogOrderList(params);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }




}
