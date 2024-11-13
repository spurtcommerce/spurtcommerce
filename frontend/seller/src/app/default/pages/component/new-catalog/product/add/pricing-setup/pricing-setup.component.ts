import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssignDiscountPriceComponent } from "../modals/assign-discount-price/assign-discount-price.component";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { NewProductSandbox } from "../../../../../../../../../src/app/core/catalog/product/product.sandbox";
import { DataService } from "../data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NewProductService } from "../../../../../../../../../src/app/core/catalog/product/product.service";
import { ProductSeoComponents } from "../../../../../../../../../add-ons/add-ons.constant";
import * as moment from "moment";
import { switchMap, catchError, take, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: "app-pricing-setup",
  templateUrl: "./pricing-setup.component.html",
  styleUrls: ["./pricing-setup.component.scss"],

})
export class PricingSetupComponent implements OnInit {
  // currency symbol
  public currency = JSON.parse(localStorage.getItem('adminCurrency'));

  //forms
  public DefaultPricemyForm: UntypedFormGroup;

  //loader
  public submit: boolean = false;

  //loader
  public buttonLoader: boolean = false;
  buttonSubmit:boolean = false;
  //checkbox
  Value: any;
  Percentage: any;
  taxId: any;
  valuecheckbox: boolean = true;
  percentagecheckbox: boolean;

  //tax
  taxList: any = [];
  showData: boolean = false;
  Percentageavlue: any;

  //
  valcategories: any;
  valProductDetail: any = {};
  valProductSeo: any = {};

  vendorUserDetails: any;
  pricingDetails: any;

  public editId: any;

  //discountPrice

  public discountPrice: UntypedFormGroup;

  //specialDiscount

  public specialDiscount: UntypedFormGroup;

  //updatesdetails

  public getupdateDetails: any;

  //discountpricearray
  public discountpricearray: any = [];

  //specialDiscountPrice:
  public specialDiscountPriceArray: any = [];

  //specificationDetails
  specificationDetails: any = [];
  refreshedSPecificationDetailFormat: any;

  //pricing Symbol

  symbol: any = JSON.parse(localStorage.getItem('vendor-settings'))

  ProductSeo = ProductSeoComponents.length > 0;

  refreshStatus: any;

