// Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
// Third Party
import { Subscription } from "rxjs";
// SandBox
import { CustomerSandbox } from "../../../../../../../../core/admin/Customers/customers/customer.sandbox";
import { CustomersGroupSandbox } from "../../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox";
import { CustomersGroupService } from "../../../../../../../../core/admin/Customers/customers-group/customers-group.service";
// Constant
import { formFields } from "./add.constant";
import { getFormControlsFields, getTypes } from "src/theme/default/admin/shared/components/common-form/common-form.constant";
// Custom Validators
import { CustomValidators } from "../../../../../shared/components/interface/custom-password-validation";

@Component({
  selector: "app-customer-add",
  templateUrl: "add.component.html",
  styleUrls: ["add.component.scss"],
})
export class CustomerAddComponent implements OnInit, OnDestroy {
  // Customer Details
  public buyerId: any = "";

  // Reusable form
  dynamicObjControls: any = {};
  private formObjFormGroup: UntypedFormGroup;
  public submitted = false;
private paramsValue = {};
  // Common
  _Object = Object;
  buyerDetail: any;

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public fb: UntypedFormBuilder,
    public appSandbox: CustomerSandbox,
    public sandbox: CustomersGroupSandbox,
    public customerService: CustomersGroupService
  ) {
    this.buyerId = this.route.snapshot.paramMap.get("id") ? this.route.snapshot.paramMap.get("id") : "";
  }

  ngOnInit(): void {
    // Form
    this.buildForm();

    // Dropdown List Api
    this.SiteIdGroupList();
    this.customersGroupList();

    // Edit Customer Details
    if (this.buyerId) {
      this.editcustomerinfo();
    }
    this.routeSubscribe();
  }

  // Intialize form
  private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField, {
      validators: CustomValidators.passwordMatchValidator,
    });
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element],this.formObjFormGroup);
    });
  }

  // Get Customer Group List
  customersGroupList() {
    this.subscriptions.add(
      this.customerService
        .customersGroupList({ status: 1 })
        .subscribe((res) => {
          this.dynamicObjControls.BuyerGroup.customData.data = res?.data;
        })
    );
  }

  // Get SiteId GroupList
  SiteIdGroupList() {
    this.subscriptions.add(
      this.customerService.SiteIdList({ status: 1 }).subscribe((res) => {
        this.dynamicObjControls.SiteName.customData.data = res?.data;
        this.formObjFormGroup.controls["siteName"].setValue(2);
      })
    );
  }

  // Clear Password Validation
  clearPasswordValidation(): void {
    this.formObjFormGroup.controls["password"].clearValidators();
    this.formObjFormGroup.controls["password"].updateValueAndValidity();
    this.formObjFormGroup.controls["confirmPassword"].clearValidators();
    this.formObjFormGroup.controls["confirmPassword"].updateValueAndValidity();
  }

  // Submit Form
  onSubmit() {
    this.submitted = true;
    if (this.buyerId) {
      this.clearPasswordValidation();
    }

    if (this.formObjFormGroup.invalid) {
      this.scrollToError();
      return;
    }
    const params: any = {};
    params.customerGroupId = this.formObjFormGroup.value.buyerGroup;
    params.firstName = this.formObjFormGroup.value.buyerName;
    params.email = this.formObjFormGroup.value.email.toLowerCase();
    params.mobileNumber = this.formObjFormGroup.value.telephone;
    params.password = this.formObjFormGroup.value.password;
    params.confirmPassword = this.formObjFormGroup.value.confirmPassword;
    params.mailStatus = this.formObjFormGroup.value.mailStatus ? 1 : 0;
    params.siteId = this.formObjFormGroup.value.siteName;
    params.avatar = "";
    params.status = this.formObjFormGroup.value.status;
    if (this.buyerId) {
      params.id = this.buyerId;
      this.appSandbox.updateCustomers(params);
    } else {
      this.appSandbox.addCustomers(params);
    }
    this.subscripe();
  }

  subscripe() {
    this.appSandbox.addCustomer$.subscribe((data) => {
      if (data && data.status === 1) {
        this.router.navigate(["/customers/manage-customers/customer"]);
      }
    });

    this.appSandbox.updateCustomer$.subscribe((data) => {
      if (data && data.status === 1) {
        this.router.navigate(["/customers/manage-customers/customer"],{ queryParams: this.paramsValue });
      }
    });
  }

  cancel(){
    this.router.navigate(["/customers/manage-customers/customer"],{ queryParams: this.paramsValue });
  }


  // Buyer Details
  editcustomerinfo() {
    this.appSandbox.viewCustomerDetail({ id: this.buyerId });
    this.appSandbox.getDetailCustomer$.subscribe((data) => {
      if (data && Object.keys(data).length) {
        this.buyerDetail = data;
        this.formObjFormGroup.patchValue({
          siteName: 2,
          buyerGroup: data?.customerGroupId,
          buyerName: data?.firstName,
          email: data?.email,
          telephone: data?.mobileNumber,
          status: String(data?.isActive),
          mailStatus: data?.mailStatus == 1 ? true : false,
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  scrollToError(): void {
    const firstElementWithError = document.querySelector(
      ".ng-invalid[formControlName]"
    );

    this.scrollTo(firstElementWithError);
  }

    /*query param value for pagination*/
    private routeSubscribe(): void {
      this.route.queryParams.subscribe(params => {
        this.paramsValue = params
      });
    }
  
}
