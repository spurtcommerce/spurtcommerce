/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
// effects
import { Effect, Actions, ofType } from '@ngrx/effects';
// store
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../product-action/product.action';
import * as layoutActions from '../../layout/action/layout.action';

import { catchError } from 'rxjs/operators';
// service
import { ProductService } from '../product.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import * as store from '../../../../app.state.interface';
import { ProductModel } from '../../layout/models/product.model';

@Injectable()
export class ProductEffect {
  constructor(
    private action$: Actions,
    protected appState: Store<store.AppState>,
    private service: ProductService,
    private toastr: ToastrManager
  ) {
  }

  // Product list
  @Effect()
  doprodlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductlistAction) => action.payload),
    switchMap(state => {
      return this.service.productList(state).pipe(
        switchMap(product => [
          new actions.GetProductlistSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetProductlistFailAction(error)))
      );
    })
  );
  // Product list count
  @Effect()
  doprodlistscount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
    map((action: actions.GetProductCountAction) => action.payload),
    switchMap(state => {
      return this.service.productCount(state).pipe(
        map(count => new actions.GetProductCountSuccessAction(count)),
        catchError(error => of(new actions.GetProductCountFailAction(error)))
      );
    })
  );
  // Product delete
  @Effect()
  doProductDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_DELETE),
    map((action: actions.DoProductDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.productDelete(state).pipe(
        switchMap(user => [new actions.DoProductDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoProductDeleteFailAction(error)))
      );
    })
  );
  // Product add
  @Effect()
  doProductAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_ADD),
    map((action: actions.DoProductAddAction) => action.payload),
    switchMap(state => {
      return this.service.productAdd(state).pipe(
        map(user => new actions.DoProductAddSuccessAction(user)),
        catchError(error => of(new actions.DoProductAddFailAction(error)))
      );
    })
  );
  // Product update
  @Effect()
  doProductUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_UPDATE),
    map((action: actions.DoProductUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.productUpdate(state).pipe(
        switchMap(user => [new actions.DoProductUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoProductUpdateFailAction(error)))
      );
    })
  );
  // Product detail
  @Effect()
  doDetail$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetailAction) => action.payload),
    switchMap(state => {
      return this.service.productDetail(state).pipe(
        switchMap(user => [new actions.GetProductDetailSuccess(user)]),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  );

  // IS Feature

  @Effect()
  doProductIsFeature$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_IS_FEATURE_DETAIL),
    map((action: actions.DoProductDetailIsFeatureAction) => action.payload),
    switchMap(state => {
      return this.service.productIsfeature(state).pipe(
        tap(res => {
          this.appState.dispatch(
            new layoutActions.GetCatalogCountAction()
          );
        }),
        switchMap(user => [new actions.DoProductDetailIsFeatureSuccess(user)]),
        catchError(error => of(new actions.DoProductDetailIsFeatureFail(error)))
      );
    })
  );

  // Product Today Deals
  @Effect()
  doProductTodayDeals$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_TODAY_DEALS_DETAIL),
    map((action: actions.DoProductTodayDealAction) => action.payload),
    switchMap(state => {
      return this.service.productTodayDeals(state).pipe(
        switchMap(user => [new actions.DoProductTodayDealSuccess(user)]),
        catchError(error => of(new actions.DoProductTodayDealFail(error)))
      );
    })
  );


  // Get Rating list
  @Effect()
  DoRatingList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_RATING),
    map((action: actions.GetProductRating) => action.payload),
    switchMap(state => {
      return this.service.ratingListApi(state).pipe(
        switchMap(user => [new actions.GetProductRatingSuccess(user)]),
        catchError(error => of(new actions.GetProductRatingFail(error)))
      );
    })
  );

  // Rating Status

  @Effect()
  doProductRatingStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_RATING_STATUS),
    map((action: actions.DoProductRatingStatus) => action.payload),
    switchMap(state => {
      return this.service.productRatingStatus(state).pipe(
        switchMap(user => [new actions.DoProductRatingStatusSuccess(user)]),

        catchError(error => of(new actions.DoProductRatingStatusFail(error)))
      );
    })
  );
  // Product Bulk Delete
  @Effect()
  doProductBulkDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_BULK_DELETE),
    map((action: actions.DoProductBulkDelete) => action.payload),
    switchMap(state => {
      return this.service.productBulkDelete(state).pipe(
        switchMap(user => [new actions.DoProductBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoProductBulkDeleteFail(error)))
      );
    })
  );

  // Product Excel
  @Effect()
  doProductExcel$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_EXCEL),
    map((action: actions.DoProductExcel) => action.payload),
    switchMap(state => {
      return this.service.productExcel(state).pipe(
        tap(data => {
          const filename = 'ProductExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoProductExcelSuccess(user)]),
        catchError(error => of(new actions.DoProductExcelFail(error)))
      );
    })
  );



  // Product Excel
  @Effect()
  doProductAllExcel$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_ALL_EXCEL),
    map((action: actions.DoProductAllExcel) => action.payload),
    switchMap(state => {
      return this.service.productAllExcel(state).pipe(
        tap(data => {
          const filename = 'ProductExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoProductExcelSuccess(user)]),
        catchError(error => of(new actions.DoProductExcelFail(error)))
      );
    })
  );

  // Question list

  @Effect()
  questionList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_QUESTION_LIST),
    map((action: actions.GetQuestionListAction) => action.payload),
    switchMap(state => {
      return this.service.questionList(state).pipe(
        switchMap(product => [
          new actions.GetQuestionListSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetQuestionListFailAction(error)))
      );
    })
  );


  // Question add

  @Effect()
  questionAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ADD_QUESTION),
    map((action: actions.AddQuestionAction) => action.payload),
    switchMap(state => {
      return this.service.questionAdd(state).pipe(
        switchMap(product => [
          new actions.AddQuestionSuccessAction(product)
        ]),
        catchError(error => of(new actions.AddQuestionFailAction(error)))
      );
    })
  );

   // Question delete

   @Effect()
   questionDelete$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.DELETE_QUESTION),
     map((action: actions.DeleteQuestionAction) => action.payload),
     switchMap(state => {
       return this.service.deleteQuestion(state).pipe(
         switchMap(product => [
           new actions.DeleteQuestionSuccessAction(product)
         ]),
         catchError(error => of(new actions.DeleteQuestionFailAction(error)))
       );
     })
   );

     // Question status change

     @Effect()
     questionStatus$: Observable<Action> = this.action$.pipe(
       ofType(actions.ActionTypes.CHANGE_QUESTION_STATUS),
       map((action: actions.ChangeQuestionStatusAction) => action.payload),
       switchMap(state => {
         return this.service.changeQuestionStatus(state).pipe(
           switchMap(product => [
             new actions.ChangeQuestionStatusSuccessAction(product)
           ]),
           catchError(error => of(new actions.ChangeQuestionStatusFailAction(error)))
         );
       })
     );


     // Answer list

  @Effect()
  answerList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ANSWER_LIST),
    map((action: actions.GetAnswerListAction) => action.payload),
    switchMap(state => {
      return this.service.answerList(state).pipe(
        switchMap(product => [
          new actions.GetAnswerListSuccessAction(product)
        ]),
        catchError(error => of(new actions.GetAnswerListFailAction(error)))
      );
    })
  );

     // Answer Add

  @Effect()
  answerAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ADD_ANSWER),
    map((action: actions.AddAnswerAction) => action.payload),
    switchMap(state => {
      return this.service.answerAdd(state).pipe(
        switchMap(product => [
          new actions.AddAnswerSuccessAction(product)
        ]),
        catchError(error => of(new actions.AddAnswerFailAction(error)))
      );
    })
  );

     // Answer Update

  @Effect()
  answerUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_ANSWER),
    map((action: actions.UpdateAnswerAction) => action.payload),
    switchMap(state => {
      return this.service.answerUpdate(state).pipe(
        switchMap(product => [
          new actions.UpdateAnswerSuccessAction(product)
        ]),
        catchError(error => of(new actions.UpdateAnswerFailAction(error)))
      );
    })
  );

     // Answer Delete

  @Effect()
  answerDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_ANSWER),
    map((action: actions.DeleteAnswerAction) => action.payload),
    switchMap(state => {
      return this.service.answerDelete(state).pipe(
        switchMap(product => [
          new actions.DeleteAnswerSuccessAction(product)
        ]),
        catchError(error => of(new actions.DeleteAnswerFailAction(error)))
      );
    })
  );

      // Answer change status

  @Effect()
  answerStatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.CHANGE_ANSWER_STATUS),
    map((action: actions.ChangeAnswerStatusAction) => action.payload),
    switchMap(state => {
      return this.service.changeAnswerStatus(state).pipe(
        switchMap(product => [
          new actions.ChangeAnswerStatusSuccessAction(product)
        ]),
        catchError(error => of(new actions.ChangeAnswerStatusFailAction(error)))
      );
    })
  );


  // Answer Default

  @Effect()
  answerDefault$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.MAKE_DEFAULT_ANSWER),
    map((action: actions.MakeDefaultAnswerAction) => action.payload),
    switchMap(state => {
      return this.service.defaultAnswer(state).pipe(
        switchMap(product => [
          new actions.MakeDefaultAnswerSuccess(product)
        ]),
        catchError(error => of(new actions.MakeDefaultAnswerFail(error)))
      );
    })
  );

  // manufacturer list
  @Effect()
  manufacturerList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_MANUFACTURER_LIST),
    map((action: actions.ManufacturerListAction) => action.payload),
    switchMap(state => {
      return this.service.manufacturerList(state).pipe(
        switchMap(product => [
          new actions.ManufacturerListSuccessAction(product)
        ]),
        catchError(error => of(new actions.ManufacturerListFailAction(error)))
      );
    })
  );



  @Effect()
  videoUpload$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_UPLOAD),
    map((action: actions.VideoUpload) => action.payload),
    switchMap(state => {
      return this.service.videoUpload(state).pipe(
        switchMap(user => [new actions.VideoUploadSuccess(user)]),
        catchError(error => of(new actions.VideoUploadFail(error)))
      );
    })
  );

  @Effect()
  videoPreview$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.VIDEO_PREVIEW),
    map((action: actions.videoPreview) => action.payload),
    switchMap(state => {
      return this.service.videoPreview(state).pipe(
        switchMap(user => [new actions.videoPreviewSuccess(user)]),
        catchError(error => of(new actions.videoPreviewFail(error)))
      );
    })
  );


  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  private showSuccess(message) {
    this.toastr.successToastr(message);
  }
}