  //Subscribtion
  public subscribtion = new Subscription()
  paramsValue:any={};
  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    public productsandbox: NewProductSandbox,
    public ref: ChangeDetectorRef,
    private dataService: DataService,
    public route: Router,
    public router: ActivatedRoute,
    private seoServices: NewProductService
  ) { }

  ngOnInit(): void {
    this.editId = this.router.snapshot.params.id;
    this.refreshStatus = this.dataService.getObjPageRefresh();
    if (this.refreshStatus == false) {
      if (!['', null, undefined].includes(this.editId)) {
        this.route.navigate(["/new-catalog/products/categories/", this.editId],{ queryParams: this.paramsValue });

      } else {

        this.route.navigate(['/new-catalog/products/categories'],{ queryParams: this.paramsValue })
      }
    }

    //inital value for form

    if (ProductSeoComponents.length > 0) {
      this.ProductSeo == true;
    }
    this.formFields();
    this.formDiscountPrice();
    this.formspecialPrice();
    this.TaxApiList();
    this.getDatasss();


    if (!["", null, undefined].includes(this.editId)) {
      this.updateDetails();
    }
    let data = JSON.parse(localStorage.getItem("vendorUserDetails"));
    this.vendorUserDetails = data;

    this.routeSubscribe();
  }


    /*query param value for pagination*/
    private routeSubscribe(): void {
      this.router.queryParams.subscribe(params => {
        this.paramsValue = params
      });
    }


  //caterogiesupdate value set:
  caterogiessetDats() {
    let id = [];
    this.getupdateDetails?.Category.forEach((element, ind) => {
      id[ind] = element.categoryId;
    });
    this.valcategories = id
    this.dataService.setData(id);
  }


  getProductSeo() {


  }

  //caterogiesupdate value set:
  productdetailssetDats() {
    let data = {
      productName: this.getupdateDetails.name,
      skuNumber: this.getupdateDetails.sku,
      inventory: this.getupdateDetails.quantity,
      productDescription: this.getupdateDetails.description,
      productHighlights: this.getupdateDetails.productHighlights,
      image: this.getupdateDetails.productImage,
      fromDateValid: this.getupdateDetails.dateAvailable,
      dummyImage: this.getupdateDetails?.productImage
    };
    this.dataService.setDataProductDetails(data);
  }

  getDatasss() {
    this.valcategories = this.dataService.getData();
    this.valProductDetail = this.dataService.getDataProductDetails();
    this.pricingDetails = this.dataService.getPricingDetail();
    let data = this.dataService.getSpecificationData();


    this.specificationDetails = data?.specifications;
    this.valProductSeo = this.dataService.getProductSeo();


    if (this.pricingDetails) {
      this.defaultpricigsetvalue();
    }


  }



  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }



  updateDetails() {
    // this.seoServices.getProductSeo(this.editId).subscribe((val) => {

    // })
    this.productsandbox.ProductUpdateDetails(this.editId);
   this.subscribtion.add(this.productsandbox.ProductUpdateDetails$.subscribe((val) => {
      if (val?.status == 1) {



        this.getupdateDetails = val?.data;
        // val?.data.Category.forEach(element => {
        //   this.valcategories.push(element.categoryId)
        // });

        if (this.isEmptyObject(this.valProductDetail) == true) {
          this.caterogiessetDats();
          this.productdetailssetDats();
          this.getDatasss();
        }

        // this.valProductDetail.dummyImage=val?.data?.productImage
        // this.valProductDetail.productName =val?.data?.name
        // this.valProductDetail.inventory=val?.data?.quantity
        // this.valProductDetail.productDescription=val?.data?.description
        // this.valProductDetail.skuNumber =val?.data?.sku

        this.DefaultPricemyForm.controls["Tax"].setValue(val?.data?.taxValue);
        this.DefaultPricemyForm.controls["TotalCost"].setValue(
          Number(val?.data?.productCost) + Number(val?.data?.taxValue)
        );

        this.DefaultPricemyForm.controls["productCost"].setValue(
          val?.data?.productCost
        );

        let dataTaxs: any

        this.valuecheckbox = val.data.taxType == 1 ? true : false;
        this.percentagecheckbox = val.data.taxType == 2 ? true : false;
        if (this.percentagecheckbox == true) {
          this.taxId = val?.data?.taxValue;
          let id = this.taxList.filter((val) => val.taxId == this.taxId);
          dataTaxs = id[0]
          this.Percentageavlue = id[0]?.taxName + '-' + id[0].taxPercentage;

          this.showData = true;
          this.DefaultPricemyForm.controls["TotalCost"].setValue(
            this.percentage(dataTaxs?.taxPercentage, val?.data?.productCost)

          );
        } else {
          this.showData = false;
        }

        this.specialUpadteDetails(val.data);
        this.discountUpdteDetails(val.data);

        this.discountpricearray.forEach((element, ind) => {
          element.skuName = val?.data?.sku;

        });

        this.specialDiscountPriceArray.forEach((element, ind) => {
          element.skuName = val?.data?.sku;
        });
      }
    }));
  }

  discountUpdteDetails(data) {
    data.productDiscountData.forEach((element, index) => {
      let data = {
        skuName: element.skuName,
        discountPriority: element.priority,
        discountPrice: element.price,
        discountDateStart: element.dateStart,
        discountDateEnd: element.dateEnd,
      };
      this.discountpricearray[index] = data;
    });

  }

  specialUpadteDetails(data) {
    data.productSpecialPrice.forEach((element, index) => {
      let data = {
        customerGroupId: 1,
        skuName: element.skuName,
        specialPriority: element.priority,
        specialPrice: element.price,
        specialDateStart: element.dateStart,
        specialDateEnd: element.dateEnd,
      };
      this.specialDiscountPriceArray[index] = data;
    });
  }

  defaultpricigsetvalue() {
    this.DefaultPricemyForm.controls["Tax"].setValue(this.pricingDetails.Tax);
    this.DefaultPricemyForm.controls["TotalCost"].setValue(
      this.pricingDetails.TotalCost
    );
    this.DefaultPricemyForm.controls["productCost"].setValue(
      this.pricingDetails.productCost
    );

    if (![null, undefined, ""].includes(this.pricingDetails.types)) {
      if (this.pricingDetails.types == "value") {
        this.valuecheckbox = true;
        this.percentagecheckbox = false;
      } else {
        this.percentagecheckbox = true;
        this.valuecheckbox = false;
      }
    }
  }

  //tax List api
  TaxApiList() {
    this.productsandbox.TaxList({});
   this.subscribtion.add(this.productsandbox.TaxList$.subscribe((val) => {
      if (val?.status == 1) {
        this.taxList = val?.data;
      }
    }));
  }
  // form
  formFields() {
    this.DefaultPricemyForm = this.formBuilder.group({
      productCost: ["", Validators.required],
      Tax: ["", Validators.required],
      TotalCost: ["", [Validators.required]],
      // Add more form controls as needed
    });
  }

  //discountPrice

  formDiscountPrice() {
    this.discountPrice = this.formBuilder.group({
      Priority: ["", Validators.required],
      Price: ["", Validators.required],
      DateStart: ["", Validators.required],
      DateEnd: ["", Validators.required],
      // Add more form controls as needed
    });
  }

  //discountPrice

  formspecialPrice() {
    this.specialDiscount = this.formBuilder.group({
      Priority: ["", Validators.required],
      Price: ["", Validators.required],
      DateStart: ["", Validators.required],
      DateEnd: ["", Validators.required],
      // Add more form controls as needed
    });
  }

  resetServices() {
    this.dataService.setData([]);
    this.dataService.setDatacategoriesRightArray({});
    this.dataService.setDatacategoriesLeftArray({});
    this.dataService.setDataproductDetailsPagePrev({});
    this.dataService.setDataProductDetails({});
    this.dataService.setSpecificationData([]);
    this.dataService.setSpecificationDetailsPagePrev({})
    this.dataService.setAdvanceSpecificaionData({})
    this.dataService.setPricingDetails({});
    this.dataService.setDataProductSeo({});
  }

  setDatas(datas) {
    var data = datas;
    data.type = [null, undefined, ""].includes(this.taxId)
      ? "value"
      : "percentage";
    this.dataService.setPricingDetails(data);
  }


  ngAfterViewChecked() {
    if (this.dataService.getData()?.length == 0) {
      this.getupdateDetails?.Category.forEach(element => {
        this.valcategories.push(element.categoryId)
      });
    }
  }
  convertToProductHighlights(inputString: string): { data: string }[] {
    if (inputString) {
      const paragraphs = inputString?.split(/<\/?p>/).filter(p => p.trim() !== '');

      const productHighlights = paragraphs.map(paragraph => ({
        data: `<p>${paragraph.trim()}</p>`
      }));

      return productHighlights;
    }

  }


  changeDateFormat(date) {
    return moment(date).format('YYYY-MM-DD')
  }
  //submit
  onSubmit() {
    this.submit = true;
    this.setDatas(this.DefaultPricemyForm.value);
    this.ref.detectChanges()
    this.valProductDetail.dummyImage.forEach((val, index) => {

      if (val.defaultImage == 1) {
        val.sortOrder = 1
      } else {
        val.sortOrder = index + 1
      }
    })

    if (this.discountpricearray?.length > 0) {
      this.discountpricearray.forEach((val) => {
        val.discountDateEnd = moment(val.discountDateEnd).format('YYYY-MM-DD')
        val.discountDateStart = moment(val.discountDateStart).format('YYYY-MM-DD')
      })
    }
    if (this.specialDiscountPriceArray?.length > 0) {
      this.specialDiscountPriceArray.forEach((val) => {
        val.specialDateEnd = moment(val.specialDateEnd).format('YYYY-MM-DD')
        val.specialDateStart = moment(val.specialDateStart).format('YYYY-MM-DD')
      })
    }
    if (['', null, undefined].includes(this.DefaultPricemyForm.value.Tax)) {

      this.DefaultPricemyForm.controls["Tax"].setValue(100);
    }

    if (["", null, undefined].includes(this.valProductDetail.productName)) {

    } else {
      const transformedHighlights = this.convertToProductHighlights(this.valProductDetail.productHighlights);

      let obj = {
        productName: this.valProductDetail.productName,
        sku: this.valProductDetail.skuNumber,
        metaTagTitle: "",
        metaTagDescription: "",
        productDescription: this.valProductDetail.productDescription,
        upc: "1",
        quantity: this.valProductDetail.inventory,
        dateAvailable: this.changeDateFormat(this.valProductDetail.fromDateValid),
        pincodeBasedDelivery: 0,
        hsn: "",
        relatedProductId: [],
        image: this.valProductDetail.dummyImage,
        categoryId: this.valcategories,
        condition: 1,
        vendorId: this.vendorUserDetails.vendorId,
        price: this.DefaultPricemyForm.value.productCost,
        packingCost: 0,
        shippingCost: 0,
        others: 0,
        tax: !["", undefined, null].includes(this.Percentageavlue)
          ? this.Percentageavlue.taxId
          : this.DefaultPricemyForm.value.Tax,
        taxType: !["", undefined, null].includes(this.Percentageavlue) ? 2 : 1,
        productSpecial: this.specialDiscountPriceArray,
        productDiscount: this.discountpricearray,
        metaTagKeyword: "",
        sortOrder: 1,
        productHighlights: transformedHighlights,
        productVideo: {
          name: this.valProductDetail?.videoDetails?.image ?? "",
          path: this.valProductDetail?.videoDetails?.path ?? "",
          type: 1,
        },
        editid: this.editId,
      };

      if (this.DefaultPricemyForm.valid) {
        this.buttonLoader = true;




        if (!['', null, undefined].includes(this.editId)) {
          this.productsandbox.Productedit(obj);

          this.buttonSubmit = true;

          this.productsandbox.Productedit$.pipe(
            take(1),
            switchMap((val) => {
              const data = {
                metaTagTitle: this.valProductSeo.metaTitle ?? '',
                metaTagDescription: this.valProductSeo.metaKeyword ?? '',
                metaTagKeyword: this.valProductSeo.metaDescription ?? '',
                productId: this.router.snapshot.params.id
              };

              // Check if any meta tag is empty and skip the API call if so
              if (!data.metaTagTitle && !data.metaTagDescription && !data.metaTagKeyword) {
                return of(null); // Skip to finalize
              }

              this.ref.detectChanges();
              return this.seoServices.CreateProductSeo(data).pipe(
                take(1),
                switchMap((seo) => {
                  if (seo?.status == 0) {
                    return of(null);
                  }

                  const objs = {
                    productSpecfication: this.specificationDetails,
                    editId: this.editId
                  };

                  if (
                    objs.productSpecfication.productId &&
                    objs.productSpecfication.deleteSpecificationIds.length === 0 &&
                    objs.productSpecfication.deleteAttributeGroupIds.length === 0 &&
                    objs.productSpecfication.deleteAttributeIds.length === 0 &&
                    objs.productSpecfication.deleteAttributeValueIds.length === 0 &&
                    objs.productSpecfication.productSpecifications.length === 0
                  ) {
                    return of(null);
                  }

                  return this.seoServices.updateSpecification(objs).pipe(
                    take(1),
                    switchMap((specific) => {
                      if (specific?.status !== 1) {
                        return of(null);
                      }

                      return this.seoServices.attributeSlug(this.editId).pipe(
                        take(1),
                        catchError((error) => {
                          return of(null);
                        })
                      );
                    }),
                    catchError((error) => {
                      return of(null);
                    })
                  );
                }),
                catchError((error) => {
                  return of(null);
                })
              );
            }),
            finalize(() => {
              this.ref.detectChanges();
              this.buttonLoader = false;
              this.resetServices();
              this.route.navigate([decodeURI("/new-catalog/products/list")], { queryParams: this.paramsValue });
              setTimeout(() => {
                this.buttonSubmit = false;
              }, 1000);
            })
          ).subscribe();


        } else {
          this.buttonSubmit = true;
          this.productsandbox.ProductCreation(obj);
          this.subscribtion.add(this.productsandbox.ProductCreation$.subscribe((val: any) => {
          
            this.ref.detectChanges();
            if (val?.status == 1) {
              this.buttonLoader = false;
              let onjects = {
                productSpecifications: this.specificationDetails,
                productId: val?.data?.productId
              };
          
              this.ref.detectChanges();
          
              let data = {
                metaTagTitle: this.valProductSeo.metaTitle ?? '',
                metaTagDescription: this.valProductSeo.metaKeyword ?? '',
                metaTagKeyword: this.valProductSeo.metaDescription ?? '',
                productId: val?.data?.productId
              };
          
              this.ref.detectChanges();
          
              if (val?.data?.productId && val?.status == 1) {
                // Check if any meta tag is empty
                if (data.metaTagTitle || data.metaTagDescription || data.metaTagKeyword) {
                  this.subscribtion.add(this.seoServices.CreateProductSeo(data).subscribe((seoVal) => {
                    if (seoVal?.status == 1 && onjects?.productSpecifications?.length > 0) {
                      this.subscribtion.add(this.seoServices.Specification_Create(onjects).subscribe((specVal) => {
                        this.subscribtion.add(this.seoServices.attributeSlug(onjects?.productId).subscribe(attrVal => {
                          if (attrVal?.status == 1) {
                            this.resetServices();
                            this.route.navigate(["/new-catalog/products/list"], { queryParams: this.paramsValue });
                          }
                        }));
                      }));
                    } else {
                      this.resetServices();
                      this.route.navigate(["/new-catalog/products/list"], { queryParams: this.paramsValue });
                    }
                  }));
                } else {
                  // If meta tags are empty, navigate directly without calling CreateProductSeo
                  this.resetServices();
                  this.route.navigate(["/new-catalog/products/list"], { queryParams: this.paramsValue });
                }
              }
            }
          
            if (val?.status == 0) {
              this.buttonLoader = false;
          
              setTimeout(() => {                           // <<<---using ()=> syntax
                this.buttonSubmit = false;
              }, 1000);
            }
          }));
          
        }
      }
    }



  }
  // Convert method
  private convertDetailToEditApi(detailApiResponse): {} {
    const productId = detailApiResponse.length ? detailApiResponse[0].productId.toString() : '';

    const productSpecifications = detailApiResponse.map(spec => ({
      specificationId: spec.specificationId,
      id: spec.id,
      attributeGroups: spec.attributeGroups.map(group => ({
        id: group.id,
        attributes: group.attributes.map(attr => ({
          attributeId: attr.attributeId,
          id: attr.id,
          attributeValues: attr.attributesValues.map(attrValue => ({
            attributeValueId: attrValue.attributeValueId,
            id: null, // Set to null as required
            value: attrValue.value
          }))
        }))
      }))
    }));

    return {
      deleteSpecificationIds: [],
      deleteAttributeGroupIds: [],
      deleteAttributeIds: [],
      deleteAttributeValueIds: [],
      productSpecifications,
      productId
    };
  }


  //product cost change

  productCostChnage() {
    this.DefaultPricemyForm.controls["TotalCost"].setValue("");
    this.DefaultPricemyForm.controls["Tax"].setValue("");
    this.taxId = "";
    this.Percentageavlue = "";
    this.showData = false;
    this.percentagecheckbox = false;
    this.valuecheckbox = true;
  }

  //change for tax
  TaxChange(event: any) {
    this.showData = false;

    this.DefaultPricemyForm.controls["TotalCost"].setValue(
      Number(this.DefaultPricemyForm.value.productCost) +
      Number(event.target.value)
    );
  }

  //percentage Calculate
  percentage(partialValue, totalValue) {
    return (partialValue * totalValue) / 100 + totalValue;
  }

  // percentage check box
  PercentageChange(event: any) {
    this.DefaultPricemyForm.controls["TotalCost"].setValue(
      this.percentage(
        Number(event.taxPercentage),
        Number(this.DefaultPricemyForm.value.productCost)
      )
    );
    this.taxId = event.taxId;
  }

  checkboxchange(name) {
    if (name == "value") {
      this.showData = false;
      this.DefaultPricemyForm.controls["TotalCost"].setValue("");
      this.DefaultPricemyForm.controls["Tax"].setValue("");
    }
    if (name == "Percentage") {
      this.DefaultPricemyForm.controls["Tax"].setValue("");
      this.DefaultPricemyForm.controls["TotalCost"].setValue("");

      if (this.editId) {
        if (
          this.getupdateDetails?.productCost ==
          this.DefaultPricemyForm.value.productCost
        ) {

        } else {
          this.DefaultPricemyForm.controls["TotalCost"].setValue("");
        }
      }
      this.showData = true;
    }
  }
  //assign discount
  openassigndiscount() {
    const modelRef = this.modalService.open(AssignDiscountPriceComponent, {
      size: "xl",
      windowClass: "assignattributesmodal",
      backdrop: "static",
      backdropClass: "createcr",
      centered: true,
    });
    modelRef.componentInstance.formgroup = this.discountPrice;
    modelRef.componentInstance.getdata = this.getupdateDetails;

    modelRef.result.then((result) => {
      let data = {
        skuName: this.getupdateDetails.sku,
        discountPriority: result.formgroup.value.Priority,
        discountPrice: result.formgroup.value.Price,
        discountDateStart: result.formgroup.value.DateStart.toISOString(),
        discountDateEnd: result.formgroup.value.DateEnd.toISOString(),
        disCustomerGroup: "",
      };
      this.discountpricearray.push(data);
    });
  }

  deteleDiscountandspecial(i, name) {
    if (name == "discount") {
      this.discountpricearray.splice(i, 1);
    } else {
      this.specialDiscountPriceArray.splice(i, 1);
    }
  }

  OpenSpecialdiscount() {
    const modelRef = this.modalService.open(AssignDiscountPriceComponent, {
      size: "xl",
      windowClass: "assignattributesmodal",
      backdrop: "static",
      backdropClass: "createcr",
      centered: true,
    });
    modelRef.componentInstance.formgroup = this.specialDiscount;
    modelRef.componentInstance.getdata = this.getupdateDetails;
    modelRef.componentInstance.ActionName = "SpecialPrice"
    modelRef.result.then((result) => {
      let data = {
        customerGroupId: 1,
        skuName: this.getupdateDetails.sku,
        specialPriority: result.formgroup.value.Priority,
        specialPrice: result.formgroup.value.Price,
        specialDateStart: result.formgroup.value.DateStart.toISOString(),
        specialDateEnd: result.formgroup.value.DateEnd.toISOString(),
      };

      this.specialDiscountPriceArray.push(data);

      this.specialDiscount.reset();
    });
  }

  editdiscountPrice(i, item, name) {
    const modelRef = this.modalService.open(AssignDiscountPriceComponent, {
      size: "xl",
      windowClass: "assignattributesmodal",
      backdrop: "static",
      backdropClass: "createcr",
      centered: true,
    });

    if (name == "discount") {
      modelRef.componentInstance.formgroup = this.discountPrice;
    } else {
      modelRef.componentInstance.formgroup = this.specialDiscount;
      modelRef.componentInstance.ActionName = 'SpecialPrice'
    }

    modelRef.componentInstance.getdata = this.getupdateDetails;
    modelRef.componentInstance.editValue = item;



    modelRef.result.then((result) => {

      if (result.ActionName == "SpecialPrice") {

        let data = {

          customerGroupId: 1,
          skuName: this.getupdateDetails.sku,
          specialPriority: result.formgroup.value.Priority,
          specialPrice: result.formgroup.value.Price,
          specialDateStart: result.formgroup.value.DateStart,
          specialDateEnd: result.formgroup.value.DateEnd,
        };

        this.specialDiscountPriceArray[i] = data;
        this.specialDiscount.reset();
      } else {

        let data = {
          skuName: this.getupdateDetails.sku,
          discountPriority: result.formgroup.value.Priority,
          discountPrice: result.formgroup.value.Price,
          discountDateStart: result.formgroup.value.DateStart,
          discountDateEnd: result.formgroup.value.DateEnd,
          disCustomerGroup: "",
        };
        this.discountpricearray[i] = data;
        this.discountPrice.reset();
      }

    });
  }

  //prev
  prev() {

    if (ProductSeoComponents.length > 0) {
      this.dataService.setpricingPrev('pricingPrev')
      if (!['', null, undefined].includes(this.editId)) {
        this.route.navigate(
          ["/new-catalog/products/seo", this.editId]
          ,{ queryParams: this.paramsValue }
        );

      } else {
        this.route.navigate(["/new-catalog/products/seo"],{ queryParams: this.paramsValue });
      }
    } else {
      this.dataService.setpricingPrev('pricingPrev')

      if (!['', null, undefined].includes(this.editId)) {
        this.route.navigate(
          ["/new-catalog/products/specification", this.editId, this.getupdateDetails?.name],{ queryParams: this.paramsValue });
      } else {
        this.route.navigate(["/new-catalog/products/specification"],{ queryParams: this.paramsValue });
      }
    }


  }

  cancel() {
    this.resetServices();
    this.route.navigate(["/new-catalog/products/list"],{ queryParams: this.paramsValue });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}