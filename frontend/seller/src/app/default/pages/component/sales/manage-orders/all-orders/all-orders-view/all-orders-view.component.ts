// Angular imports
import { ChangeDetectorRef, Component, OnInit, model } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
//Sandbox
import { PaymentSandbox } from '../../../../../../../core/payment/payment.sandbox';
import { OrderSandbox } from '../../../../../../../core/order/order.sandbox';
// Components
import { OrderstatushistoryComponent } from '../orderstatushistory/orderstatushistory.component';
import { ChangepaymentstatusmodalComponent } from '../changepaymentstatusmodal/changepaymentstatusmodal.component';
//contant
import { customTable } from './all-orders-view.contant';
// Environment
import { environment } from '../../../../../../../../../src/environments/environment';
import { ManagetagsmodalComponent } from '../managetagsmodal/managetagsmodal.component';
import { OrderService } from '../../../../../../../../../src/app/core/order/order.service';
import { FullfillmentmodalComponent } from '../fullfillmentmodal/fullfillmentmodal.component';

@Component({
  selector: 'app-all-orders-view',
  templateUrl: './all-orders-view.component.html',
  styleUrls: ['./all-orders-view.component.scss']
})
export class AllOrdersViewComponent implements OnInit {

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


  //page Name
  pageName: any = '';
  addresshide: boolean

  // order status changes 
  orderStatusChnages: string = '';

  //tags
  tagsList: any = [];
  tagname: string
  submit: boolean = false;
  dummyarrayTagList: any = [];
  // order Details
  orderDetails: any;

  //order Details Status Disable
  orderDetailsStatusDisable: boolean = false;

  constructor(
    public titleService: Title,
    public toster: ToastrService,
    public route: ActivatedRoute,
    public orderSandbox: OrderSandbox,
    public orderService: OrderService,
    public formbuilder: UntypedFormBuilder,
    public paymentSandbox: PaymentSandbox,
    public translate: TranslateService,
    private modalService: NgbModal,
    public router: Router,
    public cdref: ChangeDetectorRef,
    public OrderService: OrderService
  ) {

    let data = ['BackOrdersDetail', 'FailOrderDetails']
    let addres = ['BackOrdersDetail']
    this.pageName = data.includes(this.route.snapshot.routeConfig.data.title)
    this.addresshide = addres.includes(this.route.snapshot.routeConfig.data.title)
    this.currencySymbol = JSON.parse(localStorage.getItem('adminCurrency'));
    this.titleService.setTitle(this.title);
    const currentPage = this.route.snapshot.queryParamMap.get('currentPage');
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const limit = this.route.snapshot.queryParamMap.get('limit');
    this.queryData.offset = offset || 0;
    this.queryData.currentPage = currentPage || 0;
    this.queryData.limit = limit || 0;
    this.subscriptions.push(this.orderSandbox.orderDetail$.subscribe((data) => {
      this.orderId = data?.orderPrefixId;
      this.orderStatusChnages = data?.orderStatusName
    }));
  }

