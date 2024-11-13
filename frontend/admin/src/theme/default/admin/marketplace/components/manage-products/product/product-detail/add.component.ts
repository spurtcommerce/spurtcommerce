/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
 * Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
//angular imports
import { UntypedFormArray } from "@angular/forms";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";

import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormGroupName,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
// Third party imports 
import {
  NgbModal,
  NgbNav,
} from "@ng-bootstrap/ng-bootstrap";
// Rxjs 
import { Subscription } from "rxjs";

// Store Module
import { ImagemanagerpopupComponent } from "../../../../../shared/model-popup/ImageManagerPopup/imagemanagerpopup.component";
import { ProductSandbox } from "../../../../../../../../core/admin/catalog/product/product.sandbox";
import { CategoriesSandbox } from "../../../../../../../../core/admin/catalog/category/categories.sandbox";
import { ConfigService } from "../../../../../../../../core/admin/service/config.service";
import { DatePipe } from "@angular/common";
import * as _ from "lodash";
import { TaxSandbox } from "../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox";
import { DomSanitizer } from "@angular/platform-browser";
import { CkeConfiqService } from "../../../../../../../../../src/core/admin/shared/ckeconfiq/ckeconfiq.service";
import { ToastrService } from "ngx-toastr";
import { ProductService } from "../../../../../../../../core/admin/catalog/product/product.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { SellerProductSandox } from "../../../../../../../../../src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.sandbox";
import { RejectsModelComponent } from "../../rejects-model/rejects-model.component";

