/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../product-action/product.action';

import { catchError } from 'rxjs/operators';
// service
import { ProductService } from '../product.service';
import { tap } from 'rxjs/operators';
import * as store from '../../app.state.interface';
import { ProductSuccessComponent } from '../../../default/shared/popup/product-success/product-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Injectable()
export class ProductEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: ProductService,
    private popup: NgbModal, public router: Router, public toaster: ToastrService
  ) { }

  
  doProductAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.service.productAdd(state).pipe(

        tap(add => {
          const modalRef = this.popup.open(ProductSuccessComponent, {
            backdrop: 'static',
            keyboard: false
          });
        }),
        switchMap(user => [new actions.DoProductAddSuccessAction(user)]),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  ));

  
  doGetAttributeGroup$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ATTRIBUTE_GROUP_LIST),
    map((action: actions.GetAttributeGroupListAction) => action.payload),
    switchMap(state => {
      return this.service.attributeGroupList(state).pipe(
        switchMap(user => [new actions.GetAttributeGroupListSuccessAction(user)]),
        catchError(error => of(new actions.GetAttributeGroupListFailAction(error)))
      );
    })
  ));

  // Product detail
  
  doDetail$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.service.productDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  ));
  
  doProductDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error.error))),
        tap(resp => {
          if (resp) {
          }
        })
      );
    })
  ));
  
  doProductBulkDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BULK_PRODUCT_DELETE),
    map((action: actions.DoProductBulkDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productBulkDelete(state).pipe(
        switchMap(user => [new actions.DoProductBulkDeleteSuccessAction(user)]),
        tap(data => {
          if (data) {
            this.toaster.success('Success', data.payload['message']);
          }
        }),
        catchError(error => of(new actions.DoProductBulkDeleteFailAction(error)))
      );
    })
  ));
  // Product update
  
  doProductUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
    map((action: actions.DoProductUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.productUpdate(state).pipe(
        switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
        tap(resp => {
          if (resp) {
            this.router.navigate(['/catalog/manage-products/']);
          }
        }),
        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
      );
    })
  ));
  // product status change
  
  doProductStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_STATUS),
    map((action: actions.DoProductStatus) => action.payload),
    switchMap(state => {
      return this.service.productStatus(state).pipe(
        switchMap(status => [new actions.DoProductStatusSuccess(status)]),
        catchError(error => of(new actions.DoProductStatusFail(error)))
      );
    })
  ));

  
  getProductList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.service.productList(state).pipe(
        map(user => new actions.GetProductlistSuccessAction(user)),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  ));

  
  getStockStatusList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_STOCK_STATUS_LIST),
    map((action: actions.GetStockStatuslistAction) => action.payload),
    switchMap(state => {
      return this.service.stockStatusList(state).pipe(
        map(user => new actions.GetStockStatuslistSuccessAction(user)),
        catchError(error => of(new actions.GetStockStatuslistFailAction(error)))
      );
    })
  ));
  
  getCategoryList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORIES_LIST),
    map((action: actions.GetCategorieslistAction) => action.payload),
    switchMap(state => {
      return this.service.categoryList(state).pipe(
        map(user => new actions.GetCategorieslistSuccessAction(user)),
        catchError(error => of(new actions.GetCategorieslistFailAction(error)))
      );
    })
  ));
  
  doTotalProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT),
    map((action: actions.GetTotalProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetTotalProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalProductCountFailAction(error))
        )
      );
    })
  ));

  
  doActiveCustomerListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT),
    map((action: actions.GetActiveProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetActiveProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetActiveProductCountFailAction(error))
        )
      );
    })
  ));

  
  doInActiveProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT),
    map((action: actions.GetInActiveProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        tap(data => {
          if (data) {
          }
        }),
        switchMap(response => [
          new actions.GetInActiveProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetInActiveProductCountFailAction(error))
        )
      );
    })
  ));

  // Manufacturer List
  
  manufacturerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANUFACTURER_LIST),
    map((action: actions.ManufacturerListAction) => action.payload),
    switchMap(state => {
      return this.service.manufacturerList(state).pipe(
        switchMap(user => [new actions.ManufacturerListSuccessList(user)]),
        catchError(error => of(new actions.ManufacturerListFailList(error)))
      );
    })
  ));

  // Change Quotation Status
  
  changeQuotationStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.CHANGE_QUOTATION_STATUS),
    map((action: actions.ChangeQuotationStatusAction) => action.payload),
    switchMap(state => {
      return this.service.changeQuotationStatus(state).pipe(
        switchMap(user => [new actions.ChangeQuotationStatusSuccess(user)]),
        catchError(error => of(new actions.ChangeQuotationStatusFail(error)))
      );
    })
  ));

  
  VariantList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VARIANT_LIST),
    map((action: actions.VariantListAction) => action.payload),
    switchMap(state => {
      return this.service.variantList(state).pipe(
        switchMap(user => [new actions.VariantListSuccess(user)]),
        catchError(error => of(new actions.VariantListFail(error)))
      );
    })
  ));


  // Tax List
  
  taxList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.TAX_LIST),
    map((action: actions.TaxListAction) => action.payload),
    switchMap(state => {
      return this.service.taxList(state).pipe(
        switchMap(user => [new actions.TaxListSuccessList(user)]),
        catchError(error => of(new actions.TaxListFailList(error)))
      );
    })
  ));


  
  deleteProbabilityOption$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_PROBABILITY_OPTION),
    map((action: actions.DeleteProbabilityOption) => action.payload),
    switchMap(state => {
      return this.service.deleteProbabilityOption(state).pipe(
        switchMap(user => [new actions.DeleteProbabilityOptionSuccess(user)]),
        catchError(error => of(new actions.DeleteProbabilityOptionFail(error)))
      );
    })
  ));

  // QUESTION ADD

  
  doQuestionAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_QUESTION_ADD),
    map((action: actions.DoQuestionAddAction) => action.payload),
    switchMap(state => {
      return this.service.QuestionAdd(state).pipe(
        tap(res => {
          if (res) {
            this.toaster.success('Question Posted Successfully');
          }
        }),
        switchMap(user => [new actions.DoQuestionAddSuccessAction(user)]),
        catchError(error => of(new actions.DoQuestionAddFailAction(error)))
      );
    })
  ));

  // QUESTION LIST

  
  doQuestionList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_QUESTION_LIST),
    map((action: actions.DoQuestionListAction) => action.payload),
    switchMap(state => {
      return this.service.questionList(state).pipe(
        switchMap(user => [new actions.DoQuestionListSuccessAction(user)]),
        catchError(error => of(new actions.DoQuestionListFailAction(error)))
      );
    })
  ));

  // QUESTION DELETE

  
  doQuestionDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_QUESTION_DELETE),
    map((action: actions.DoQuestionDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.questionDelete(state).pipe(
        switchMap(user => [new actions.DoQuestionDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoQuestionDeleteFailAction(error)))
      );
    })
  ));

  // QUESTION STATUS

  
  doQuestionStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_QUESTION_STATUS),
    map((action: actions.DoQuestionStatusAction) => action.payload),
    switchMap(state => {
      return this.service.questionStatus(state).pipe(
        switchMap(user => [new actions.DoQuestionStatusSuccessAction(user)]),
        catchError(error => of(new actions.DoQuestionStatusFailAction(error)))
      );
    })
  ));


  // ANSWER ADD

  
  doAnswerAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ANSWER_ADD),
    map((action: actions.DoAnswerAddAction) => action.payload),
    switchMap(state => {
      return this.service.answerAdd(state).pipe(
        switchMap(user => [new actions.DoAnswerAddSuccessAction(user)]),
        catchError(error => of(new actions.DoAnswerAddFailAction(error)))
      );
    })
  ));

  // ANSWER LIST

  
  doAnswerList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ANSWER_LIST),
    map((action: actions.DoAnswerListAction) => action.payload),
    switchMap(state => {
      return this.service.answerList(state).pipe(
        switchMap(user => [new actions.DoAnswerListSuccessAction(user)]),
        catchError(error => of(new actions.DoAnswerListFailAction(error)))
      );
    })
  ));

  // ANSWER DELETE

  
  doAnswerDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ANSWER_DELETE),
    map((action: actions.DoAnswerDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.answerDelete(state).pipe(
        switchMap(user => [new actions.DoAnswerDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoAnswerDeleteFailAction(error)))
      );
    })
  ));

  // ANSWER STATUS

  
  doanswerstatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ANSWER_STATUS),
    map((action: actions.DoAnswerStatusAction) => action.payload),
    switchMap(state => {
      return this.service.answerStatus(state).pipe(
        switchMap(user => [new actions.DoAnswerStatusSuccessAction(user)]),
        catchError(error => of(new actions.DoAnswerStatusFailAction(error)))
      );
    })
  ));

  // MAKE DEFAULT
  
  makeDefault$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_DEFAULT),
    map((action: actions.MakeDefaultAction) => action.payload),
    switchMap(state => {
      return this.service.makeDefault(state).pipe(
        switchMap(user => [new actions.MakeDefaultSuccessAction(user)]),
        catchError(error => of(new actions.MakedefaultFailAction(error)))
      );
    })
  ));


  
  InventoryProductList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.INVENTORY_PRODUCT_LIST),
    map((action: actions.InventoryProductListAction) => action.payload),
    switchMap(state => {
      return this.service.InventoryProductList(state).pipe(
        map(user => new actions.InventoryProductListSuccessAction(user)),
        catchError(error => of(new actions.InventoryProductListFailAction(error)))
      );
    })
  ));


  // Inventory product list count

  
  inventProductListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.INVENTORY_PRODUCT_LIST_COUNT),
    map((action: actions.InventoryProductListCountAction) => action.payload),
    switchMap(state => {
      return this.service.inventoryProductListCount(state).pipe(
        switchMap(list => [new actions.InventoryProductListCountSuccess(list)]),
        catchError(error => of(new actions.InventoryProductListCountFail(error)))
      );
    })
  ));


  // Update Stock

  
  updateStock$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_STOCK),
    map((action: actions.UpdateStockAction) => action.payload),
    switchMap(state => {
      return this.service.updateStock(state).pipe(
        switchMap(list => [new actions.UpdateStockSuccess(list)]),
        tap(data => {
          if (data) {
           this.toaster.success(data.payload['message']);
          }
        })
        ,
        catchError(error => of(new actions.UpdateStockFail(error)))
      );
    })
  ));

  // export product list

  
  exportProduct$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_PRODUCT),
    map((action: actions.ProductExportAction) => action.payload),
    switchMap(state => {
      return this.service.exportProduct(state).pipe(
        tap(data => {
          const filename = 'product_list_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(list => [new actions.ProductExportSuccessAction(list)]),
        catchError(error => of(new actions.ProductExportFailAction(error)))
      );
    })
  ));

  // export All product list

  
  exportAllProduct$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ALL_EXPORT_PRODUCT),
    map((action: actions.ProductAllExportAction) => action.payload),
    switchMap(state => {
      return this.service.productAllExcel(state).pipe(
        tap(data => {
          const filename = 'product_list_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(list => [new actions.ProductAllExportSuccessAction(list)]),
        catchError(error => of(new actions.ProductAllExportFailAction(error)))
      );
    })
  ));

  // Video Upload

  
  videoUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_UPLOAD),
    map((action: actions.VideoUploadAction) => action.payload),
    switchMap(state => {
      return this.service.videoUpload(state).pipe(
        switchMap(list => [new actions.VideoUploadSuccessAction(list)]),
        tap(data => {
          if (data) {
  
          }
        })
        ,
        catchError(error => of(new actions.VideoUploadFailAction(error)))
      );
    })
  ));



//Image upload //
 // Video Upload

 
 imageUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.CATALOG_EDIT),
   map((action: actions.CatalogEdit) => action.payload),
   switchMap(state => {
     return this.service.CatalogEdit(state).pipe(
       switchMap(list => [new actions.CatalogEditSuccess (list)]),
       tap(data => {
         if (data) {
 
         }
       })
       ,
       catchError(error => of(new actions.CatalogEditFail (error)))
     );
   })
 ));


 
//Catalog edit

 
 CatalogEdit$: Observable<Action> = createEffect(() => this.action$.pipe(
   ofType(actions.ActionTypes.IMAGE_UPLOAD),
   map((action: actions.ImageUploadAction) => action.payload),
   switchMap(state => {
     return this.service.imageUpload(state).pipe(
       switchMap(list => [new actions.ImageUploadSuccessAction (list)]),
       tap(data => {
         if (data) {
 
         }
       })
       ,
       catchError(error => of(new actions.ImageUploadFailAction (error)))
     );
   })
 ));





}
