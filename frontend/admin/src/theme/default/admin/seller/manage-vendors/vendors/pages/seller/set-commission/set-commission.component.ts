// Angular Imports
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// Third Party Imports
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

// Serivce
import { ConfigService } from '../../../../../../../../../../src/core/admin/service/config.service';

// Sandbox
import { VendorProductSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { SettingSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { badgeStatusMappings } from './set-commission.constant';

@Component({
  selector: 'app-set-commission',
  templateUrl: './set-commission.component.html',
  styleUrls: ['./set-commission.component.scss']
})
export class SetCommissionComponent implements OnInit {

  // Variables
  ImageUrl: any = '';
  setdefaultcommission = false;
  sellerId: any;
  commissionVal: any;
  setCommissionForm: UntypedFormGroup;
  overallcommission = false;
  overallCommissionField: boolean = false;
  editSetCommissionField: boolean = false;
  vendorCommissionVal: any;
  CommissionButton = false;
  vendorDetails: any;
  productIdval: any;
  cursorList: any = [];
  translateName: any;
  
  // Status Badge
  badgeStatusMappings = badgeStatusMappings;

  // Pagination
  index = 0;
  offset = 0;
  currentPage: number = 1;
  private limit: any = sessionStorage.getItem("itemsPerPage") ?? '';

  // subscription
  private subscription: Array<Subscription> = [];

  constructor(public route: ActivatedRoute,
    public settingSandbox: SettingSandbox,
    private configService: ConfigService,
    public productSandbox: VendorProductSandbox,
    public fb: UntypedFormBuilder,
    private changeDetectRef: ChangeDetectorRef,
    private toastr: ToastrService,
    public translate: TranslateService,
  ) {
    this.sellerId = '';
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.subscription.forEach(each => each.unsubscribe());
        this.sellerId = param['id'];
        if (this.sellerId) {
          this.getSellerDetail();
          this.vendorProductList();
        }
      }
    });
  }

  ngOnInit(): void {
    this.ImageUrl = this.configService.getImageUrl();
    this.commissionForm();
    this.get();
  }

  get(): void {
    const param: any = {};
    this.settingSandbox.getCommission(param);
  }

  getSellerDetail(): void {
    const params: any = {};
    params.id = this.sellerId;
    this.settingSandbox.pageDetail(params);
    this.subscription.push(this.settingSandbox.pageDetail$.subscribe(data => {
      if (data) {
        this.vendorDetails = data;
        this.vendorCommissionVal = this.vendorDetails.commission ? this.vendorDetails.commission : 0;
        this.setCommissionForm?.controls['defaultCommission'].setValue(this.vendorCommissionVal);
        // this.changeDetectRef?.detectChanges();
      }
    }));
  }

  // Product List
  vendorProductList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const param: any = {};
    param.offset = this.offset;
    param.limit = this.limit;
    param.count = 0;
    param.vendorId = this.sellerId;
    this.productSandbox.productList(param);
    this.productSandbox.productList$.subscribe(val => {
      if (val) {
        this.cursorList = val;
      }
    })
    this.productSandbox.vendorProductListCount({ status: '', vendorId: this.sellerId, count: 1 });
  }

  // Pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.vendorProductList();
  }

  numberOnly(event): boolean {
    const percentage = event.target.value + event.key;
    if (percentage > 100) {
      return false;
    }
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getCommission(val): void {
    this.productSandbox.productList$.subscribe(data => {
      if (data) {
        data.forEach(item => {
          this.commissionVal = item.vendorProductCommission
        })
      }
    })
    this.commissionVal = val;
  }

  setCommissionForSingleProduct(val, datas): void {
    this.commissionVal = this.commissionVal ? this.commissionVal : datas.vendorProductCommission;
    const params: any = {};
    params.productId = String(val);
    params.commission = String(this.commissionVal);
    if (val == this.productIdval) {
      this.productSandbox.doProductCommission(params);
    } else {
      this.translateName = this.translate.instant('reports.Pleaseeditthetax');
    }
  }

  /*Overall commission*/
  setOverallCommision(products): void {
    this.overallcommission = !this.overallcommission
    this.overallCommissionField = false;
    const array = [];
    products.forEach(data => {
      array.push(data.productId);
    });
    const params: any = {};
    params.productId = array.toString();
    params.commission = Number(this.commissionVal);
    this.productSandbox.doProductCommission(params);
    this.subscription.push(this.productSandbox.productCommissionLoaded$.subscribe(data => {
      if (data === true) {
        this.vendorProductList();
        this.overallCommissionField = false;
      }
    }));
  }

  // Form
  commissionForm(): void {
    this.setCommissionForm = this.fb.group({
      defaultCommission: ['', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(2)
      ]],
    });
  }

  setCommission(): void {
    const params: any = {};
    params.defaultCommission = this.setCommissionForm.value.defaultCommission;
    params.vendorId = Number(this.sellerId);
    this.settingSandbox.commission(params);
    this.setCommissionForm.reset();
    this.subscription.push(this.settingSandbox.getSetCommissionResponse$.subscribe(data => {
      const param: any = {};
      param.id = this.sellerId;
      this.settingSandbox.pageDetail(param);
      this.editSetCommissionField = false;
    }));
  }

  editSetCommission(): void {
    this.editSetCommissionField = true;
    this.CommissionButton = true;
    const params: any = {};
  }

  clearCommission(): void {
    this.subscription.push(this.settingSandbox.getSetCommissionResponse$.subscribe(data => {
      const params: any = {};
      this.settingSandbox.getCommission(params);
      this.editSetCommissionField = false;
    }));
  }

  setCommissionButton(): void {
    this.CommissionButton = true;
  }

  maxLengthCheck(event) {
    const percentage = event.target.value + event.key;
    if (percentage > 100) {
      return false;
    }
  }

  edit(val, values, index): void {
    const next = index === this.cursorList.length ? 0 : index;
    document.getElementById(`input${next}`).focus();
    this.productIdval = val;
  }

  cursorpointer(index): void {
    const next = index === this.cursorList.length ? 0 : index;
    document.getElementById(`input${next}`).focus();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(each => each.unsubscribe());
  }

}
