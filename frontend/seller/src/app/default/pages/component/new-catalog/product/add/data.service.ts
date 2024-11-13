import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DataService {

  obj: any = {
    "categories": [],
  }

  private pageRefrsh: boolean = false;
  private categoriesIds: any = [];
  private categoriesRightArray: any = [];
  private categoriesLeftArray: any = [];
  private productDetails: any;
  private pricingDetails: any;
  private specificationData: any;
  private simplespecificationprev: any;
  private specificationprev: any = "";
  private productDetailsName: any;
  private ProductSeo: any;
  private pricingPrev: any;

  privateName: any = "";
  specification: any;

  ProductName: any;

  constructor() {

  }

  setObj(key, value) {
    this.obj[key] = value
  }


  setProductName(value) {
    this.ProductName = value
  }

  getProductName(){
    return this.ProductName;
  }


  setObjPageRefresh() {
    this.pageRefrsh = true
  }
  getObjPageRefresh() {
    return this.pageRefrsh;
  }

  setData(value: any) {
    this.categoriesIds = value;
  }

  setSpecificationData(data: any) {
    this.simplespecificationprev = data
    this.specificationData = data;

  }

  setAdvanceSpecificaionData(data: any) {
    this.setSpecificationDetailsPagePrev(data);
    if (['deleteAttributeGroupIds', 'deleteAttributeIds'].includes(data)) {
      this.specificationData = data
    }
    else {
      let get
      if (![undefined, '', null].includes(data)) {
        get = data.specifications
        let param = {
          specifications: get
        }
        this.specificationData = param;
      }

    }

  }

  setpricinfPrev(data) {
    this.specificationprev = data;
  }

  getSpecificationPrev() {
    return this.simplespecificationprev;
  }

  getSpecificationData() {
    return this.specificationData;
  }

  setDatacategoriesRightArray(value: any) {
    this.categoriesRightArray = value;
  }
  setDatacategoriesLeftArray(value: any) {
    this.categoriesLeftArray = value;
  }
  getDataccategoriesLeftArray() {
    return [...this.categoriesLeftArray];
  }
  setDataproductDetailsPagePrev(name) {
    this.privateName = name;
  }

  getrproductDetailsPagePrev() {
    return this.privateName;
  }

  setSpecificationDetailsPagePrev(data) {
    this.specification = data;
  }

  getSpecificationDetailsPagePrev() {
    return this.specification;
  }

  getDatacategoriesRightArray() {
    return [...this.categoriesRightArray];
  }

  getData() {

    return [...this.categoriesIds];
  }

  setDataProductDetails(value) {
    this.productDetails = value;
  }

  getDataProductDetails() {
    return this.productDetails ?? {};
  }

  getPricingDetail() {
    return this.pricingDetails ?? {};
  }

  setPricingDetails(value: any) {
    this.pricingDetails = value;
  }


  setDataProductDetailsprev(name) {
    this.productDetailsName = name;
  }
  getProductDetailsprev() {
    return this.productDetailsName ?? {};
  }


  setDataProductSeo(value) {
    this.ProductSeo = value;
  }

  getProductSeo() {
    return this.ProductSeo ?? {};
  }


  setpricingPrev(name) {
    this.pricingPrev = name;
  }

  getpricingPrev() {
    return this.pricingPrev ?? '';

  }
}
