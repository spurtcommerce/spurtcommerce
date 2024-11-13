import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;

  perPageCount: boolean = false;
  indexs: number;


  loader: boolean = false;
  public filterForm: UntypedFormGroup;
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public startDate: any;
  public isRequired = false;
  public endDate: any;
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public keyword = '';
  public earningsArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public selectedAll: any;
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  public queryData: any = {};

  minPickerDate: any;
  index: number = 1;
  pageSize: any = 10;
  defaultpagesize: any = 5;
  queryParams: any = {};
  searchName;

  public name: any;
  perpage = [
    { id: 1, name: '10' },
    { id: 2, name: '20' },
    { id: 3, name: '30' },
    { id: 4, name: '40' },
  ];
  selectedpage: any = 10;

  translateName: any;

  constructor(public paymentSandbox: PaymentSandbox,
    public formBuilder: UntypedFormBuilder,
    public toastr: ToastrService,
    public translate: TranslateService,
    public router: Router, public route: ActivatedRoute, public titleService: Title) {
      this.offset = parseInt(this.route.snapshot.queryParamMap.get('offset')) || this.offset;
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index')) || this.index;
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize') || this.pageSize;
    this.keyword = this.route.snapshot.queryParamMap.get('keyword') || '';
    this.defaultpagesize = Number(this.route.snapshot.queryParamMap.get('pageSize')) || this.defaultpagesize;
    this.queryParam(this.pageSize, this.offset, this.index, this.keyword);
    const value = 'pageInital'
    localStorage.setItem('pagination', value)
  }
  ngOnInit() {
    this.initFilterForm();
    this.titleService.setTitle('Earnings');
    this.getEarningsList(this.pageSize, this.offset);
    this.subscriptions.add(this.paymentSandbox.categoryList$.subscribe(data => {
      if (data) {
        this.earningsArray = data;
      }
    }));
    this.getTotalEarningsCount();
  }

  initFilterForm() {



    this.filterForm = this.formBuilder.group({

      SKU: ['', Validators.required],
      ProductName: ['', Validators.required],

    });
  }



  applyFilter() {
    this.loader = true;

    if (this.filterForm.value.SKU || this.filterForm.value.ProductName) {
      this.getEarningsList(this.pageSize, this.offset);
      this.getTotalEarningsCount();
    }
    this.getEarningsList(this.pageSize, this.offset);
    this.getTotalEarningsCount();
    this.dropdownContentFilter.nativeElement.classList.remove('show');
  }
  resetFilter() {
    this.loader = false;
    this.selectedAll = false;
    this.filterForm.reset();
    this.dropdownContentFilter.nativeElement.classList.remove('show');
    this.getEarningsList(this.pageSize, this.offset);
    this.getTotalEarningsCount();
  }






  // initFilterForm() {
  //   this.filterForm = this.formbuilder.group({
  //     fromDate: ['', Validators.required],
  //     toDate: ['', Validators.required],

  //   });
  // }
  // applyFilter() {
  //   if (
  //     (this.filterForm.controls['toDate'].value === '' ||
  //       this.filterForm.controls['toDate'].value === null) &&
  //     this.filterForm.controls['fromDate'].value !== '' &&
  //     this.filterForm.controls['fromDate'].value !== null
  //   ) {
  //     this.isRequired = true;
  //     return;
  //   }
  //   const form = this.filterForm.value.fromDate;
  //   const to = this.filterForm.value.toDate;
  //   this.filter = true;
  //   if (form && form.year) {
  //     this.startDate = form.year + '-' + form.month + '-' + form.day;
  //   }
  //   if (to && to.year) {
  //     this.endDate = to.year + '-' + to.month + '-' + to.day;
  //   }
  //   this.dropdown.close();
  //   this.getEarningsList(this.pageSize,this.offset);
  // }

  onDateSelect(event) {
    event.stopPropogation();
    this.miniDate = event;
    this.dateError = '';
  }
  GetPageLimit() {
    localStorage.setItem('pagination', '')

    this.perPageCount = true
    this.pageSize = this.selectedpage.name
    this.getEarningsList(this.pageSize, this.offset);
    this.indexs = 1

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
    this.getEarningsList(this.pageSize, this.offset);
  }


  remove() {

    // this.isShow = false;
    this.keyword = '';
    const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
    this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
    this.dropdownContent.nativeElement.classList.remove('show');
    this.getEarningsList(this.pageSize, offset);
    this.searchList('')
    this.loader = false;
  }


  setMinValue(d) {
    this.isRequired = false;
    if (
      this.filterForm.controls['fromDate'].value === '' ||
      this.filterForm.controls['fromDate'].value === null
    ) {
      this.dateError = 'Choose From Date First';
      return;
    }
    d.toggle();
  }

  close() {
    this.dropdown.close();
  }

  getEarningsList(limit: number, offset: number) {
    const params: any = {};
    params.deliveryList = 1;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.keyword = this.keyword;
    params.limit = this.limit;
    params.offset = offset;
    params.productName = this.filterForm.value.ProductName ? this.filterForm.value.ProductName : '';

    params.sku = this.filterForm.value.SKU ? this.filterForm.value.SKU : '';
    this.paymentSandbox.getCategoryList(params);
  }

  exportEarnings() {
    if (this.filterDataId.length > 0) {
      const params: any = {};
      params.productId = this.filterDataId.toString();
      this.paymentSandbox.multipleEarningExport(params);
      this.paymentSandbox.categoryListLoaded$.subscribe(data => {
        if (data === true) {
          this.paymentSandbox.removeExportSelection('earning');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    } else {
      const params: any = {};
      const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
      params.vendorId = vendor.vendorId;
      this.paymentSandbox.exportEarning(params);
    }
  }

  search(val) {
    this.loader = true;
    this.keyword = val;

    this.getEarningsList(this.pageSize, this.offset);
    this.getTotalEarningsCount();
  }
  // resetFilter() {
  //   this.keyword = '';
  //   this.searchName ='';

  //   this.getEarningsList(this.pageSize,this.offset);
  //   this.getTotalEarningsCount();
  // }
  selectAll() {
    for (let i = 0; i < this.earningsArray.length; i++) {
      this.earningsArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.earningsArray.every(function (item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  filterDataList() {
    this.filterData = this.earningsArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  getTotalEarningsCount() {
    const params: any = {};
    params.deliveryList = 1;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.keyword = this.keyword;
    params.limit = this.limit;
    params.offset = this.offset;
    params.count = 1;
    params.productName = this.filterForm.value.ProductName ? this.filterForm.value.ProductName : '';

    params.sku = this.filterForm.value.SKU ? this.filterForm.value.SKU : '';
    this.paymentSandbox.getEarningListCount(params);
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

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getEarningsList(this.pageSize, this.offset);
  }




  queryParam(pageSize: any, offset: any, index: number, keyword: any) {
    this.queryParams.pageSize = pageSize;
    this.queryParams.offset = offset;
    this.queryParams.index = index;
    this.queryParams.keyword = this.keyword;
    this.setQueryParams();
  }
  setQueryParams() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryParams,
        queryParamsHandling: 'merge',
      });
  }
  searchList(event: any) {
    this.queryParams.keyword = event;
    if (this.keyword) {
      this.queryParams.pageSize = 10;
      this.queryParams.offset = 0;
      this.queryParams.index = 1;
      this.index = 1;
      this.getEarningsList(this.pageSize, 0);
      this.getTotalEarningsCount();
    } else if (!this.keyword) {
      const offset = parseInt(this.route.snapshot.queryParamMap.get('offset'));
      this.index = parseInt(this.route.snapshot.queryParamMap.get('index'));
      this.getEarningsList(this.pageSize, offset);
      this.getTotalEarningsCount();
    }
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    this.setQueryParams();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}