  ngOnInit(): void {


    this.activeOrderId = this.route.snapshot.paramMap.get('id');
    if (this.activeOrderId) {
      this.getOrderDetail(this.activeOrderId);
    }
    this.initShippingFormID();
    this.initShippingFormUrl();
    this.getOrderStatusList();
    this.getOrderLogList();

  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 1,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      autoplay: false,
      speed: 900,
      effect: 'slide',
      breakpoints: {
        510: {
          slidesPerView: 1
        },
        850: {
          slidesPerView: 2
        },
        1100: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        },
        1500: {
          slidesPerView: 5
        }
      }
    };
  }





  getOrderDetail(id: number): void {
    this.activeOrderId = id;
    this.orderSandbox.doOrderDetail(this.activeOrderId);
    this.subscriptions.push(this.orderSandbox.orderDetail$.subscribe((val) => {
      if (!['', null, undefined].includes(val)) {
        this.orderDetails = val
        this.orderstatusIdvalue = val?.subOrderStatusId



        this.orderDetailsStatusDisable = !(val?.paymentMethod === 'CashOnDelivery' || val?.paymentStatus === 1);


        if (!['', null, undefined].includes(this.orderDetails.productList[0]?.tags)) {
          const data = this.orderDetails.productList[0]?.tags.split(',');

          data.forEach((bal) => {
            let obj = {
              name: bal,
              checked: true
            }
            this.tagsList.push(obj);
            this.dummyarrayTagList = this.tagsList;
          })
        }
      }
    }))
  }

  /*Order status History */

  ordersstatushistory(details: any): void {
    this.ordershistory = details;
    this.productDetail = details;

  }

  //Product order log list
  getProductOrderLogList(): void {
    const params: any = {};
    params.orderProductId = this.productDetail.orderProductId;
    this.orderSandbox.getLogOrderList(params);
  }
  //Close order history
  closeorderhistory(): void {
    this.ordershistory = 0;
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

    if (this.route.snapshot.routeConfig.data.title == 'OrderDetails') {
      this.router.navigate(['/sales/manage-orders/all-orders'], { queryParams: this.queryData });
    }

    if (this.route.snapshot.routeConfig.data.title == 'BackOrdersDetail') {
      this.router.navigate(['/sales/manage-orders/back-orders-list'], { queryParams: this.queryData });
    }
    if (this.route.snapshot.routeConfig.data.title == 'FailOrderDetails') {
      this.router.navigate(['/sales/manage-orders/failed-orders-list'], { queryParams: this.queryData });
    }
  }

  /*Shipping */

  initShippingFormID(): void {
    this.shippingFormId = this.formbuilder.group({
      id: ['', Validators.required],

    });
  }
  // Init shipping From 
  initShippingFormUrl(): void {
    this.shippingFormUrl = this.formbuilder.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }


  //Shipping info

  shippings(detailss): void {
    if (detailss.trackingUrl != '') {
      this.button = 'Update'
    }
    this.shippingmodels = 1;
    this.productDetail = detailss;
    this.setShippingInfos(detailss);
  }
  //Shipping multiple info
  shipping(detail): void {
    if (detail.trackingNo != '') {
      this.button = 'Update'
    }
    this.shippingmodel = 1;
    this.productDetail = detail;
    this.setShippingInfo(detail);

  }

  //Set id shipping info
  setShippingInfo(data): void {

    this.shippingFormId.controls['id'].setValue(data['trackingNo']);

  }
  //Set url shipping info
  setShippingInfos(datas): void {
    this.shippingFormUrl?.controls['url'].setValue(datas['trackingUrl']);
  }

  //Shipping close
  shippingclose(): void {
    this.shippingFormId.reset()
    this.shippingFormUrl.reset()
    this.button = 'Add'
    this.shippingmodel = 0;
    this.shippingmodels = 0;
    this.submitted = false
  }
  //Update shipping info
  updateShippingInfo(type): void {
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    if (type == 'trackid') {
      if (!this.shippingFormId.valid) {
        this.validateAllFormFields(this.shippingFormId);
        return;
      }
      params.trackingNo = this.shippingFormId.controls['id'].value ? this.shippingFormId.controls['id'].value : '';
      this.shippingmodel = 0;
      this.orderSandbox.getShippingInformationUpdate(params);
      this.orderSandbox.updateShippingInformationLoaded$.subscribe(data => {
        if (data) {
          this.getOrderDetail(this.activeOrderId)
        }
      })

    } else {
      if (!this.shippingFormUrl.valid) {
        this.submitted = true
        this.validateAllFormFields(this.shippingFormUrl);
        return;
      }
      params.trackingUrl = this.shippingFormUrl.controls['url'].value;
      this.shippingmodels = 0;
      this.orderSandbox.getShippingInformationUpdate(params);
      this.orderSandbox.updateShippingInformationLoaded$.subscribe(data => {
        if (data) {
          this.getOrderDetail(this.activeOrderId)
        }
      })

    }
  }
  //Validate All form fields
  validateAllFormFields(formGroup: UntypedFormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  /*Order Status */
  selectOrderStatus(val): void {
    this.subOrderId = val;
  }
  // Close orders status
  closeorderstatus(): void {
    this.orderstatusmodel = 0;
  }
  //Order status value
  orderstatusvalue(e): void {
    this.orderstatusIdvalue = e

  }
  //Apply Status Change
  apllyStatusChange(data, id, val): void {
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    params.subOrderStatusId = this.orderstatusIdvalue ? this.orderstatusIdvalue : val.subOrderStatusId;
    this.orderSandbox.getOrderStatusUpdate(params);
    this.subscriptions.push(this.orderSandbox.updateOrderStatusLoaded$.subscribe(data => {
      if (data) {
        this.orderstatusmodel = 0

      }
    }));
  }
  // Get Order Log List
  getOrderLogList(): void {
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    this.orderSandbox.getLogOrderList(params);

  }
  //Get Order Details
  getOrderDetails(detail): void {
    this.orderstatusmodel = detail;
    this.productDetail = detail;
  }

  orderStatusChange(detail) {
    this.orderstatusmodel = 1;

  }
  //Download Invoice
  downloadInvoice(): void {
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    this.paymentSandbox.downloadInvoice(params);
  }
  //Open order status history
  openorderstatushistory(): void {
    const modelRef = this.modalService.open(OrderstatushistoryComponent, {
      size: 'md', windowClass: 'orderstatushistory', backdrop: 'static', backdropClass: 'createcr', centered: true ,
    });
    modelRef.componentInstance.activeOrderId = this.activeOrderId;
    modelRef.componentInstance.subOrederId =this.orderDetails.subOrderId
  }


  //Open change payment status
  openchangepaymentstatus(status): void {
    const modelRef = this.modalService.open(ChangepaymentstatusmodalComponent, {
      size: 'md', windowClass: 'changestatusModal', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.orderId = this.activeOrderId;
    modelRef.componentInstance.paymentStatus = status == 1 ? '1' : '0';
    modelRef.result.then(result => {
      if (result == 'success') {
        this.getOrderDetail(this.activeOrderId);
      }
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
  // Remove tag
  removeTag(index, item): void {
    this.tagsList = this.dummyarrayTagList.filter((val) => val.name != item.name)
    this.tagApicall();
    this.tagname = ''
  }
  // Tap api call
  tagApicall() {
    let val = {
      tags: this.tagsList.map((values) => values.name).toString(),
      id: this.activeOrderId
    }

    this.orderService.tagPost(val).subscribe((val) => {
      if (this.activeOrderId) {

      }
    })
  }
  // Create tag
  createTags(): void {

    this.submit = true

    if (!['', null, undefined].includes(this.tagname)) {
    }
  }
  // Tag modal
  openmanagetagsmodal() {
    const modelRef = this.modalService.open(ManagetagsmodalComponent, {
      size: 'xl', windowClass: 'assignattributesmodal-categories d-block', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });
    modelRef.componentInstance.id = this.activeOrderId;
    modelRef.componentInstance.tagedit = [...this.tagsList]
    modelRef.result.then((result) => {

      if (result?.method == 'success') {
        if (['', null, undefined, 0].includes(result.res.length)) {
          this.tagsList = [];
          this.cdref.detectChanges();
        } else {
          this.tagsList = [...result.res]
          this.cdref.detectChanges();
        }
      }
    })
  }

  // Fulfillment
  openFullfillment(): void {

    const modelRef = this.modalService.open(FullfillmentmodalComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });
    modelRef.componentInstance.orderStatusId = this.orderstatusIdvalue;
    modelRef.componentInstance.id = this.activeOrderId;
    modelRef.componentInstance.editvalue = this.orderDetails.productList[0]


    modelRef.result.then((result) => {

      if (result.message == 'success') {

        if (this.activeOrderId) {

          this.OrderService.getOrderDetail(this.activeOrderId).subscribe((val: any) => {
            if (!['', null, undefined].includes(val)) {
              this.orderDetails = val?.data
              this.orderstatusIdvalue = val?.data?.subOrderStatusId
            }
          })
        }


      }

    })
  }

}
