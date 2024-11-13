/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
 * Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// Angular Imports
import { Component, OnInit, HostListener, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

// Third Party Imports
import { Subscription } from "rxjs";
import * as _ from "lodash";

// Sandbox 
import { SettingSandbox } from "../../../../../../../../../../src/core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox";
import { VendorGroupSandbox } from "../../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox";

@Component({
  selector: "app-vendor-group-add",
  templateUrl: "vendor-group-add.component.html",
  styleUrls: ["vendor-group-add.component.scss"],
})
export class vendorGroupAddComponent implements OnInit, OnDestroy {

  // Form 
  public vendorGroupAddForm: UntypedFormGroup;
  public GroupName: UntypedFormControl;
  public status: UntypedFormControl;
  public GroupCommission: UntypedFormControl;
  public submitted = false;
  public commissionError: any = "";
  public myValue: boolean;
  public myValues: boolean;
  public details: any;

  // seller group id
  public id: any;

  // scroll
  public showBackToTop = false;

  public queryDetails: any = {};
  // Select category
  public selectedCategory = [];
  public searchSelectedText = "";
  public clear = false;
  public searchText = "";
  // public selectedCategoryIds: any = [];

  // subscription
  private subscription = new Subscription();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public fb: UntypedFormBuilder,
    public vendorGroupSandbox: VendorGroupSandbox,
    public settingSandbox: SettingSandbox,
    public titleService: Title
  ) {
    this.titleService.setTitle('Seller Group');
    const offset = this.route.snapshot.queryParamMap.get("offset");
    const index = this.route.snapshot.queryParamMap.get("index");
    // this.queryDetails.offset = offset || 0;
    // this.queryDetails.index = index || 0;
  }

  ngOnInit() {
    this.categoryList();
    this.sellerForm();
    this.myValue = true;
    this.myValues = false;
    this.id = this.route.snapshot.params.id;
    this.submitted = false;
    if (this.id) {
      this.pageDetails();
      this.subscribe();
      this.subscription.add(
        this.vendorGroupSandbox.vendorGroupDetail$.subscribe((data) => {
          if (data) {
            this.details = data;
            if (this.id) {
              this.vendorGroupAddForm.controls["GroupName"].setValue(data?.name);
              this.vendorGroupAddForm.controls["GroupCommission"].setValue(
                data?.commission
              );
              this.vendorGroupAddForm.controls["Status"].setValue(data?.isActive);
              this.vendorGroupAddForm.controls["GroupCategory"].setValue(data?.categoryId);
            }
          }
        })
      );
    }
    if (!this.id) {
      this.sellerForm();
    }
    this.routeSubscribe();
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event) {
    $event.target.documentElement.scrollTop > 300
      ? (this.showBackToTop = true)
      : (this.showBackToTop = false);
  }

  // get category list from filter
  subscribe() {
    this.subscription.add(
      this.vendorGroupSandbox.vendorGroupDetail$.subscribe((data) => {
        if (data) {
          this.selectedCategory = [];
          if (data && data.vendorGroupCategory) {
          }
          data.vendorGroupCategory.forEach((dataVal) => {
            this.selectedCategory.push(dataVal);
            this.settingSandbox.addCategory(dataVal);
          });
        }
      })
    );
  }

  categoryList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.count = 0;
    this.settingSandbox.categorylist(param);
  }

  addCategory(category) {
    this.selectedCategory.unshift(category);
    this.settingSandbox.addCategory(category);
    this.settingSandbox.getCatListResponse$.subscribe((data) => { });
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

  removecategory(category) {
    this.selectedCategory = this.selectedCategory.filter((cat) => {
      if (cat.categoryId === category.categoryId) {
        return false;
      } else {
        return true;
      }
    });
    this.settingSandbox.removeCategory(category);
  }

  pageDetails() {
    const params: any = {};
    params.id = this.id;
    this.vendorGroupSandbox.vendorGroupDetail(params);
  }

 

  // seller group form
  sellerForm() {
    this.vendorGroupAddForm = this.fb.group({
      GroupName: ["",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/),
          Validators.minLength(3),
          Validators.maxLength(32),
          this.noWhitespaceValidator
        ]),
      ],
      GroupCommission: ["", Validators.compose([Validators.required])],
      Status: [null, Validators.compose([Validators.required])],
      GroupCategory: ["", Validators.compose([Validators.required])],
    });
  }

  // commision validation
  commissionValidate(e) {
    if (e >= 100) {
      this.commissionError = "The commission must be below 100 percent";
    } else {
      this.commissionError = "";
    }
  }

  // save value to api
  onSubmit() {
    this.submitted = true;
    if (
      (!this.vendorGroupAddForm.valid ||
        Number(this.vendorGroupAddForm.controls["GroupCommission"].value) >= 100) && (this.selectedCategory.length == 0)
    ) {
      return;
    }
    const params: any = {};
    params.name = this.vendorGroupAddForm.value.GroupName;
    params.commission = this.vendorGroupAddForm.value.GroupCommission;
    const selectedCategories = []
    this.selectedCategory.forEach((data) => {
      if (data) {
        selectedCategories.push(data.categoryId);
      }
    });

    params.categoryIds = selectedCategories;
    params.status = this.vendorGroupAddForm.value.Status;
    if (this.id) {
      params.groupId = this.id;
      this.vendorGroupSandbox.vendorGroupUpdate(params);
      this.vendorGroupSandbox.vendorGroupUpdateLoaded$.subscribe(val => {
        if (val == true) {
          this.cancel();
        }
      });
    } else {
      this.vendorGroupSandbox.vendorGroupListAdd(params);
      this.vendorGroupSandbox.vendorGroupAddLoaded$.subscribe(val => {
        if (val == true) {
         this.cancel();
        }
      });
    }
    this.subscripe();
  }

  subscripe(): void {
    this.subscription.add(
      this.vendorGroupSandbox.vendorGroupAdd$.subscribe((data) => {
        if (data?.status === 1) {
          this.router.navigate(
            ["/seller/manage-seller/seller/seller-group"],
            { queryParams: this.queryDetails }
          );
        }
      })
    );
    this.subscription.add(
      this.vendorGroupSandbox.vendorGroupUpdate$.subscribe((data) => {
        if (data?.status === 1) {
          this.router.navigate(
            ["/seller/manage-seller/seller/seller-group"],
            { queryParams: this.queryDetails }
          );
        }
      })
    );
  }


  
  // go back to list
  cancel() {
    this.router.navigate(["/seller/manage-seller/seller/seller-group"], { queryParams: this.queryDetails});
  }

  get f() {
    return this.vendorGroupAddForm.controls;
  }

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  private routeSubscribe(){
    this.route.queryParams.subscribe(val=>{
      this.queryDetails = val
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
