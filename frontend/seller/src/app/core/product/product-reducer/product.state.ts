

import { Map, Record } from 'immutable';
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';
import { PriceUpdateListResponse } from '../product-model/price-update-List.model';

export interface ProductState extends Map<string, any> {

  productAdded: any;
  optionList: any;
  gettingoptionList: any;
  productBulkDelete: any;

  deleteProduct: any;
  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  deleteBulkProduct: any;
  deleteBulkLoading: boolean;
  deleteBulkLoaded: boolean;
  deleteBulkFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;
  productList: Array<any>;

  attributeGroupListLoading: boolean;
  attributeGroupListLoaded: boolean;
  attributeGroupListFailed: boolean;
  attributeGroupList: Array<any>;


  stockStatusListLoading: boolean;
  stockStatusListLoaded: boolean;
  stockStatusListFailed: boolean;
  stockStatusList: Array<any>;

  productStatus: any;
  productStatusLoading: boolean;
  productStatusLoaded: boolean;
  productStatusFailed: boolean;

  productUpdate: ProductAddResponseModel;
  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  productDetail: {};
  detailLoading: false;
  detailLoaded: false;
  detailFailed: false;
  availableCategoryList: [];

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;
  categoryListLoading: boolean;
  categoryList: Array<any>;
  tempCategoryList: Array<any>;
  currentCategoryList: Array<any>;
  totalProductCount: number;
  totalProductCountLoading: boolean;
  totalProductCountLoaded: boolean;
  totalProductCountFailed: boolean;

  activeProductCount: number;
  activeProductCountLoading: boolean;
  activeProductCountLoaded: boolean;
  activeProductCountFailed: boolean;



  inactiveProductCount: number;
  inactiveProductCountLoading: boolean;
  inactiveProductCountLoaded: boolean;
  inactiveProductCountFailed: boolean;


  manufacturerListLoading: boolean;
  manufacturerListLoaded: boolean;
  manufacturerListFailed: boolean;
  manufacturerList: Array<any>;

  changeQuotationStatusLoading: boolean;
  changeQuotationStatusLoaded: boolean;
  changeQuotationStatusFailed: boolean;


  variantListLoading: boolean;
  variantListLoaded: boolean;
  variantListFailed: boolean;
  variantList: any;

  selectedVariant: any;
  originalVariantList: any;
  selectedVariantOriginal: any;
  probabiltyOptions: any;
  originalProbabiltyArray: any;

  skuArrayList: any;
  selectedVariantId: any;

  taxListLoading: boolean;
  taxListLoaded: boolean;
  taxListFailed: boolean;
  taxList: Array<any>;


  // Question Add
  QuestionAdd: any;
  QuestionAddLoading: boolean;
  QuestionAddLoaded: boolean;
  QuestionAddFailed: boolean;

  // Question List
  questionList: any;
  questionListLoading: boolean;
  questionListLoaded: boolean;
  questionListFailed: boolean;

  // Question Delete
  questionDelete: any;
  questionDeleteLoading: boolean;
  questionDeleteLoaded: boolean;
  questionDeleteFailed: boolean;

  // Question Status
  questionStatus: any;
  questionStatusLoading: boolean;
  questionStatusLoaded: boolean;
  questionStatusFailed: boolean;


  // Answer Add
  answerAdd: any;
  answerAddLoading: boolean;
  answerAddLoaded: boolean;
  answerAddFailed: boolean;

  // Answer List
  answerList: any;
  answerListLoading: boolean;
  answerListLoaded: boolean;
  answerListFailed: boolean;

  // Answer Delete
  answerDelete: any;
  answerDeleteLoading: boolean;
  answerDeleteLoaded: boolean;
  answerDeleteFailed: boolean;

  // Answer Status
  answerStatus: any;
  answerStatusLoading: boolean;
  answerStatusLoaded: boolean;
  answerStatusFailed: boolean;

  // make default
  makeDefault: any;
  makeDefaultLoading: boolean;
  makeDefaultLoaded: boolean;
  makeDefaultFailed: boolean;

  InventoryProductListLoading: boolean;
  InventoryProductListLoaded: boolean;
  InventoryProductListFailed: boolean;
  InventoryProductList: Array<any>;

  inventoryProductListCount: any;
  inventoryProductListCountLoading: boolean;
  inventoryProductListCountLoaded: boolean;
  inventoryProductListCountFailed: boolean;

  exportProduct: any;
  exportProductLoading: boolean;
  exportProductLoaded: boolean;
  exportProductFailed: boolean;

  AllExportProduct: any;
  AllExportProductLoading: boolean;
  AllExportProductLoaded: boolean;
  AllExportProductFailed: boolean;

