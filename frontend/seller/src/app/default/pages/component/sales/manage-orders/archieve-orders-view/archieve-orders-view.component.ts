import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../../../environments/environment';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManagetagsmodalComponent } from '../all-orders/managetagsmodal/managetagsmodal.component';
import { Subscription } from 'rxjs';

@Component({
  providers: [DecimalPipe],
  selector: 'app-archieve-orders-view',
  templateUrl: './archieve-orders-view.component.html',
  styleUrls: ['./archieve-orders-view.component.scss']
})
export class ArchieveOrdersViewComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  public productId: any;
  public imageUrl: any = '';
  public ordershistory: any = 0;
  public productDetail: any;
  public orderstatusmodel: any = 0;
  public queryData: any = {};

  //Shipping
  shippingFormId: UntypedFormGroup;
  shippingFormUrl: UntypedFormGroup;
  shippingmodel: any = 0;
  shippingmodels: any = 0;

  // detail 
  archiveData: any;

  constructor(
    public orderSandbox: OrderSandbox,
    public router: ActivatedRoute,
    public route: Router,
    public formbuilder: UntypedFormBuilder,
    private modalService: NgbModal,
  ) {
    const index = this.router.snapshot.queryParamMap.get('index');
    const offset = this.router.snapshot.queryParamMap.get('offset');
    this.queryData.offset = offset || 0;
    this.queryData.index = index || 0;
  }

  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;
    this.productId = this.router.snapshot.paramMap.get('id');
    this.getArchieveDetail();
    // shipping form initialization
    this.initShippingFormID();
    this.initShippingFormUrl();
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

  // order detail api 
  private getArchieveDetail(): void {
    const params: any = {};
    params.vendorOrderArchiveId = this.productId;
    this.orderSandbox.archieveOrderDetail(params);
    this.subscriptions.add(this.orderSandbox.archieveOrderDetail$.subscribe(data => {
      this.archiveData = data;
    }));
  }

  // tag model 
  openmanagetagsmodal() {
    const modelRef = this.modalService.open(ManagetagsmodalComponent, {
      size: 'xl', windowClass: 'assignattributesmodal-categories d-block', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });
  }

  // go to previous page
  back(): void {
    this.route.navigate(['/sales/manage-orders/archive-orders'], { queryParams: this.queryData });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
