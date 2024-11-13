import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { ConfigService } from 'src/core/admin/service/config.service';
import { SettingSandbox } from 'src/core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from 'src/core/admin/vendor/pages/vendor-setting/vendor-setting.service';

@Component({
  selector: 'app-assign-category',
  templateUrl: './assign-category.component.html',
  styleUrls: ['./assign-category.component.scss']
})
export class AssignCategoryComponent implements OnInit {

private subscription: Array<Subscription> = [];
public ImageUrl: any = '';
public setdefaultcommission=false;
public sellerId: any;
public vendorDetails: any;
public vendorCommissionVal: any;
editSetCommissionField: boolean = false;
public CommissionButton = false;
public setCommissionForm: UntypedFormGroup;
public searchText = '';
public clear = false;

public selectedCategory = []; 
public searchSelectedText = '';


  constructor(
    public route: ActivatedRoute,
    public settingSandbox: SettingSandbox,
    public settingService: SettingService,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef,
    public fb: UntypedFormBuilder,
    private toastr: ToastrService
  ) {
    this.sellerId = '';
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.subscription.forEach(each => each.unsubscribe());
        this.sellerId = param['id'];
        if (this.sellerId) {
          this.getSellerDetail();
          this.subscribe();
        }
      }
    });
   }

  ngOnInit(): void {
    this.ImageUrl = this.configService.getImageUrl();
    this.commissionForm();
    this.get();
    this.categoryList()
  }

  get() {
    const param: any = {};
    this.settingSandbox.getCommission(param);
  }

  getSellerDetail() {
    const params: any = {};
    params.id = this.sellerId;
    this.settingSandbox.pageDetail(params);
    this.subscription.push(this.settingSandbox.pageDetail$.subscribe(data => {
      if (data) {
        this.vendorDetails = data;
        this.vendorCommissionVal = this.vendorDetails.commission ? this.vendorDetails.commission : 0;
        this.changeDetectRef.detectChanges();
        this.setCommissionForm.controls['defaultCommission'].setValue(this.vendorCommissionVal);
        if (this.vendorDetails) {
          this.selectedCategory = [];
          this.catList();
        }
        
      }
    }));
  }

  catList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.count = 0;
    param.vendorId = this.sellerId;
    this.settingSandbox.catlist(param);
  }

  commissionForm() {
    this.setCommissionForm = this.fb.group({
      defaultCommission: ['', [
        Validators.required,
        Validators.minLength(0),
        Validators.maxLength(2)
      ]],
    });
  }

  editSetCommission() {
    this.editSetCommissionField = true;
    this.CommissionButton = true;
    const params: any = {};
  }

  setCommissionButton() {
    this.CommissionButton = true;
  }

  maxLengthCheck(event) {
    const percentage = event.target.value + event.key;

    if (percentage > 100) {
      return false;
    }
  }

  setCommission() {
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



    // get category list from filter
    subscribe() {
      this.subscription.push(this.settingSandbox.getCatListResponse$.subscribe(data => {
        if (data) {
          this.selectedCategory = [];
          if(data && data.length>0){
            
          }
          data.forEach(dataVal => {
            this.selectedCategory.push(dataVal);
            this.settingSandbox.addCategory(dataVal);
          });
        }
      }));
    }
    addCategory(category) {
      this.selectedCategory.push(category);
      this.settingSandbox.addCategory(category);
      this.settingSandbox.getCatListResponse$.subscribe(data=>{
      })
    }
    createCategory() {
      if (this.selectedCategory.length === 0) {
        this.toastr.error('Please choose atleast one category');
        return;
      }
      const category = this.selectedCategory.map(val => {
        return val.categoryId;
      });
      const params: any = {};
      params.vendorId = this.sellerId;
      params.categoryId = category.toString();
      // params.commission = this.settingForm.value.commission;
      this.settingSandbox.updatecategories(params);
      this.subscription.push(this.settingSandbox.getUpdateCategoriesRequestLoaded$.subscribe(data => {
        if (data === true) {
          this.getSellerDetail();
        }
      }));
    }
  
    addAllCategory(categoryList) {
      this.selectedCategory = categoryList;
      this.settingSandbox.addCategory(categoryList);
    }
  
    removeAllCategory() {
      this.clear = true;
      if (this.selectedCategory.length > 0) {
        this.settingSandbox.removeCategory(this.selectedCategory);
        this.selectedCategory = [];
      }
    }

    categoryList() {
      const param: any = {};
      param.limit = 0;
      param.offset = 0;
      param.count = 0;
      this.settingSandbox.categorylist(param);
    }
    removecategory(category) {
      this.selectedCategory = this.selectedCategory.filter(cat => {
        if (cat.categoryId === category.categoryId) {
          return false;
        } else {
          return true;
        }
      });
      this.settingSandbox.removeCategory(category);
    }
  

  ngOnDestroy() {
    this.subscription.forEach(each => each.unsubscribe());
  }

}
