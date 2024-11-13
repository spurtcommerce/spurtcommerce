import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { NgbDropdown, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  
  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;
  

  loader: boolean = false;
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
  public paymentArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public limit = 10;
  public offset: any = 0;
  public currentPage: any = 1;
  // public config: SwiperConfigInterface = {};
  config: any;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  private subscriptions: Array<Subscription> = [];
  public queryData: any = {};
  minPickerDate: any;
  index: any;
 
  queryParams: any={};
  keyword: string;
  public translateName:any

  public name: any;
  pageSize: any=10;
  selectedpage: any = 10;
  perpage = [
    {id: 1, name: '10'},
    {id: 2, name: '20'},
    {id: 3, name: '30'},
    {id: 4, name: '40'},
  ];
  selectedData:any=[];
  selectAllData:boolean= false;

  perPageCount:boolean = false
  indexs: number;
  defaultpagesize: any;
        
  constructor(
    public paymentSandbox: PaymentSandbox,
    public formBuilder: UntypedFormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    public translate:TranslateService,
    
  ) {

    
    this.offset =  parseInt(this.route.snapshot.queryParamMap.get('offset')) || this.offset ;
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'))|| this.index;
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize')|| this.pageSize;
    this.keyword = this.route.snapshot.queryParamMap.get('keyword')|| '';
    this.defaultpagesize = Number(this.route.snapshot.queryParamMap.get('pageSize'))|| this.defaultpagesize;
    this.queryParam(this.pageSize,this.offset,this.index,this.keyword);
    const value = 'pageInital'
    localStorage.setItem('pagination',value)
  }
 
  

   

  ngOnInit() {
    this.initFilterForm();
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.currentPage = this.route.snapshot.queryParamMap.get('index');
    this.getPaymentList(this.pageSize,this.offset);
    this.getPaymentCount();
  this.subscriptions.push(this.paymentSandbox.paymentList$.subscribe(data => {
      if (data) {
        this.paymentArray = data;
      }
    }));
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
      keyword: ['']
    });
  }

  
  




  getPaymentList(limit:number,offset:number) {
    const params: any = {};
    params.offset = offset;
    params.limit = this.pageSize ? this.pageSize :10;
    params.keyword= this.keyword ? this.keyword : '';
    // params.orderId = this.filterForm.value.OrderId ? this.filterForm.value.OrderId : 0;
    
    // params.customerName = this.filterForm.value.CustomerName ? this.filterForm.value.CustomerName : '';

    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.paymentSandbox.getPaymentList(params);
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
    this.loader = true;
    this.queryParams.keyword = event;
    if (this.keyword) {
      this.queryParams.pageSize = 10;
      this.queryParams.offset = 0;
      this.queryParams.index = 1;
      this.index = 1;
      this.getPaymentList(this.pageSize, 0);
      this.getPaymentCount();
    } else if (!this.keyword) {
      const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
      this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
      this.getPaymentList(this.pageSize, offset);
      this.getPaymentCount();
    }
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    this.setQueryParams();
  }

  applyFilter() {
    this.loader = true;
    if (this.filterForm.value.fromDate || this.filterForm.value.toDate || this.filterForm.value.keyword) {
      if (
        (this.filterForm.controls['toDate'].value === '' ||
          this.filterForm.controls['toDate'].value === null) &&
        this.filterForm.controls['fromDate'].value) {
        this.isRequired = true;
        return;
      }
      if (this.filterForm.valid) {
        const form = this.filterForm.value.fromDate;
        const to = this.filterForm.value.toDate;
        this.filter = true;
        if (form && form.year) {
          this.startDate = form.year + '-' + form.month + '-' + form.day;
        }
        if (to && to.year) {
          this.endDate = to.year + '-' + to.month + '-' + to.day;
        }
      }
      this.getPaymentList(this.pageSize,this.offset);
      this.getPaymentCount();
    }
    this.getPaymentList(this.pageSize,this.offset);
      this.getPaymentCount();
      this.dateError = ''
    this.dropdownContentFilter.nativeElement.classList.remove('show');
  }

  downloadInvoice(id) {
    const params: any = {};
    params.vendorOrderId = id;
    this.paymentSandbox.downloadInvoice(params);
  }

  goToOrders(id) {
    this.router.navigate(['/orders/all-orders'], {
      queryParams: { orderId: id }
    });
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
    this.loader = false;
    this.startDate = '';
    this.endDate = '';
    this.filter = false;
    this.selectAllData = false;
    this.filterForm.controls['fromDate'].reset();
    this.filterForm.controls['toDate'].reset();
    this.getPaymentList(this.pageSize,this.offset);
  }
  resetFilter() {
    this.loader = false;
    this.selectAllData = false;
    this.startDate = '';
    this.endDate = '';
    this.dateError = '';
    this.isRequired = false;
    this.filter = false;
    this.filterForm.reset();
    this.dropdownContentFilter.nativeElement.classList.remove('show');
    this.getPaymentList(this.pageSize,this.offset);
    this.getPaymentCount();
  }

  exportPayment() {

    if (this.selectedData.length > 0) {
      const filterId = this.selectedData.map(val => (val.vendorOrderId))
     
      const params: any = {};
      params.vendorOrderId = filterId.toString();
      this.paymentSandbox.multiplePaymentExport(params);
      this.paymentSandbox.MultiplePaymentExportLoaded$.subscribe(data => {
        if (data === true) {
          this.paymentSandbox.removeExportSelection('payment');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    } else {
      const params: any = {};
      const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
      params.vendorId = vendor.vendorId;
      this.paymentSandbox.exportPayment(params);
    }

  }

  selectAll() {
    for (let i = 0; i < this.paymentArray.length; i++) {
      this.paymentArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.paymentArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  filterDataList() {
    this.filterData = this.paymentArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.vendorOrderId);
  }



                    
  result(val?) {
    if(val=='selectAllData' ) {
      this.paymentArray.forEach(val=>val.selected = this.selectAllData);
    }
   this.selectedData = this.paymentArray.filter(item => item.selected);
   this.selectAllData = this.paymentArray.every(item => item.selected);

 }
  // pageChange(event) {
  //   this.currentPage = event;
  //   this.offset = this.limit * (event - 1);
  //   this.getPaymentList(this.pageSize,this.offset);
  // }
  getPaymentCount() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword ? this.keyword : '';
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.isRefresh = false;
    // params.orderId = this.filterForm.value.OrderId ? this.filterForm.value.OrderId : 0;
    
    // params.customerName = this.filterForm.value.CustomerName ? this.filterForm.value.CustomerName : '';
    params.keyUp = false;
    params.count = 1;
    

    this.paymentSandbox.getPaymentListCount(params);
  }

  makeArchive(id) {
    const params: any = {};
    params.vendorPaymentId = id;
    this.paymentSandbox.makePaymentArchive(params);
    this.subscriptions.push(this.paymentSandbox.makePaymentArchive$.subscribe(data => {
      if (data && data['status'] === 1) {
        this.getPaymentList(this.pageSize,this.offset);
      }
    }));
  }

  searchPayments(e) {
    this.filterForm.value.keyword = e;
    this.getPaymentList(this.pageSize,this.offset);
    this.getPaymentCount();
  }

  GetPageLimit(){
    localStorage.setItem('pagination','')
    this.perPageCount = true
    this.pageSize = this.selectedpage.name
    this.getPaymentList(this.pageSize, 0);
    this.indexs = 1
    
  }
  
  remove(){
   
    this.keyword = '';
    const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.dropdownContent.nativeElement.classList.remove('show');
    this. getPaymentList(this.pageSize, offset);
      this.searchList('')
      this.loader = false;
  
  }
  onPageChange(event:any): void {
    localStorage.setItem('pagination','')
   
    this.perPageCount = false
     if(event.align == 'Left' || 'Last' || 'First' ){
      this.offset = (event.index -= 1) * this.limit;
     }
     else if (event.align == 'Right'){
      this.offset = (event.index) * this.limit;
     }
    this.getPaymentList(this.pageSize, this.offset);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