  videoUpload: any;
  videoUploadLoading: boolean;
  videoUploadLoaded: boolean;
  videoUploadFailed: boolean;

  imageUpload: any;
  imageUploadLoading: boolean;
  imageUploadLoaded: boolean;
  imageUploadFailed: boolean;


  
  CatalogEdit: any;
  CatalogEditLoading: boolean;
  CatalogEditLoaded: boolean;
  CatalogEditFailed: boolean;

}

export const ProductStateRecord = Record({

  productAdded: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,
  productList: [],


  stockStatusLoading: false,
  stockStatusLoaded: false,
  stockStatusFailed: false,
  stockStatusList: [],

  deleteProduct: {},
  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  attributeGroupList: {},
  attributeGroupListLoading: false,
  attributeGroupListLoaded: false,
  attributeGroupListFailed: false,

  deleteBulkProduct: {},
  deleteBulkLoading: false,
  deleteBulkLoaded: false,
  deleteBulkFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  productUpdate: {},
  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  categoryListLoading: false,
  categoryList: [],
  tempCategoryList: [],
  currentCategoryList: [],
  productDetail: DetailResponseModel,
  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

  productStatus: [],
  productStatusLoading: false,
  productStatusLoaded: false,
  productStatusFailed: false,

  totalProductCount: [],
  totalProductCountLoading: false,
  totalProductCountLoaded: false,
  totalProductCountFailed: false,

  activeProductCount: [],
  activeProductCountLoading: false,
  activeProductCountLoaded: false,
  activeProductCountFailed: false,

  inactiveProductCount: [],
  inactiveProductCountLoading: false,
  inactiveProductCountLoaded: false,
  inactiveProductCountFailed: false,

  manufacturerListLoading: false,
  manufacturerListLoaded: false,
  manufacturerListFailed: false,
  manufacturerList: [],

  changeQuotationStatusLoading: false,
  changeQuotationStatusLoaded: false,
  changeQuotationStatusFailed: false,

  variantListLoading: false,
  variantListLoaded: false,
  variantListFailed: false,
  variantList: [],

  selectedVariant: [],
  originalVariantList: [],
  selectedVariantOriginal: [],
  probabiltyOptions: [],
  originalProbabiltyArray: [],

  skuArrayList: [],
  selectedVariantId: [],

  taxListLoading: false,
  taxListLoaded: false,
  taxListFailed: false,
  taxList: [],

  // Question Add
  QuestionAdd: [],
  QuestionAddLoading: false,
  QuestionAddLoaded: false,
  QuestionAddFailed: false,

  // Question list
  questionList: [],
  questionListLoading: false,
  questionListLoaded: false,
  questionListFailed: false,

  // Question Delete
  questionDelete: [],
  questionDeleteLoading: false,
  questionDeleteLoaded: false,
  questionDeleteFailed: false,

  // Question Status
  questionStatus: [],
  questionStatusLoading: false,
  questionStatusLoaded: false,
  questionStatusFailed: false,


  // Answer Add
  answerAdd: [],
  answerAddLoading: false,
  answerAddLoaded: false,
  answerAddFailed: false,

  // Answer list
  answerList: [],
  answerListLoading: false,
  answerListLoaded: false,
  answerListFailed: false,

  // Answer Delete
  answerDelete: [],
  answerDeleteLoading: false,
  answerDeleteLoaded: false,
  answerDeleteFailed: false,

  // answer Status
  answerStatus: [],
  answerStatusLoading: false,
  answerStatusLoaded: false,
  answerStatusFailed: false,

  // make default
  makeDefault: [],
  makeDefaultLoading: false,
  makeDefaultLoaded: false,
  makeDefaultFailed: false,



  InventoryProductListLoading: false,
  InventoryProductListLoaded: false,
  InventoryProductListFailed: false,
  InventoryProductList: [],

  inventoryProductListCount: '',
  inventoryProductListCountLoading: false,
  inventoryProductListCountLoaded: false,
  inventoryProductListCountFailed: false,

  exportProduct: '',
  exportProductLoading: false,
  exportProductLoaded: false,
  exportProductFailed: false,

  AllExportProduct: '',
  AllExportProductLoading: false,
  AllExportProductLoaded: false,
  AllExportProductFailed: false,

  videoUpload: '',
  videoUploadLoading: false,
  videoUploadLoaded: false,
  videoUploadFailed: false,


  imageUpload: '',
  imageUploadLoading: false,
  imageUploadLoaded: false,
  imageUploadFailed: false, 


  
  CatalogEdit: '',
  CatalogEditLoading: false,
  CatalogEditLoaded: false,
  CatalogEditFailed: false, 


});