@Component({
  selector: "app-add-products",
  templateUrl: "add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class ProductAddComponent implements OnInit, OnDestroy {
  @ViewChild("filePath") filePath: ElementRef;

  public dropDownnArray: any = [];
  public user: UntypedFormGroup;
  public sizeFormArray: UntypedFormArray;
  @ViewChild(NgbNav)
  private tabset: NgbNav;
  public productName: UntypedFormControl;
  public productSlug: UntypedFormControl;
  public productDescription: UntypedFormControl;
  public upc: UntypedFormControl;
  public sku: UntypedFormControl;
  public hsn: UntypedFormControl;
  public location: UntypedFormControl;
  public minimumQuantity: UntypedFormControl;
  public quantity: UntypedFormControl;
  public subtractStock: UntypedFormControl;
  public dateAvailable: UntypedFormControl;
  public status: UntypedFormControl;
  public sortOrder: UntypedFormControl;
  public textOptionValue: UntypedFormControl;
  public textRequired: UntypedFormControl;
  public optionId: UntypedFormControl;
  public discountId: UntypedFormControl;
  public specialId: UntypedFormControl;
  public dataRequired: UntypedFormControl;
  public dateValue: UntypedFormControl;
  public checkboxRequired: UntypedFormControl;
  public optionValueId: UntypedFormControl;
  public pricePrefix: UntypedFormControl;
  public sizeBoxRequired: UntypedFormControl;
  public timeRequired: UntypedFormControl;
  public timeValue: UntypedFormControl;
  public dateTimeRequired: UntypedFormControl;
  public dateTimeValue: UntypedFormControl;
  public pincodeBasedDelivery: UntypedFormControl;
  public quotationAvailable: UntypedFormControl;
  public discountArray = [];
  public specialArray = [];
  public productDiscount: any = [];
  public discountForm: UntypedFormGroup;
  public specialForm: UntypedFormGroup;
  public priceForm: UntypedFormGroup;
  public discountItems: UntypedFormArray;
  public specialItems: UntypedFormArray;
  public date: Date;
  // editing values
  public editId: any;
  // pagination
  public catagory: any;
  // selected category list
  public selectedCategories: any = [];
  // upload
  public uploadImage: any = [];
  public TotalCategories: any = [];
  public filteredArray: any[];
  private param: any = {};
  private closeResult: any;
  private getDismissReason: any;
  public show: boolean;
  private onetimeEdit = false;
  private CategoryValue = false;
  public submittedValues = false;
  public isSaved: boolean = false

  public length: number;
  // image view
  public imageUrls: string;
  public defaultImageValue = 1;

  private addOneTime = false;

  private totalArray: any = [];
  public addOneTimeData = false;

  private searchKeyword: string;
  private subscriptions: Array<Subscription> = [];
  public optionListArray: any = [];
  public dropdownValueArray: any = [];
  public dropDownnValue: number;
  public isFormActive: string;
  public selectedOption: any;
  public optionValidatevalue: any;
  public searchText = "";
  public updateproductdetails = [];
  public productOptions: any = [];
  public optionIdArray: any = [];
  public NewOptionID: number;
  public defaultSelected = "--select option--";
  public name = "ng2-ckeditor";
  public ckeConfig: any;
  public mycontent: string;
  public log = "";
  public ratingImage = {};
  public ratingVal = 3.4;
  public config: any;
  @ViewChild("myckeditor") ckeditor: any;
  // option form
  public selected_optionId: UntypedFormControl;
  public required: UntypedFormControl;
  public optionValue: UntypedFormArray;
  public rightOption: FormGroupName;
  public options: FormGroupName;
  public currencySymbol: any = JSON.parse(
    sessionStorage.getItem("adminCurrency")
  );
  // tax variables
  public taxType = "1";
  public taxValue: any;
  public taxArray: any;
  public taxPercentage: any;
  public currentTaxId: any;
  public grossTotal: number;
  public totalPrice: number;
  public shippingValid = false;
  // tier price
  public tierFormArray: UntypedFormArray;
  public tierForm: UntypedFormGroup;

  public priceValid = false;
  public selectedVaraintId = [];
  public currency: any;
  public optionImageArray: any = [];
  public optionValueArray: any = [];
  public toggleArray: any = [];
  // filter params
  public filterParams: any = {};

  public productTypeSelectedSlug: any = "";

  currentDate: Date;

  public values = "0";
  videoUrl: any = "";
  embeded = false;
  uploaded = false;
  url: any = "";
  public abc: any;
  urlSafe: any = "";
  FinalUrl: string;
  videoName: any = "";
  dateAvail: any;
  uploadedVideoUrl: any = "";
  discountstart: any;
  discountend: any;
  specialstart: any;
  specialend: any;
  productItem: any = {};
  image: any;
  minPickerDate: any;
  submittedSpecialDate = false;
  public dateError: string;
  public isRequired = false;
  public discounterror = [];
  public active = 2;
  public VarientSkuArrayList: any = [];
  public brandlist: any = [];
  appSandbox: any;
  pathName: any;
  value: any = [];
  // cke5 
  editor = ClassicEditor;
  routeName: any;
  sellerId: any;
  approvalFlag: any;

  constructor(
    public fb: UntypedFormBuilder,
    public productSandbox: ProductSandbox,
    public categoriessandbox: CategoriesSandbox,
    private popup: NgbModal,
    private route: ActivatedRoute,
    private changeDetectRef: ChangeDetectorRef,
    public configService: ConfigService,
    private datePipe: DatePipe,
    public taxSandbox: TaxSandbox,
    public router: Router,
    public domSanitizer: DomSanitizer,
    public ckeconfiqservice: CkeConfiqService,
    public toastr: ToastrService,
    public productService: ProductService,
    public sandbox: SellerProductSandox
  ) {
    this.url = this.domSanitizer.bypassSecurityTrustUrl(this.videoUrl);
    this.config = this.ckeconfiqservice.getEditorConfig();
    this.mycontent = `<p>My html content</p>`;
    this.route.queryParams.subscribe((params) => {
      this.editId = params.id,
        this.routeName = params.name,
        this.sellerId = params.sellerId,
        this.approvalFlag = params.approvalFlag
    })
    this.route.params.subscribe((data) => {
      if (data) {
        this.editId = data["id"];
      }
    });
    const pageSize = this.route.snapshot.queryParamMap.get("pageSize");
    const offset = this.route.snapshot.queryParamMap.get("offset");
    const keyword = this.route.snapshot.queryParamMap.get("keyword");
    const filterSku = this.route.snapshot.queryParamMap.get("sku");
    const filterStatus = this.route.snapshot.queryParamMap.get("status");
    const price = this.route.snapshot.queryParamMap.get("price");
    const index = this.route.snapshot.queryParamMap.get("index");

    this.filterParams.pageSize = pageSize || "";
    this.filterParams.keyword = keyword || "";
    this.filterParams.sku = filterSku || "";
    this.filterParams.offset = offset || 0;
    this.filterParams.price = price || "";
    this.filterParams.index = index || 0;
    this.filterParams.status = filterStatus || "";
  }

  ngOnInit() {
    this.currency = JSON.parse(sessionStorage.getItem("adminCurrency"));
    this.currentDate = new Date();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };

    this.getCategoryList();
    this.productSandbox.ClearProductDetails();
    this.subscriptions.push(
      this.taxSandbox.taxList$.subscribe((data) => {
        if (data) {
          this.taxArray = data;
        }
      })
    );
    this.initProductForm();

    if (this.editId) {
      this.productSandbox.getProductDetail({ Id: this.editId });
      this.productSandbox.productDetails$.subscribe((data) => {
        this.productItem = data;
      });
      this.regDetailEvent();
    } else {
      this.initDropDownList();
    }
    this.imageUrls = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();

    this.getTaxlist();
    this.user.controls.tierForm.disable();
    this.skulist();
  }
  initDropDownList() {
    this.ProductLists();
    this.getSkuList();
  }

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  // reactive form
  initProductForm() {
    this.productName = new UntypedFormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.maxLength(255),
        this.noWhitespaceValidator,
      ])
    );
    this.productSlug = new UntypedFormControl(
      "",
      Validators.compose([Validators.maxLength(255)])
    );
    this.productDescription = new UntypedFormControl("");
    this.upc = new UntypedFormControl(
      "",
      Validators.compose([Validators.maxLength(12)])
    );
    this.hsn = new UntypedFormControl(
      "",
      Validators.compose([Validators.maxLength(8), Validators.minLength(2)])
    );
    this.sku = new UntypedFormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.maxLength(64),
        this.noWhitespaceValidator,
      ])
    );
    this.location = new UntypedFormControl("");
    this.quantity = new UntypedFormControl("", [Validators.required]);
    this.dateAvailable = new UntypedFormControl("");
    this.status = new UntypedFormControl(null, [Validators.required]);
    this.sortOrder = new UntypedFormControl("");
    this.optionId = new UntypedFormControl("");
    this.textOptionValue = new UntypedFormControl("");
    this.textRequired = new UntypedFormControl("");
    this.timeRequired = new UntypedFormControl("");
    this.timeValue = new UntypedFormControl("");
    this.dateTimeRequired = new UntypedFormControl("");
    this.dateTimeValue = new UntypedFormControl("");
    this.pincodeBasedDelivery = new UntypedFormControl("");
    (this.quotationAvailable = new UntypedFormControl("")),
      (this.checkboxRequired = new UntypedFormControl(""));
    this.sizeBoxRequired = new UntypedFormControl("");
    this.dataRequired = new UntypedFormControl("");
    this.dateValue = new UntypedFormControl("");
    this.discountId = new UntypedFormControl("");
    (this.specialId = new UntypedFormControl("")),
      (this.user = this.fb.group({
        productName: this.productName,
        productSlug: this.productSlug,
        productDescription: this.productDescription,
        upc: this.upc,
        sku: this.sku,
        hsn: this.hsn,
        location: this.location,
        quantity: this.quantity,
        dateAvailable: this.dateAvailable,
        status: this.status,
        sortOrder: this.sortOrder,
        textOptionValue: this.textOptionValue,
        textRequired: this.textRequired,
        timeRequired: this.timeRequired,
        timeValue: this.timeValue,
        dateTimeRequired: this.dateTimeRequired,
        dateTimeValue: this.dateTimeValue,
        optionId: this.optionId,
        discountId: this.discountId,
        specialId: this.specialId,
        dataRequired: this.dataRequired,
        dateValue: this.dateValue,
        pincodeBasedDelivery: this.pincodeBasedDelivery,
        quotationAvailable: this.quotationAvailable,

        tierForm: this.fb.group({
          hasTire: ["1"],
          tierFormArray: this.fb.array([]),
        }),
        options: this.fb.group({
          selected_optionId: this.selected_optionId,
          rightOption: this.fb.array([]),
        }),

        sizeForm: this.fb.group({
          sizeBoxRequired: this.sizeBoxRequired,
          sizeFormArray: this.fb.array([]),
        }),
      }));

    this.priceForm = this.fb.group({
      productPrice: ["", Validators.required],
      packingPrice: [0],
      shippingPrice: [0],
      others: [0],
    });
    this.discountForm = this.fb.group({
      discountItems: this.fb.array([]),
    });
    this.specialForm = this.fb.group({
      specialItems: this.fb.array([]),
    });

    this.optionValue = this.user.controls["options"].get(
      "rightOption"
    ) as UntypedFormArray;
  }
  createDiscountItem(): UntypedFormGroup {
    return this.fb.group({
      discountSku: [this.sku.value, Validators.required],
      disCustomerGroup: "",
      discountPriority: "",
      discountPrice: "",
      discountDateStart: ["", Validators.required],
      discountDateEnd: ["", Validators.required],
      discountvarprice: [""],
    });
  }
  createSpecialItem(): UntypedFormGroup {
    return this.fb.group({
      specialSku: [this.sku.value, Validators.required],
      specialCustomerGroup: "",
      specialPriority: ["", Validators.required],
      specialPrice: ["", Validators.required],
      specialDateStart: ["", Validators.required],
      specialDateEnd: ["", Validators.required],
      specialvarprice: [""],
    });
  }
  addDiscountForm(): void {
    if (this.editId) {
      this.discountItems = this.discountForm.get("discountItems") as UntypedFormArray;
      this.discountItems.push(this.createDiscountItem());
    }
  }

  // create control for FormArray of discountFormArray
  get discountsArray() {
    return <UntypedFormArray>this.discountForm.controls["discountItems"];
  }
  // create control for FormArray of specialFormArray
  get specialFormArray() {
    return <UntypedFormArray>this.specialForm.controls["specialItems"];
  }

  // create control for FormArray of sizeFormArray
  get sizeArray() {
    return <UntypedFormArray>this.user.controls["sizeForm"].get("sizeFormArray");
  }

  // create control for FormArray of rappleFormArray
  get tierArray() {
    return <UntypedFormArray>this.user.controls["tierForm"].get("tierFormArray");
  }

  removeDiscountForm(index) {
    this.discountItems.removeAt(index);
  }

  addSpecialForm(): void {
    if (this.editId) {
      this.specialItems = this.specialForm.get("specialItems") as UntypedFormArray;
      this.specialItems.push(this.createSpecialItem());
    }
  }
  removeSpecialForm(index) {
    this.specialItems.removeAt(index);
  }
  specialPriceDate(i) {
    if (this.specialForm.value.specialItems[i].specialDateStart === "") {
      this.submittedSpecialDate = true;
    } else {
      this.submittedSpecialDate = false;
    }
  }

  addTierForm() {
    if (this.editId) {
      this.user.controls.tierForm.enable();
      this.tierArray.push(this.addTierField());
    }
  }

  public addTierField() {
    return this.fb.group({
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      skuName: [this.sku.value, Validators.required],
    });
  }

  deleteTierForm(index) {
    this.tierArray.removeAt(index);
    if (this.tierArray.length === 0) {
      this.user.controls.tierForm.disable();
    }
  }

  // productoption data Formvalue
  public setProductOptionFormData() { }
  getSkuList() {
    this.productSandbox.skuArrayList$.subscribe((data) => {
      if (data && data.length > 0) {
        this.VarientSkuArrayList = data;

      }
    });
  }
  subscribe() {
    this.productSandbox.productAdd$.subscribe((data) => {
      if (data && data.status === 1) {
        this.router.navigate(["/catalog/manage-products/product"], {
          queryParams: this.filterParams,
        });
      }
    });

    this.productSandbox.productUpdate$.subscribe((data) => {
      if (data && data["status"] === 1) {
        this.router.navigate(["/catalog/manage-products/product"], {
          queryParams: this.filterParams,
        });
      }
    });
  }

  /**
   * Handles  'onSubmit' event. Calls productSandbox doProductUpdate function if (this.editId) else
   * calls productSandbox doProductAdd function.
   * @param user entire form value
   */
  onSubmit(user) {
    this.shippingValid = false;
    this.isSaved = true;

    // Tier Form Array Validation
    if (this.user.controls.tierForm.value.tierFormArray.length > 0) {
      let c = this.user.controls.tierForm.value.tierFormArray.some(
        (data, i) => {
          return (
            data?.quantity == "" || (data?.skuName == null || '') || data?.price == ""
          );
        }
      );
      if (c == false) {
      } else {
        window.scrollTo(0, document.body.scrollHeight);
        this.active = 16;
        return;
      }
    }

    if (this.editId) {
      if (this.user.controls.tierForm.value.tierFormArray.length > 0) {
        if (!this.user.controls.tierForm.valid) {
          window.scrollTo(0, document.body.scrollHeight);
          this.active = 16;
          return;
        }
      }
    }

    this.setProductOptionFormData();
    this.submittedValues = true;
    this.priceValid = true;
    this.addSelecctedCategories();
    if (!this.sku.valid) {
      return;
    }
    if (!this.productName.valid) {
      return;
    }
    if (this.TotalCategories.length == 0) {
      window.scrollTo(0, document.body.scrollHeight);
      this.toastr.error("please select category");
      this.active = 2;
      return;
    }
    if (
      (!this.user.valid && this.user.value.status === "") ||
      this.user.value.status === null ||
      this.user.value.quantity === ""
    ) {
      this.validateAllFormFields(this.user);
      this.active = 6;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (this.uploadImage.length === 0) {
      this.active = 10;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    if (!this.hsn.valid) {
      this.active = 6;
      return;
    }


    if (!this.priceForm.valid ||
      this.priceForm.value === "" ||
      this.priceForm.value.productPrice == "0"
    ) {
      this.validateAllFormFields(this.priceForm);

      this.active = 8;
      window.scrollTo(0, document.body.scrollHeight);
      return;
    }

    this.productSandbox.skuArrayList$.subscribe(res => {
      if (res) {
        if (this.discountForm.value.discountItems.length > 0) {
          let discountformvalid = this.discountForm.value.discountItems.some(
            (data, i) => {
              return (
                data?.discountDateEnd == "" ||
                data?.discountSku == null ||
                data?.discountPrice == "" ||
                data?.discountPriority == "" ||
                data?.discountDateStart == "" ||
                data?.discountPrice >= this.totalPrice
              );
            }
          );
          if (discountformvalid) {
            this.active = 8;
            window.scrollTo(0, document.body.scrollHeight);
            return;
          }
        }

        if (this.specialForm.value.specialItems.length > 0) {
          let specialformvalid = this.specialForm.value.specialItems.some(
            (data, i) => {
              return (
                data?.specialDateEnd == "" ||
                data?.specialSku == null ||
                data?.specialPrice == "" ||
                data?.specialPriority == "" ||
                data?.specialDateStart == "" ||
                data?.specialPrice >= this.totalPrice
              );
            }
          );
          if (specialformvalid) {
            this.active = 8;
            window.scrollTo(0, document.body.scrollHeight);
            return;
          }
        }

      }
    })

    if (this.values === "0" && this.FinalUrl !== "" && this.FinalUrl !== null) {
      this.param.productVideo = {
        name: "",
        path: this.FinalUrl,
        type: 2,
      };
    }

    if (this.values === "1" && this.videoName !== "") {
      this.param.productVideo = {
        name: this.videoName,
        path: "video/",
        type: 1,
      };
    }

    const param: any = {};
    const categoryIds = this.TotalCategories.map((val) => {
      return val.categoryId;
    });
    this.onetimeEdit = true;
    this.param.productName = user.productName.trim();
    this.param.productSlug = user.productSlug;
    this.param.productDescription = user.productDescription;
    this.param.upc = user.upc;
    this.param.hsn = user.hsn;
    this.param.sku = user.sku;
    this.param.image = this.uploadImage;
    this.param.categoryId = categoryIds;
    this.param.location = user.location;
    this.param.quantity = user.quantity;
    const dateAvail = user.dateAvailable;
    this.param.dateAvailable = dateAvail
      ? dateAvail.year +
      "-" +
      ("0" + dateAvail.month).slice(-2) +
      "-" +
      ("0" + dateAvail.day).slice(-2)
      : this.minPickerDate.year +
      "-" +
      this.minPickerDate.month +
      "-" +
      this.minPickerDate.day;
    this.param.status = user.status;
    this.param.sortOrder = Number(user.sortOrder);
    this.param.price = Number(this.priceForm.controls["productPrice"].value);
    this.param.packingCost = +this.priceForm.controls["packingPrice"].value;
    this.param.shippingCost = +this.priceForm.controls["shippingPrice"].value;
    this.param.tax = this.taxType === "2" ? this.currentTaxId : this.taxValue;
    this.param.taxType = Number(this.taxType);
    this.param.others = +this.priceForm.controls["others"].value;

    if (
      this.user.value.pincodeBasedDelivery === true ||
      this.user.value.pincodeBasedDelivery === 1
    ) {
      this.param.pincodeBasedDelivery = 1;
    } else {
      this.param.pincodeBasedDelivery = 0;
    }
    if (
      this.user.value.quotationAvailable === true ||
      this.user.value.quotationAvailable === 1
    ) {
      this.param.quotationAvailable = 1;
    } else {
      this.param.quotationAvailable = 0;
    }

    if (this.specialForm.valid) {
      let array = [];
      array = this.specialForm.value.specialItems.map((data) => {
        const specialstarts = data.specialDateStart;
        const specialstart = specialstarts
          ? specialstarts.year +
          "-" +
          ("0" + specialstarts.month).slice(-2) +
          "-" +
          ("0" + specialstarts.day).slice(-2)
          : null;
        const specialenddates = data.specialDateEnd;
        const specialenddate = specialenddates
          ? specialenddates.year +
          "-" +
          ("0" + specialenddates.month).slice(-2) +
          "-" +
          ("0" + specialenddates.day).slice(-2)
          : null;
        return {
          specialCustomerGroup: data.specialCustomerGroup,
          skuName: data.specialSku,
          specialDateEnd: specialenddate,
          specialDateStart: specialstart,
          specialPrice: data.specialPrice,
          specialPriority: data.specialPriority,
        };
      });
      this.param.productSpecial = array;
    }


    if (this.discountForm.valid) {
      let array = [];


      array = this.discountForm.value.discountItems.map((data) => {

        const startdates = data.discountDateStart;
        const startdate = startdates
          ? startdates.year +
          "-" +
          ("0" + startdates.month).slice(-2) +
          "-" +
          ("0" + startdates.day).slice(-2)
          : null;
        const enddates = data.discountDateEnd;
        const enddate = enddates
          ? enddates.year +
          "-" +
          ("0" + enddates.month).slice(-2) +
          "-" +
          ("0" + enddates.day).slice(-2)
          : null;
        return {
          disCustomerGroup: data.disCustomerGroup,
          skuName: data.discountSku,
          discountDateEnd: enddate,
          discountDateStart: startdate,
          discountPrice: data.discountPrice,
          discountPriority: data.discountPriority,
        };
      });
      this.param.productDiscount = array;
    }




    if (this.user.controls.tierForm.disabled) {
      this.param.tierPrices = [];
      this.param.hasTirePrice = 0;
    } else {
      this.param.hasTirePrice = user.tierForm.hasTire;
      this.param.tierPrices = user.tierForm.tierFormArray;
    }

    // probality options

    if (this.editId) {
      this.param.productVarientOption = [];
      this.param.productVarient = [];
      this.param.productId = this.editId;
      this.productSandbox.doProductUpdate(this.param);
    } else {
      this.param.productVarientOption = [];
      this.param.productVarient = [];
      this.productSandbox.doProductAdd(this.param);
    }
    this.subscribe();
  }

  /**
   * unsubscribe the subscriptions
   *
   * Handles  'regDetailEvent' event. Calls productSandbox productDetails$ to
   * subscribe the response data.,then calls editProductForm function with the response data.
   *
   */
  regDetailEvent() {
    this.CategoryValue = true;
    this.subscriptions.push(
      this.productSandbox.productDetails$.subscribe((data) => {
        if (data && Object.keys(data).length) {
          this.editProductForm(data);
          this.initDropDownList();
        }
      })
    );
  }

  getCategoryList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = this.catagory;
    param.sortOrder = 0;
    param.status = 1;
    this.categoriessandbox.categoryList(param);
    this.categoriessandbox.getCategoriesList$.subscribe((data) => {
      this.value = data;
    });
  }
  ProductLists() {
    const params: any = {};
    params.offset = 0;
    params.limit = 0;
    params.keyword = this.searchKeyword;
    params.sku = "";
    params.status = "";
    params.price = 0;
    this.productSandbox.getProductList(params);


  }

  /**
     * Handles  'searchCategory' event. Calls sandbox getCategoryList function.

     * @param catagory searchCategory input value
     */
  searchCategory(event) {
    this.catagory = event.target.value;
    this.getCategoryList();
  }

  /**
   * Handles  'selectCategory' event. Calls categoriessandbox Productremove  if (this.editId)function.
   * else Calls categoriessandbox Productremove.And push  the datas to categories list using push() method.
   * @param categoryId searchCategory input value
   * @param name searchCategory input value
  //  */

  // selectCategory(data, i) {
  //   if (this.editId) {
  //     const param: any = {};
  //     param.categoryId = data.categoryId;

  //     param.categoryName = data.name;
  //     param.levels = data.levels;

  //     this.addOneTime = true;
  //     this.selectedCategories.push(param);
  //     this.categoriessandbox.productRemove(i);
  //   } else {
  //     this.selectedCategories.push(data);
  //     this.categoriessandbox.productRemove(i);
  //     this.show = false;
  //   }
  //   this.filteredArray = this.selectedCategories;
  // }

  selectCategory(data, i) {
    if (this.editId) {
      const param: any = {};
      param.categoryId = data.categoryId;
      param.categoryName = data.name;
      param.levels = data.levels;

      this.addOneTime = true;
      this.selectedCategories.push(param);
      this.categoriessandbox.productRemove(i);
    } else {
      this.selectedCategories.push(data);
      this.categoriessandbox.productRemove(i);
      this.show = false;
    }
    this.filteredArray = this.selectedCategories;
    this.value.forEach((val, index) => {
      if (val.categoryId === data.categoryId) {
        this.value.splice(index, 1);
      }
    });
    this.value = [...this.value]
  }

  /**
   * Handles  'removeCategory' event. Calls categoriessandbox Productadd  if (this.editId)function.
   * else Calls categoriessandbox Productadd.And splice the datas with particular index as(i)
   * @param categoryId searchCategory input value.
   * @param name searchCategory input value.
   */

  removeCategory(data, i) {
    if (this.editId) {
      const param: any = {};
      param.categoryId = data.categoryId;
      param.levels = data.levels;
      this.addOneTime = true;
      this.categoriessandbox.productAdd(param);
      this.selectedCategories.splice(i, 1);
    } else {
      this.categoriessandbox.productAdd(data);
      this.selectedCategories.splice(i, 1);
      this.value.push(data);
      this.value = [...this.value];
    }
    this.filteredArray = this.selectedCategories;
  }

  /** calls productSandbox productRemoveList,
   * after pushing the product datas into selectedProducts(array)
   * @param data from selectProduct
   * @param i from selectProduct
   * **/

  /**
   * call productSandbox productAddList,after splice product datas in the list.
   * @params data from removeProduct
   * @param i from productAddList
   * */

  searchProduct(event) {
    this.ProductLists();
  }

  addSelecctedCategories() {
    if (this.show === true) {
      this.selectedCategories = this.filteredArray;
    }
    this.TotalCategories = this.selectedCategories;
  }

  /**
   * Handles  'searchSelectedCategory' event. And show the searched result  in the form
   *
   * @param filter searchbox  value
   */
  searchSelectedCategory(filter: String) {
    this.filteredArray = this.selectedCategories.filter((item) => {
      if (
        item.name.toString().toLowerCase().indexOf(filter.toLowerCase()) !== -1
      ) {
        if (this.filteredArray != null) {
          this.show = true;
        }
        return true;
      }
      return false;
    });
  }

  editProductForm(productDetail) {
    this.productTypeSelectedSlug = productDetail.productType;
    this.getSkuList();
   
    if (productDetail && productDetail.productVideo && productDetail.productVideo.type === 1) {
      this.videoName = productDetail.productVideo.name;
      this.values = '1';
      const baseUrl = this.configService.getBaseUrl();
      this.uploadedVideoUrl = baseUrl + '/media/video-preview-s3?name=' + this.videoName + '&path=video/';
    }

    if (productDetail && productDetail.productVideo && productDetail.productVideo.type === 2) {
      if (productDetail.productVideo.path !== null) {
        this.FinalUrl = productDetail.productVideo.path;
        const data = this.FinalUrl.split('embed/');
        this.videoUrl = data[0] + 'watch?v=' + data[1];
        this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.FinalUrl);
        this.values = '0';
      }
    }

    if (
      productDetail.productVarient &&
      productDetail.productVarient.length > 0
    ) {
      productDetail.productVarient.forEach((data) => {
        this.selectedVaraintId.push(data.varientsId);
      });
    }
    this.selectedCategories = [];
    if (productDetail.Category && productDetail.Category.length > 0) {
      this.categoriessandbox.filterCategory(productDetail.Category);
    }
    productDetail.Category.forEach((each) => {
      if (each) {
        this.selectedCategories.push(each);
      }
    });
    if (this.editId) {
      this.quantity = new UntypedFormControl("", [Validators.required]);
      this.dateAvailable = new UntypedFormControl("", [Validators.required]);
      this.status = new UntypedFormControl(null, [Validators.required]);
    }

    this.changeDetectRef.detectChanges();
    this.updateproductdetails.push(productDetail);
    this.uploadImage = productDetail.productImage;

    this.productName.setValue(productDetail.name);
    this.sku.setValue(productDetail.sku);
    this.upc.setValue(productDetail.upc);
    this.hsn.setValue(productDetail.hsn);

    this.priceForm.controls["productPrice"].setValue(productDetail.productCost);
    this.priceForm.controls["packingPrice"].setValue(productDetail.packingCost);
    this.priceForm.controls["shippingPrice"].setValue(
      productDetail.shippingCost
    );
    this.priceForm.controls["others"].setValue(productDetail.others);
    this.productSlug.setValue(productDetail.productSlug);
    this.taxType = String(productDetail.taxType);

    if (productDetail.taxType === 2) {
      this.currentTaxId = productDetail.tax;
      this.getTaxPercentage(this.currentTaxId);
    } else {
      this.taxValue = productDetail.tax !== 0 ? productDetail.tax : null;
    }
    this.getGrossTotal();
    this.getTotalPrice();
    this.location.setValue(productDetail.location);
    this.user.controls["quantity"].setValue(productDetail.quantity);
    this.user.controls["status"].setValue(productDetail.isActive);
    if (productDetail.dateAvailable) {
      const dateVals = this.datePipe
        .transform(productDetail.dateAvailable, "dd-MM-yyyy")
        .split("-");
      this.dateAvail = {
        day: +dateVals[0],
        month: +dateVals[1],
        year: +dateVals[2],
      };
    }
    this.user.controls["dateAvailable"].setValue(this.dateAvail);
    this.sortOrder.setValue(productDetail.sortOrder);
    this.productDescription.setValue(
      this.htmlTagConversion(productDetail.description)
    );
    if (productDetail.pincodeBasedDelivery === 1) {
      this.user.controls["pincodeBasedDelivery"].setValue(true);
    } else {
      this.user.controls["pincodeBasedDelivery"].setValue(false);
    }

    if (productDetail.quotationAvailable === 1) {
      this.user.controls["quotationAvailable"].setValue(true);
    } else {
      this.user.controls["quotationAvailable"].setValue(false);
    }

    if (
      productDetail.productDiscount.length > 0 &&
      productDetail.productDiscount[0].productDiscountId
    ) {
      this.discountItems = <UntypedFormArray>(
        this.discountForm.controls["discountItems"]
      );

      if (productDetail.productDiscount.length > 0) {
        this.discountForm.enable();
        this.discountsArray.removeAt(0);
        productDetail.productDiscount.forEach((data) => {
          let varprice: any;
          if (data.dateStart) {
            const discountstarts = this.datePipe
              .transform(data.dateStart, "dd-MM-yyyy")
              .split("-");
            this.discountstart = {
              day: +discountstarts[0],
              month: +discountstarts[1],
              year: +discountstarts[2],
            };
          }

          if (data.dateEnd) {
            const discountends = this.datePipe
              .transform(data.dateEnd, "dd-MM-yyyy")
              .split("-");
            this.discountend = {
              day: +discountends[0],
              month: +discountends[1],
              year: +discountends[2],
            };
          }

          this.VarientSkuArrayList.forEach((val) => {
            if (val.sku == data.skuName) {
              varprice = Number(val.price);
            }
          });

          const tempPrice = parseInt(data.price, 10).toFixed();

          this.discountItems.push(
            this.fb.group({
              discountId: data.productDiscountId,
              disCustomerGroup: 1,
              discountQuantity: data.quantity,
              discountPriority: data.priority,
              discountPrice: tempPrice,
              discountDateStart: this.discountstart,
              discountDateEnd: this.discountend,
              discountSku: data.skuName,
              discountvarprice: this.totalPrice,
            })
          );
        });
      }
    }

    if (
      productDetail.productSpecialPrice.length > 0 &&
      productDetail.productSpecialPrice[0].productSpecialId
    ) {
      this.specialItems = <UntypedFormArray>this.specialForm.controls["specialItems"];
      if (productDetail.productSpecialPrice.length > 0) {
        this.specialForm.enable();
        this.specialFormArray.removeAt(0);
        productDetail.productSpecialPrice.forEach((value) => {
          if (value.dateStart) {
            const specialstarts = this.datePipe
              .transform(value.dateStart, "dd-MM-yyyy")
              .split("-");
            this.specialstart = {
              day: +specialstarts[0],
              month: +specialstarts[1],
              year: +specialstarts[2],
            };
          }

          if (value.dateEnd) {
            const specialends = this.datePipe
              .transform(value.dateEnd, "dd-MM-yyyy")
              .split("-");
            this.specialend = {
              day: +specialends[0],
              month: +specialends[1],
              year: +specialends[2],
            };
          }
          let varprice: any;
          this.VarientSkuArrayList.forEach((val) => {
            if (val.sku == value.skuName) {
              varprice = Number(val.price);
            }
          });

          const tempPrices = parseInt(value.price, 10).toFixed();

          this.specialItems.push(
            this.fb.group({
              specialId: value.productSpecialId,
              specialCustomerGroup: 1,
              specialPriority: value.priority,
              specialPrice: tempPrices,
              specialDateStart: this.specialstart,
              specialDateEnd: this.specialend,
              specialSku: value.skuName,
              specialvarprice: this.totalPrice,
            })
          );
        });
      }
    }

    // set tier value into tier array form
    if (
      productDetail.productTirePrices.length > 0 &&
      productDetail.productTirePrices[0].id
    ) {
      this.user.controls.tierForm.enable();

      const tierFormControl = <UntypedFormArray>(
        this.user.controls["tierForm"].get("tierFormArray")
      );
      this.tierArray.removeAt(0);
      productDetail.productTirePrices.forEach((value) => {
        tierFormControl.push(
          this.fb.group({
            quantity: value.quantity,
            price: value.price,
            skuName: value.skuName,
          })
        );
      });
    }

    if (productDetail.hasTirePrice === 1) {
      this.user.controls.tierForm["controls"]["hasTire"].setValue("1");
    } else {
      this.user.controls.tierForm["controls"]["hasTire"].setValue("0");
    }
  }

  // getting values from media popup
  uploadProductImages() {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: "static",
      keyboard: false,
      size: "lg",
    });
    modalRef.componentInstance.maxLength = this.uploadImage.length
    // Make the first image as default  selected.
    modalRef.result.then(
      (result) => {
        if (result && result.length > 0) {
          const lengthOfUploadImage: number = this.uploadImage.length;
          result.forEach((data) => {
            this.image = data.image;
            if (data) {
              this.uploadImage.push(data);
            }
          });

          this.length = 0;
          // make non default value
          if (this.uploadImage.length > 1 && !this.editId) {
            for (let i = 0; i < this.uploadImage.length; i++) {
              if (i === 0) {
                this.uploadImage[i].defaultImage = 1;
              } else {
                this.uploadImage[i].defaultImage = 0;
              }
            }
          } else if (!this.editId) {
            this.uploadImage[0].defaultImage = 1;
          } else if (this.editId) {
            // make  default value
            if (this.uploadImage[0]) {
              this.uploadImage[0].defaultImage = 1;
            } else {
              for (
                let i = lengthOfUploadImage;
                i < this.uploadImage.length;
                i++
              ) {
                this.uploadImage[i].defaultImage = 0;
              }
            }
          }
        }
        this.changeDetectRef.detectChanges();
        this.closeResult = `Closed with: ${"result"}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // delete image
  deleteImage(i, length) {
    this.uploadImage.splice(i, 1);
    if (length >= 1 && i >= 1) {
      this.length = i - 1;
    }
    if (length == 1 && i == 0) {
      this.length = 0;
    }
    if (length < 0 && i == 0) {
      this.length = 0;
    }
    if (length > 0 && i == 0) {
      this.length = length - 1;
    }
    if (length == 0 && i == 0) {
      this.length = 0;
    }
    if (length == undefined) {
      this.length = i - 1;
    }
    if (this.length == -1 && length == undefined) {
      this.length = 0;
    }
    this.checkBox("", this.length);
  }

  // validation for the formGroup
  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // ck editor
  checkBox(event, ii) {
    const index: number = ii;
    for (let i = 0; i < this.uploadImage.length; i++) {
      if (index === i) {
        this.length = index;
        this.uploadImage[i].defaultImage = 1;
      } else {
        this.length = index;
        this.uploadImage[i].defaultImage = 0;
      }
    }
  }

  getProductRatingList() {
    const param: any = {};
    param.productId = this.editId;
    param.limit = 0;
    param.offset = 5;
    this.productSandbox.getProductRatingList(param);
  }

  updateRatingStatus(event, rating) {
    const FeatureValue = event.target.checked;
    const param: any = {};
    param.ratingId = rating.ratingId;
    if (FeatureValue === true) {
      param.status = 1;
      this.productSandbox.doRatingStatus(param);
    } else {
      param.status = 0;
      this.productSandbox.doRatingStatus(param);
    }
  }

  ratingImageLoading(id) {
    this.ratingImage[id] = true;
  }

  getPrice(evt) {
    this.getGrossTotal();
    this.getTotalPrice();
    this.getTaxValueByPercentage(this.taxPercentage);
  }

  getGrossTotal() {
    this.grossTotal =
      +this.priceForm.controls["productPrice"].value +
      +this.priceForm.controls["packingPrice"].value +
      +this.priceForm.controls["shippingPrice"].value +
      +this.priceForm.controls["others"].value;
  }


  getTotalPrice() {
    this.totalPrice =
      +this.priceForm.controls["productPrice"].value +
      +this.priceForm.controls["packingPrice"].value +
      +this.priceForm.controls["shippingPrice"].value +
      +this.priceForm.controls["others"].value +
      this.taxValue;
  }

  getTaxValue(event) {
    this.taxValue = 0;
    this.taxPercentage = null;
    this.currentTaxId = undefined;
    this.taxType = event.target.value;
    this.getGrossTotal();
    this.getTaxValueByPercentage(this.taxPercentage);
  }

  getTax(val) {
    this.taxValue = Number(val);
    this.getTotalPrice();
  }

  getTaxlist() {
    const params: any = {};
    params.status = 1;
    this.taxSandbox.getTaxList(params);
  }

  getTaxPercentage(val) {
    this.currentTaxId = Number(val);
    if (this.taxArray && this.taxArray["length"] > 0) {
      this.taxArray.forEach((data) => {
        if (data.taxId === this.currentTaxId) {
          this.taxPercentage = data.value;
          this.getTaxValueByPercentage(this.taxPercentage);
        }
      });
    }
  }

  getTaxValueByPercentage(data) {
    this.taxValue = data
      ? (Number(this.priceForm.controls["productPrice"].value) / 100) * data
      : 0;
    this.getTotalPrice();
  }

  uploadOptionImage(event, options, i) {
    const modalRef = this.popup.open(ImagemanagerpopupComponent, {
      backdrop: "static",
      keyboard: false,
      size: "lg",
    });
    // Make the first image as default  selected.
    modalRef.result.then(
      (result) => {
        if (result) {
          this.addImageToOptions(result, options, i);
        }
        this.changeDetectRef.detectChanges();
        this.closeResult = `Closed with: ${"result"}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  // image upload and base64 convert section
  uploadVideo(event) {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }
  uploadVideoFinal(e) {
    if (e.target.files[0]?.size > 50000000) {
      this.toastr.error("please upload a video less than 50MB");
    } else {
      this.videoName = e.target.files[0].name;
      const params: any = {};
      params.file = this.videoName;
      params.path = "";
      const formData = new FormData();
      formData.append("file", e.target.files[0], e.target.files[0].name);
      this.productSandbox.videoUpload(formData);
      this.embeded = false;
      this.uploaded = true;
      this.subscriptions.push(
        this.productSandbox.videoUpload$.subscribe((data) => {
          if (data && data.status === 1) {
            this.pathName = data.data.path;
            this.videoName = data.data.image;
            this.uploadedVideoUrl = this.pathName + "/" + this.videoName;

          }
        })
      );
    }
  }

  addImageToOptions(image, option, index) {
    const params: any = {};
    params.image = image[0];
    const array = [];
    this.optionImageArray[index] = image;
  }

  removeOptionImage(options, i) {
    this.optionImageArray = this.optionImageArray.map((data, j) => {
      if (i === j) {
        return [];
      } else {
        return data;
      }
    });
  }

  checkLength(count) {
    const length = +count;
    const diff = 5 - length;

    if (diff === 0) {
      return false;
    } else {
      for (let i = 0; i < diff; i++) { }
      return true;
    }
  }

  embed(url) {
    if (url !== "") {
      var dat = url
      var urlsplit = dat.split(/^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/);
      this.FinalUrl = "https://www.youtube.com/embed/" + urlsplit[3];

      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.FinalUrl
      );
      this.embeded = true;
      this.uploaded = false;
    }
  }

  videoremove() {
    this.videoUrl = "";
    this.urlSafe = "";
    this.values = "0";
    this.embeded = false;
    this.FinalUrl = "";
    this.videoName = "";
  }
  videofileremove() {
    this.videoName = "";
    this.uploadedVideoUrl = "";
    this.uploaded = false;
    this.values = "1";
  }

  skulist() { }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onskuchange(event, j) {

    this.discountForm.value.discountItems[j].discountvarprice = event.price;


    let x = (<UntypedFormArray>this.discountForm.controls["discountItems"]).at(j);

    if (this.discountForm.value.discountItems[j].discountvarprice != "") {
      this.discountForm.patchValue({
        discountvarprice: this.totalPrice,
      });

      x.patchValue({
        discountvarprice: this.totalPrice,
      });
    }
  }

  specialskuchange(event, j) {
    this.specialForm.value.specialItems[j].specialvarprice = event.price;

    let x = (<UntypedFormArray>this.specialForm.controls["specialItems"]).at(j);

    if (this.specialForm.value.specialItems[j].specialvarprice != "") {
      this.specialForm.patchValue({
        specialvarprice: this.totalPrice,
      });

      x.patchValue({
        specialvarprice: this.totalPrice,
      });
    }
  }

  // Approve Product
  approveProduct() {
    const param = {
      productIds: this.editId,
      approvalFlag: '1',
    };
    this.sandbox.approveProduct(param)
    this.subscriptions.push(this.sandbox.approveProduct$.subscribe(val => {
      if (val?.status == 1) {
        this.cancel();
      }
    }));
  }

  // Reject Product modal popup
  rejectComment() {
    const modalRef2 = this.popup.open(RejectsModelComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', centered: false, animation: false,
    });
    // this.productItem = {...this.productItem, vendorName: this.productItem.vendor.vendorName, companyName:this.productItem.vendor.companyName, companyLogoPath: this.productItem.vendor.companyLogoPath, companyLogo: this.productItem.vendor.companyLogo}
    modalRef2.componentInstance.fullData = this.productItem;
    modalRef2.componentInstance.sellerId = this.sellerId;
    modalRef2.result.then(result => {
      if (result === 'success') {
        this.cancel();
      }
    });
  }



  cancel() {
    if (this.routeName == 'AllProducts') {
      this.router.navigate(['/vendors/manage-products/seller-products'])
    }
    if (this.routeName == 'ApprovedProducts') {
      this.router.navigate(['/vendors/manage-products/approval'])
    }
    if (this.routeName == 'RejectedProducts') {
      this.router.navigate(['/vendors/manage-products/reject'])
    }
    if (this.routeName == 'WaitingForApproval') {
      this.router.navigate(['/vendors/manage-products/Waiting'])
    }
  }

  htmlTagConversion(data) {
    const val = data
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      .replaceAll("&sbquo;", "‚")
      .replaceAll("&#61;", "=")
      .replaceAll("&#45;", "-")
      .replaceAll("&hellip;", "…")
      .replaceAll("&commat;", "@")
      .replaceAll("&copy;", "©")
      .replaceAll("&#35;", "#")
      .replaceAll("&ldquo;", "“")
      .replaceAll("&rsquo;", "’")
      .replaceAll("&lsquo;", "‘")
      .replaceAll("&trade;", "™")
      .replaceAll("&reg;", "®")
      .replaceAll("&ndash;", "–")
      .replaceAll("&eacute;", "é")
      .replaceAll("&euro;", "€")
      .replaceAll("&pound;", "£");
    return val;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((each) => {
      each.unsubscribe();
    });
  }
}
