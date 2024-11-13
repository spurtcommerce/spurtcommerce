// Angular 
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
// Third party 
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
// Sandbox
import { CustomerSandbox } from '../../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { SellerSandbox } from '../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox';
// Shared components 
import { DeleteConfirmationDialogComponent } from '../../../../../../../../../src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
// Constant
import { customTable, formFields } from './address.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';

@Component({
  selector: 'app-customer-address',
  templateUrl: 'address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class CustomerAddressComponent implements OnInit {
  // Pagination
  currentPage: number = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset: number = 0;

  // Buyer Details
  public customerId: number;
  public addressId: any;

  //Dynamic columns
  customTable: any = customTable;

  // Reusable form 
  dynamicObjControls: any = {};
  private formObjFormGroup: UntypedFormGroup;
  public submitted = false;

  // Common
  _Object = Object;

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // list
  addressList:any=[];
  constructor(
    private modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public sandbox: CustomerSandbox,
    public modal: NgbActiveModal,
    public toastr: ToastrService,
    public sellerSandbox: SellerSandbox,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    // Form
    this.buildForm();
    this.formValueChanges();
    // Get Address List
    this.getAddAddressList();
    //Get Country List
    this.getCountryList();
  }


  // Form Value Change
  formValueChanges() {
    this.formObjFormGroup.controls['CountryId'].valueChanges.subscribe(countryId => {
      if (countryId) {
        this.formObjFormGroup.controls['StateId'].reset();
        this.getStateList(countryId)
      }
    })
  }

  // State List Api
  getStateList(id: number): void {
    this.sellerSandbox.stateList({ countryId: id });
    this.subscriptions.add(this.sellerSandbox.stateList$.subscribe(list => {
      if (list) {
        formFields.StateId.customData.data = list;
        // this.dynamicObjControls = {
        //   ...this.dynamicObjControls,
        //   StateId: {
        //     ...this.dynamicObjControls?.StateId,
        //     type: list?.length > 0 ? "ngSelect" : "text",
        //     customData: {
        //       ...this.dynamicObjControls?.StateId?.customData,
        //       data: list,
        //     },
        //   },
        // };
        // if(list.length === 0){
        //   this.formObjFormGroup.get('StateId').disable();
        // } else{
        //   this.formObjFormGroup.get('StateId').enable();
        // }
      }
    }));
  }

  // Form Submit
  onSubmit() {
    this.submitted = true;
    if (this.formObjFormGroup.invalid) {
      return;
    }
    const params: any = {};
    params.firstName = this.formObjFormGroup.value.firstName;
    params.lastName = this.formObjFormGroup.value.lastName;
    params.phoneNumber = this.formObjFormGroup.value.phoneNumber;
    params.address1 = this.formObjFormGroup.value.address1;
    params.address2 = this.formObjFormGroup.value.address2;
    params.landmark = this.formObjFormGroup.value.landmark;
    params.city = this.formObjFormGroup.value.city;
    params.countryId = this.formObjFormGroup.value.CountryId;
    params.postcode = this.formObjFormGroup.value.pincode;
    params.addressType = this.formObjFormGroup.value.addresstype;
    params.company = this.formObjFormGroup.value.firstName;
    params.zoneId = this.formObjFormGroup.value.StateId;
    // this.subscriptions.add(this.sellerSandbox.stateList$.subscribe(res => {
    //   if (res?.some(val => (val.zoneId == this.formObjFormGroup.value.StateId))) {
    //     params.zoneId = this.formObjFormGroup.value.StateId;
    //   }
    //   else {
    //     params.state = this.formObjFormGroup.value.StateId;
    //   }
    // }));


    params.customerId = this.customerId;
    if (this.addressId) {
      params.addressId = this.addressId;
      this.sandbox.updateAddressAdd(params);
      this.sandbox.addAddressUpdate$.subscribe(val => {
        if (val?.status == 1) {
          this.formObjFormGroup.reset();
          this.resetAll();
          this.addressId = null;
          this.submitted = false;
        }
      })

    } else {
      this.sandbox.addAddressAdd(params);
      this.sandbox.addAddressAdd$.subscribe(val => {
        if (val?.status == 1) {
          this.formObjFormGroup.reset();
          this.resetAll();
          this.submitted = false;
        }
      })

    }
  }

  // Reset All
  resetAll() {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.getAddAddressList();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.editAddress(e);
        } else {
          this.delete(e)
        }
        break;
    }
  }

  // Delete Address
  delete(data) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteAddressAdd({ addressId: data.addressId });
        this.sandbox.deleteAddAddress$.subscribe(val=>{
          if(val?.status == 1){
            this.getAddAddressList();
          }
        })
        
      }
    });
  }

  // Get Country List
  getCountryList() {
    const param: any = {};
    param.status = 1;
    this.sellerSandbox.getCountriesList(param);
    this.subscriptions.add(this.sellerSandbox.getCountryList$.subscribe((val) => {
      if (val) {
        formFields.CountryId.customData.data = val;
      }
    }));
  }

  // Get Address List
  getAddAddressList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.customerId = this.customerId;
    this.sandbox.addAddressList(params);
    this.sandbox.addAddressList$.subscribe(val => {
      if (val) {
      val?.data.forEach(element=>{
          element.name=element.firstName+" "+element.lastName;
          element.stateName = element?.zone?.name
        })
        this.addressList = val?.data
       console.log(this.addressList)
      }
    })
    params.count = 'true';
    this.sandbox.addAddresspagination(params);
  }

  // Pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getAddAddressList();
  }

  // Set Edit Address
  editAddress(data) {
    this.formObjFormGroup.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNo,
      CountryId: data.countryId,
      address1: data.address1,
      address2: data.address2,
      landmark: data.landmark,
      city: data.city,
      StateId: data?.zoneId ? data?.zoneId : +data.state,
      pincode: data.postcode,
      name: data.company,
      addresstype: String(data.addressType)
    })
    this.addressId = data.addressId;
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
  }

  // Modal Close
  close() {
    this.subscriptions.unsubscribe();
    this.modal.close();
  }

}