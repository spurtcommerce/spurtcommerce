import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardSandbox } from '../../../../../../core/dashboard/dashboard.sandbox';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recent-order-list',
  templateUrl: './recent-order-list.component.html',
  styleUrls: ['./recent-order-list.component.scss']
})
export class RecentOrderListComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;


  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;

  value: any
  public limit = 10;
  public offset = 0;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  public imageUrl = environment.imageUrl;
  isShow = false;
  index: any;
  pageSize: any = 10;
  defaultpagesize: any = 5;

  selectedpage: any = 10;

  perpage = [
    { id: 1, name: '10' },
    { id: 2, name: '20' },
    { id: 3, name: '30' },
    { id: 4, name: '40' },
  ];
  public keyword: any = '';

  public filterForm: UntypedFormGroup;
  translateName: any;
  todaycount: any;
  queryParams: any;
  perPageCount: boolean = false;
  indexs: number;

  constructor(
    public orderSandbox: OrderSandbox,
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public translate: TranslateService,
    public dashboardSandbox: DashboardSandbox) { }

  ngOnInit() {
    this.initFilterForm();
    this.getOrderList();
    this.getOrderListCount();

  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      OrderId: ['', Validators.required],
      CustomerName: ['', Validators.required],
      TotalAmount: ['', Validators.required],
    });
  }

  // get recent order list event
  getOrderList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.count = 0;
    params.keyword = this.keyword ? this.keyword : '';
    params.orderId = this.filterForm.value.OrderId ? this.filterForm.value.OrderId : '';
    params.amount = this.filterForm.value.TotalAmount ? this.filterForm.value.TotalAmount : '';
    params.customerName = this.filterForm.value.CustomerName ? this.filterForm.value.CustomerName : '';
    this.dashboardSandbox.getOrderList(params);


  }

  getOrderListCount() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.count = 1;
    params.keyword = this.keyword ? this.keyword : '';
    params.orderId = this.filterForm.value.OrderId ? this.filterForm.value.OrderId : '';
    params.amount = this.filterForm.value.TotalAmount ? this.filterForm.value.TotalAmount : '';
    params.customerName = this.filterForm.value.CustomerName ? this.filterForm.value.CustomerName : '';
    this.dashboardSandbox.getOrderListCount(params);
    this.subscriptions.add(this.dashboardSandbox.previousOrderListCount$.subscribe(datas => {
    }));
    this.subscriptions.add(this.dashboardSandbox.todayOrderListCount$.subscribe(data => {
      this.todaycount = data.length
    }));
  }


  viewAll() {
    this.router.navigate(['/sales/manage-orders/all-orders']);
  }

  goToOrders(id) {
    this.router.navigate(['/orders/all-orders'], { queryParams: { orderId: id } });
  }

  calculateTotal(total, discount) {
    return (+total) - (+discount);
  }
  applyFilter() {
    if (this.filterForm.value.OrderId || this.filterForm.value.CustomerName || this.filterForm.value.TotalAmount) {

      this.getOrderList();
      this.getOrderListCount();

    }
    this.getOrderList();
    this.getOrderListCount();

    this.dropdownContentFilter.nativeElement.classList.remove('show');
  }
  resetFilter() {
    this.filterForm.reset();
    this.dropdownContentFilter.nativeElement.classList.remove('show');
    this.getOrderList();
    this.getOrderListCount();

  }
  queryParam(pageSize: any, offset: any, index: number, keyword: any): void {
    this.queryParams.pageSize = pageSize;
    this.queryParams.offset = offset;
    this.queryParams.index = index;
    this.queryParams.keyword = this.keyword;
    this.setQueryParams();
  }
  setQueryParams(): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryParams,
        queryParamsHandling: 'merge',
      });
  }
  searchList(): void {
    // this.queryParams.keyword = this.keyword;
    if (this.keyword) {
      this.getOrderList();
      this.getOrderListCount();
      // this.queryParams.pageSize = this.pageSize;
      // this.queryParams.offset = 0;
      // this.queryParams.index = 1;
      // this.index = 1;
    } else if (!this.keyword) {
      const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
      this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    }
    this.getOrderList();
    this.getOrderListCount();
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    this.setQueryParams();
  }
  GetPageLimit() {
    localStorage.setItem('pagination', '')
    this.perPageCount = true
    this.pageSize = this.selectedpage.name
    this.getOrderList();
    this.indexs = 1

  }

  searchShow() {
    // this.isShow = true;
    // this.keyword = '';
  }
  remove() {
    this.keyword = '';
    const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.getOrderList();
    this.dropdownContent.nativeElement.classList.remove('show');
    // this.searchList('')
  }

  onPageChange(event: any): void {
    localStorage.setItem('pagination', '')
    this.perPageCount = false
    if (event.align == 'Left' || 'Last' || 'First') {
      this.offset = (event.index -= 1) * this.limit;
    }
    else if (event.align == 'Right') {
      this.offset = (event.index) * this.limit;
    }
    this.getOrderList();
  }
}