import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { ActivatedRoute, Router, provideRoutes } from '@angular/router';
import {
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup,
  FormControl
} from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  providers: [DecimalPipe],
  selector: 'app-archive-payments',
  templateUrl: './archive-payments.component.html',
  styleUrls: ['./archive-payments.component.scss']
})
export class ArchivePaymentsComponent implements OnInit, AfterViewInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;
 

  public current = new Date();
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
  public vendorDetails: any;
  public queryData: any = {};
  minPickerDate: any;
  index:any;
  pageSize: any=10;
  
  queryParams: any={};
  public keyword ;
  public translateName:any;
  perPageCount:boolean = false
  indexs: number;

  public name: any;
  perpage = [
    {id: 1, name: '10'},
    {id: 2, name: '20'},
    {id: 3, name: '30'},
    {id: 4, name: '40'},
  ];
  selectedpage: any=10;
  selectedData:any=[];
  selectAllData:boolean= false;
  defaultpagesize: any;

  constructor(
    public paymentSandbox: PaymentSandbox,
    public formBuilder: UntypedFormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public toastr:ToastrService,
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
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.initFilterForm();
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.currentPage = this.route.snapshot.queryParamMap.get('index');
    this.getArchivePaymentList(this.pageSize,this.offset);
    
    this.getPaymentCount();
  this.subscriptions.add(this.paymentSandbox.archivePaymentList$.subscribe(data => {
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




  getArchivePaymentList(limit:number,offset:number) {
    const params: any = {};
    params.offset = offset;
    params.limit = this.pageSize ? this.pageSize :10;
    params.keyword= this.keyword ? this.keyword : '';
    // params.orderId = this.filterForm.value.OrderId ? this.filterForm.value.OrderId : 0;
    
    // params.customerName = this.filterForm.value.CustomerName ? this.filterForm.value.CustomerName : '';

    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.paymentSandbox.getArchivePaymentList(params);
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
      this.getArchivePaymentList(this.pageSize,this.offset);
      this.getPaymentCount();
    }
    this.getArchivePaymentList(this.pageSize,this.offset);
    this.getPaymentCount();
    this.dateError = '';
    this.dropdownContentFilter.nativeElement.classList.remove('show');
  }

  downloadInvoice(id) {
    const params: any = {};
    params.vendorOrderId = id;
    this.paymentSandbox.downloadInvoice(params);
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

  resetFilter() {
    this.loader = false;
    this.startDate = '';
    this.endDate = '';
    this.dateError = '';
    this.selectAllData=false;
    this.isRequired = false;
    this.filter = false;
    this.filterForm.reset();
    this.dropdownContentFilter.nativeElement.classList.remove('show');
    this.getArchivePaymentList(this.pageSize,this.offset);
    this.getPaymentCount();
  }

  resetDateFilter() {
    this.loader = false;
    this.startDate = '';
    this.endDate = '';
    this.selectAllData=false;
    this.filter = false;
    this.filterForm.controls['fromDate'].reset();
    this.filterForm.controls['toDate'].reset();
    this.getArchivePaymentList(this.pageSize,this.offset);
    this.getPaymentCount();
  }

  exportPayment() {
    if (this.selectedData.length > 0) {
      const filterID = this.selectedData.map(val => (val.vendorArchivePaymentId))
      const params: any = {};
      params.vendorPaymentArchiveId = filterID.toString();
      this.paymentSandbox.exportArchivePayment(params);
      this.paymentSandbox.exportArchivePaymentLoaded$.subscribe(data => {
        if (data === true) {
          this.paymentSandbox.removeExportSelection('archivePayment');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    }

  }

  exportAllArchivePayment() {
    const params: any = {};
    params.vendorId = this.vendorDetails.vendorId;
    this.paymentSandbox.exportAllArchivePayment(params);
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
    this.filterDataId = this.filterData.map(obj => obj.vendorArchivePaymentId);
  }

 
                  
 
        
                    
  result(val?) {
    if(val=='selectAllData' ) {
      this.paymentArray.forEach(val=>val.selected = this.selectAllData);
    }
   this.selectedData = this.paymentArray.filter(item => item.selected);
   this.selectAllData = this.paymentArray.every(item => item.selected);
 }

  getPaymentCount() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword ? this.keyword : '';
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.isRefresh = false;
   
    params.count = 1;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.paymentSandbox.getArchivePaymentListCount(params);
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
      this.queryParams.pageSize = 10;
      this.queryParams.offset = 0;
      this.queryParams.index = 1;
      this.index = 1;
      this.getArchivePaymentList(this.pageSize, 0);
      this.getPaymentCount();
    } else if (!this.keyword) {
      const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
      this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
      this.getArchivePaymentList(this.pageSize, offset);
      this.getPaymentCount();
    }
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    this.setQueryParams();
  }
  GetPageLimit(): void {
    localStorage.setItem('pagination','')
    this.perPageCount = true
    this.pageSize = this.selectedpage.name
    this.getArchivePaymentList(this.pageSize, 0);
    this.indexs = 1;
  }
  
  remove(){
   
    this.keyword = '';
    const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.dropdownContent.nativeElement.classList.remove('show');
    this.getArchivePaymentList(this.pageSize, offset);
      this.searchList('')
      this.loader=false;
      this.selectAllData=false;
  
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
    this.getArchivePaymentList(this.pageSize, this.offset);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
