
// ---------------------Coupon Routes---------------------
import * as ProductSpecification from './catalog-c/catalog.contant'

// components paths
export const specificationComponents = ProductSpecification.componentLists;
// route paths
export const SpecificationRoutes = ProductSpecification.routePath;
export const SpecificationService = ProductSpecification.service

// --------------------------- Variant Inventory ----------------------------------------------
import * as VariantInventory from './VarientInventory-c/varient-inventory.constant'
// components paths
export const VariantInventories = VariantInventory.componentLists;
// route paths
export const VariantInventoriesRoutes = VariantInventory.routePath;


// ---------------------Related-Products Routes---------------------
import * as relatedProducts from './catalog-c/related-product/related-products-constant';

// components paths
export const relatedProductsComponent = relatedProducts.componentLists;
// route paths
export const relatedProductsRoutes = relatedProducts.routePath;


// ----------------------Chat--------------------------
import * as chat from './chat-c/chat-constant'
// components paths
export const chatConversationComponents = chat.componentLists;
// route paths
export const chatConversationComponentRoutes = chat.routePath;

export const chatAction = chat.addonAction

// ------------------common product ------------

import * as commonProductComponent from './CommonProduct-c/common-productData.constant'
// components paths
export const commonProductComponents = commonProductComponent.componentLists;
// route paths
export const commonProductComponentRoutes = commonProductComponent.routePath;

// ----------------------SEO--------------------------
import * as ProductSeo from './catalog-c/seo/Seo.contants'
// components paths
export const ProductSeoComponents = ProductSeo.componentLists;
// route paths
export const ProductSeoRoutes = ProductSeo.routePath;

export const ProductSeoServices = ProductSeo.componentServices

// ----------------------Quotation--------------------------
import * as Quotation from './Quotation-c/QuotationModule.contant'
// components paths
export const QuotationComponents = Quotation.componentLists;
// route paths
export const QuotationComponentRoutes = Quotation.routePath;

// ----------------------Rating and Review--------------------------
import * as CrmRatingAndReview from './RatingAndReview-c/RatingandreView.constant'
// components paths
export const CrmRatingAndReviewComponents = CrmRatingAndReview.componentLists;
// route paths
export const CrmRatingAndReviewRoutes = CrmRatingAndReview.routePath;

// ----------------------question and Answer --------------------------
import * as CrmQuestionAnswer from './QuestionAndAnswer-c/questionAnswer.constant'
// components paths
export const QuestionAnswerproductListComponents = CrmQuestionAnswer.componentLists;
// route paths
export const QuestionAnswerproductListRoutes = CrmQuestionAnswer.routePath;

// ----------------------Product Variant --------------------------


import * as productVariant from './ProductVariant-c/product-variant.constant'
// components paths
export const productVariantComponents =productVariant.componentLists;
// route paths
export const productVariantRoutes = productVariant.routePath;

// State for Variant
export interface AddOnAppState {

}

// Reducers for variant

import { ActionReducerMap } from '@ngrx/store';

export const AddOnReducers: ActionReducerMap<AddOnAppState> = {
   
};

// Effect for variant
export const ADD_ON_EFFECT = [

];

// ----------------------Coupons--------------------------
import * as Coupons from './marketing-c/coupon.constant'
// components paths
export const CouponsComponents = Coupons.componentLists;
// route paths
export const CouponsRoutes = Coupons.routePath;

// ----------------------Assign product price--------------------------
import * as AssignProductPrice from './assign-product-price-c/assign-product-price.constant'
// components paths
export const AssignComponents = AssignProductPrice.componentLists;
// route paths
export const AssingRoutes = AssignProductPrice.routePath;


// ----------------------Supplier Manager--------------------------
import * as SupplierManager from './SupplierManagement-c/SupplierMangement.contant'
// components paths
export const SupplierManagerComponents = SupplierManager.componentLists;
// route paths
export const SupplierManagerRoutes = SupplierManager.routePath;

// ----------------------Supplier Manager--------------------------
import * as Supplier from './SupplierManagement-c/supplier.contant'
// components paths
export const SupplierComponents = Supplier.componentSupplier;
// route paths
export const SupplierRoutes = Supplier.routePathSupplier;




