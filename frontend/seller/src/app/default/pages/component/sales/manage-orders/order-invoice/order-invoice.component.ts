import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup,
  FormControl
} from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({

  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;
 

 
  public filterForm: UntypedFormGroup;
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public startDate: any;
  public isRequired = false;
  public endDate: any;
  public selectedAll: any;
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public orderArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public limit = 5;
  public offset: any = 0;
  public currentPage: any = 1;
  // public config: SwiperConfigInterface = {};
  config: any;
  public vendorDetails: any; 
  public subscriptions: Array<Subscription> = [];
  public selectedOrderId: any;
  public queryData: any = {};
  minPickerDate: any;

  pageSize: any=10;
 
  queryParams: any={};
  public keyword ;
  public translateName:any
  index: any;
  public  selectedpage:any =10;

  perPageCount:boolean = false
  indexs: number;

  perpage = [
    {id: 1, name: '10'},
    {id: 2, name: '20'},
    {id: 3, name: '30'},
    {id: 4, name: '40'},
  ];


  constructor(
    public orderSandbox: OrderSandbox,
    public formBuilder: UntypedFormBuilder,
    public router: Router,
    public cd: ChangeDetectorRef,
    public route: ActivatedRoute,
    public toastr:ToastrService,
    public translate:TranslateService,
  ) {
    
    this.offset =  parseInt(this.route.snapshot.queryParamMap.get('offset')) || this.offset ;
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize')|| this.pageSize;
    this.keyword = this.route.snapshot.queryParamMap.get('keyword')|| '';
    this.queryParam(this.pageSize,this.offset,this.index,this.keyword);
    const value = 'pageInital'
    localStorage.setItem('pagination',value)

    // const pageIndex = this.getPageIndex()
  
  //   if (pageIndex) {
  //       const index = parseInt(pageIndex, 10) - 1
  //       this.offset = 10 * index
  //       this.index = index
  //   } else {
  //       this.offset = this.route.snapshot.queryParamMap.get("offset") || 0
  //       this.index = this.route.snapshot.queryParamMap.get("index")
  //   }
  // }
  // public getPageIndex():string {
  //   return localStorage.getItem("adminProductPageIndex")
  }




  

  ngOnInit() {
   
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.initFilterForm();
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.currentPage = this.route.snapshot.queryParamMap.get('index');
    this.getOrderInvoiceList(this.pageSize,this.offset);
    this.getOrderInvoiceListCount();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2
        },
        960: {
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

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      keyword: ['']
    });
  }


  getOrderInvoiceList(limit:number,offset:number) {
    const params: any = {};
    params.offset = offset;
    params.limit = this.pageSize ? this.pageSize :10;
    params.keyword= this.keyword ? this.keyword : '';
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.count = 0;
    params.firstName = this.filterForm.value.FirstName ? this.filterForm.value.FirstName : '';
    params.lastName = this.filterForm.value.LastName ? this.filterForm.value.LastName : '';
    this.orderSandbox.getOrderInvoiceList(params);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.currentPage || 1;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getOrderInvoiceListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.filterForm.value.keyword;
    params.firstName = this.filterForm.value.FirstName ? this.filterForm.value.FirstName : '';
    params.lastName = this.filterForm.value.LastName ? this.filterForm.value.LastName : '';
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.count = 1;
    this.orderSandbox.getOrderInvoiceListCount(params);
  }

  searchOrderInvoice(value) {
    this.getOrderInvoiceList(this.pageSize,this.offset);
    this.getOrderInvoiceListCount();
  }

  applyFilter() {
    if (this.filterForm.value.fromDate || this.filterForm.value.toDate || this.filterForm.value.FirstName || this.filterForm.value.LastName) {
      if (
        (this.filterForm.controls['toDate'].value === '' ||
          this.filterForm.controls['toDate'].value === null) &&
        this.filterForm.controls['fromDate'].value) {
        this.isRequired = true;
        return;
      }
      // if (this.filterForm.valid) {
        const form = this.filterForm.value.fromDate;
        const to = this.filterForm.value.toDate;
        this.filter = true;
        if (form && form.year) {
          this.startDate = form.year + '-' + form.month + '-' + form.day;
        }
        if (to && to.year) {
          this.endDate = to.year + '-' + to.month + '-' + to.day;
        }
        // this.dropdown.close();
      // }
      this.getOrderInvoiceList(this.pageSize,this.offset);
      this.getOrderInvoiceListCount();
    }
    this.getOrderInvoiceList(this.pageSize,this.offset);
      this.getOrderInvoiceListCount();
      this.dateError = '';
    this.dropdownContentFilter.nativeElement.classList.remove('show');
  }

  onDateSelect(event) {
    this.miniDate = event;
    this.dateError = '';
  }

  setMinValue(d) {
    this.isRequired = false;
    if (
      this.filterForm.controls['fromDate'].value === '' ||
      this.filterForm.controls['fromDate'].value === null
    ) {
      this.dateError = 'common.ChooseFromDateFirst';
      return;
    }
    d.toggle();
  }

  close() {
    this.dropdown.close();
  }

  resetDateFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filter = false;
    this.filterForm.controls['fromDate'].reset();
    this.filterForm.controls['toDate'].reset();
    this.getOrderInvoiceList(this.pageSize,this.offset);
    
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.dateError = '';
    this.isRequired = false;
    this.filter = false;
    this.filterForm.reset();
    this.dropdownContentFilter.nativeElement.classList.remove('show');
    this.getOrderInvoiceList(this.pageSize,this.offset);
  }

  // bulk delete checkbox event
  selectAll(event) {
    for (let i = 0; i < this.orderArray.length; i++) {
      this.orderArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.orderArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.orderArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderProductId);
  }

  public exportAllOrder() {
    const params: any = {};
    params.orderId = JSON.parse(localStorage.getItem('vendorUser')).vendorId;
    this.orderSandbox.allExportOrderInvoice(params);
  }
  changeStatus(list, event) {
    const params: any = {};
    params.cancelStatusId = event.value;
    params.orderProductId = list.orderProductId;
    this.orderSandbox.changeCancelOrderStatus(params);
    this.subscriptions.push(this.orderSandbox.cancelOrderStatusLoaded$.subscribe(data => {
      if (data && data === true) {
        this.cd.detectChanges();
      }
    }));
  }

  changeAllStatus(event) {
    const params: any = {};
    params.orderProductId = this.filterDataId.toString();
    params.cancelStatusId = event.value;
    this.orderSandbox.bulkCancelOrderStatus(params);
    this.subscriptions.push(this.orderSandbox.bulkCancelOrderStatusLoaded$.subscribe(data => {
      if (data && data === true) {
        this.cd.detectChanges();
        this.orderSandbox.RemoveExportSelection('cancelOrder');
        this.selectedAll = false;
        this.filterDataId = [];
      }
    }));
  }

  downloadInvoice(list) {
    const params: any = {};
    params.orderId = list.orderId;
    this.selectedOrderId = list.orderId;
    this.orderSandbox.downloadInvoice(params);
  }

  sendMail(list) {
    const params: any = {};
    params.orderId = list.orderId;
    this.selectedOrderId = list.orderId;
    this.orderSandbox.sendMail(params);
  }
  invoiceListSearch(e) {
    this.filterForm.value.keyword = e;
    this.getOrderInvoiceList(this.pageSize,this.offset);
    this.getOrderInvoiceListCount();
  }


  queryParam(pageSize: any,offset: any,index: number,keyword: any){
    this.queryParams.pageSize = pageSize;
    this.queryParams.offset =  offset;
    this.queryParams.index = index;
    this.queryParams.keyword = this.keyword;
    this.setQueryParams();
    }
    setQueryParams(){
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: this.queryParams,
          queryParamsHandling: 'merge',
        });
      }
  searchList(event:any) {
    this.queryParams.keyword = event;
    if (this.keyword) {
      this.queryParams.pageSize = this.pageSize;
      this.queryParams.offset = 0;
      this.queryParams.index = 1;
      this.index = 1;
      this. getOrderInvoiceList(this.pageSize, 0);
      this. getOrderInvoiceListCount();
    } else if (!this.keyword) {
      const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
      this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
      this.getOrderInvoiceList(this.pageSize, offset);
      this.getOrderInvoiceListCount();
    }
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    this.setQueryParams();
  }

 

 

 
GetPageLimit(){
  localStorage.setItem('pagination','')
  this.perPageCount = true
  this.pageSize = this.selectedpage.name
  this.getOrderInvoiceList(this.pageSize, 0);
  this.indexs = 1
  
}

  remove(){
    this.keyword = '';
    const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.dropdownContent.nativeElement.classList.remove('show');
    this.getOrderInvoiceList(this.pageSize, offset);
      this.searchList('')
  
  }
  onPageChange(event:any):void {
    localStorage.setItem('pagination','')

   
    this.perPageCount = false
     if(event.align == 'Left' || 'Last' || 'First' ){
      this.offset = (event.index -= 1) * this.limit;
     }
     else if (event.align == 'Right'){
      this.offset = (event.index) * this.limit;
     }
    this.getOrderInvoiceList(this.pageSize, this.offset);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
