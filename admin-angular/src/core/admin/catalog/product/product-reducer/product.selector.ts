/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromProduct from './product.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getProdState = (state: AppState) => state.product;
// product list action
export const getProductList = createSelector(
  getProdState,
  fromProduct.getProductList
);
export const ProductListLoading = createSelector(
  getProdState,
  fromProduct.getProductListLoading
);
export const ProductListLoaded = createSelector(
  getProdState,
  fromProduct.getProductListLoaded
);
export const ProductListFailed = createSelector(
  getProdState,
  fromProduct.getProductListFailed
);

// product count action
export const getProductCount = createSelector(
  getProdState,
  fromProduct.getProductCount
);
export const ProductCountLoading = createSelector(
  getProdState,
  fromProduct.getProductCountLoading
);
export const ProductCountLoaded = createSelector(
  getProdState,
  fromProduct.getProductCountLoaded
);
export const ProductCountFailed = createSelector(
  getProdState,
  fromProduct.getProductCountFailed
);

// product delete action
export const getProductDelete = createSelector(
  getProdState,
  fromProduct.getProductDelete
);
export const ProductDeleteLoading = createSelector(
  getProdState,
  fromProduct.getProductDeleteLoading
);
export const ProductDeleteLoaded = createSelector(
  getProdState,
  fromProduct.getProductDeleteLoaded
);
export const ProductDeleteFailed = createSelector(
  getProdState,
  fromProduct.getProductDeleteFailed
);

// product add action
export const getProductAdd = createSelector(
  getProdState,
  fromProduct.getProductAdd
);
export const ProductAddLoading = createSelector(
  getProdState,
  fromProduct.getProductAddLoading
);
export const ProductAddLoaded = createSelector(
  getProdState,
  fromProduct.getProductAddLoaded
);
export const ProductAddFailed = createSelector(
  getProdState,
  fromProduct.getProductAddFailed
);

// product Detail action
export const getProductAddDetail = createSelector(
  getProdState,
  fromProduct.getProductAddDetail
);
export const ProductDetailLoading = createSelector(
  getProdState,
  fromProduct.getProducDetailLoading
);
export const ProductDetailLoaded = createSelector(
  getProdState,
  fromProduct.getProductDetailLoaded
);
export const ProductDetailFailed = createSelector(
  getProdState,
  fromProduct.getProductDetailFailed
);

// product update action
export const getProductUpdate = createSelector(
  getProdState,
  fromProduct.getProductUpdate
);
export const getProductDetails = createSelector(
  getProdState,
  fromProduct.getProductDetail
);
export const ProductUpdateLoading = createSelector(
  getProdState,
  fromProduct.getProductUpdateLoading
);
export const ProductUpdateLoaded = createSelector(
  getProdState,
  fromProduct.getProductUpdateLoaded
);
export const ProductUpdateFailed = createSelector(
  getProdState,
  fromProduct.getProductUpdateFailed
);

// product add action
export const getProductAddListResponse = createSelector(
  getProdState,
  fromProduct.getProductAddListResponse
);
export const getProductAddListRequestLoading = createSelector(
  getProdState,
  fromProduct.getProductAddListRequestLoading
);
export const getProductAddListRequestLoaded = createSelector(
  getProdState,
  fromProduct.getProductAddListRequestLoaded
);
export const getProductAddListRequestFailed = createSelector(
  getProdState,
  fromProduct.getProductAddListRequestFailed
);
// product remove action
export const getProductRemoveListResponse = createSelector(
  getProdState,
  fromProduct.getProductRemoveListResponse
);
export const getProductRemoveListRequestLoading = createSelector(
  getProdState,
  fromProduct.getProductRemoveListRequestLoading
);
export const getProductRemoveListRequestLoaded = createSelector(
  getProdState,
  fromProduct.getProductRemoveListRequestLoaded
);
export const getProductRemoveListRequestFailed = createSelector(
  getProdState,
  fromProduct.getProductRemoveListRequestFailed
);

// option list Action
export const optionList = createSelector(
  getProdState,
  fromProduct.optionList
);
export const optionlistLoading = createSelector(
  getProdState,
  fromProduct.optionListLoading
);
export const optionlistLoaded = createSelector(
  getProdState,
  fromProduct.optionListLoaded
);
export const optionlistFailed = createSelector(
  getProdState,
  fromProduct.optionListFailed
);

// getting option list
export const gettingOptionList = createSelector(
  getProdState,
  fromProduct.gettingOptionList
);
export const gettingOptionListLoading = createSelector(
  getProdState,
  fromProduct.gettingOptionListLoading
);
export const gettingOptionListLoaded = createSelector(
  getProdState,
  fromProduct.gettingOptionListLoaded
);
export const gettingOptionListFailed = createSelector(
  getProdState,
  fromProduct.gettingOptionListFailed
);

// getting rating list
export const gettingRatingList = createSelector(
  getProdState,
  fromProduct.getRatingList
);
// product Bulk Delete

export const getProdBulkDelete = createSelector(
  getProdState,
  fromProduct.getProductBulkDelete
);

// getting question list

export const questionList = createSelector(
  getProdState,
  fromProduct.questionList
);
export const questionListLoading = createSelector(
  getProdState,
  fromProduct.questionListLoading
);
export const questionListLoaded = createSelector(
  getProdState,
  fromProduct.questionListLoaded
);
export const questionListFailed = createSelector(
  getProdState,
  fromProduct.questionListFailed
);

// getting question list

export const addQuestion = createSelector(
  getProdState,
  fromProduct.addQuestion
);
export const addQuestionLoading = createSelector(
  getProdState,
  fromProduct.addQuestionLoading
);
export const addQuestionLoaded = createSelector(
  getProdState,
  fromProduct.addQuestionLoaded
);
export const addQuestionFailed = createSelector(
  getProdState,
  fromProduct.addQuestionFailed
);

// delete question list

export const deleteQuestion = createSelector(
  getProdState,
  fromProduct.deleteQuestion
);
export const deleteQuestionLoading = createSelector(
  getProdState,
  fromProduct.deleteQuestionLoading
);
export const deleteQuestionLoaded = createSelector(
  getProdState,
  fromProduct.deleteQuestionLoaded
);
export const deleteQuestionFailed = createSelector(
  getProdState,
  fromProduct.deleteQuestionFailed
);

    // change question status

export const changeQuestionStatus = createSelector(
  getProdState,
  fromProduct.changeQuestionStatus
);
export const changeQuestionStatusLoading = createSelector(
  getProdState,
  fromProduct.changeQuestionStatusLoading
);
export const changeQuestionStatusLoaded = createSelector(
  getProdState,
  fromProduct.changeQuestionStatusLoaded
);
export const changeQuestionStatusFailed = createSelector(
  getProdState,
  fromProduct.changeQuestionStatusFailed
);

    // change question status

export const answerList = createSelector(
  getProdState,
  fromProduct.answerList
);
export const answerListLoading = createSelector(
  getProdState,
  fromProduct.answerListLoading
);
export const answerListLoaded = createSelector(
  getProdState,
  fromProduct.answerListLoaded
);
export const answerListFailed = createSelector(
  getProdState,
  fromProduct.answerListFailed
);


  // update answer

export const updateAnswer = createSelector(
  getProdState,
  fromProduct.updateAnswer
);
export const updateAnswerLoading = createSelector(
  getProdState,
  fromProduct.updateAnswerLoading
);
export const updateAnswerLoaded = createSelector(
  getProdState,
  fromProduct.updateAnswerLoaded
);
export const updateAnswerFailed = createSelector(
  getProdState,
  fromProduct.updateAnswerFailed
);


  // delete answer

export const deleteAnswer = createSelector(
  getProdState,
  fromProduct.deleteAnswer
);
export const deleteAnswerLoading = createSelector(
  getProdState,
  fromProduct.deleteAnswerLoading
);
export const deleteAnswerLoaded = createSelector(
  getProdState,
  fromProduct.deleteAnswerLoaded
);
export const deleteAnswerFailed = createSelector(
  getProdState,
  fromProduct.deleteAnswerFailed
);


 // change answer status

export const changeAnswerStatus = createSelector(
  getProdState,
  fromProduct.changeAnswerStatus
);
export const changeAnswerStatusLoading = createSelector(
  getProdState,
  fromProduct.changeAnswerStatusLoading
);
export const changeAnswerStatusLoaded = createSelector(
  getProdState,
  fromProduct.changeAnswerStatusLoaded
);
export const changeAnswerStatusFailed = createSelector(
  getProdState,
  fromProduct.changeAnswerStatusFailed
);

  // add answer

export const addAnswer = createSelector(
  getProdState,
  fromProduct.addAnswer
);
export const addAnswerLoading = createSelector(
  getProdState,
  fromProduct.addAnswerLoading
);
export const addAnswerLoaded = createSelector(
  getProdState,
  fromProduct.addAnswerLoaded
);
export const addAnswerFailed = createSelector(
  getProdState,
  fromProduct.addAnswerFailed
);

  // add answer

export const defaultAnswer = createSelector(
  getProdState,
  fromProduct.defaultAnswer
);
export const defaultAnswerLoading = createSelector(
  getProdState,
  fromProduct.defaultAnswerLoading
);
export const defaultAnswerLoaded = createSelector(
  getProdState,
  fromProduct.defaultAnswerLoaded
);
export const defaultAnswerFailed = createSelector(
  getProdState,
  fromProduct.defaultAnswerFailed
);

// manufacturer list

export const manufacturerList = createSelector(
  getProdState,
  fromProduct.manufacturerList
);
export const manufacturerListLoading = createSelector(
  getProdState,
  fromProduct.manufacturerListLoading
);
export const manufacturerListLoaded = createSelector(
  getProdState,
  fromProduct.manufacturerListLoaded
);

  // VIDEO UPLOAD

  export const videoUpload = createSelector(
    getProdState,
    fromProduct.videoUpload
  );
  export const videoUploadLoading = createSelector(
    getProdState,
    fromProduct.videoUploadLoading
  );
  export const videoUploadLoaded = createSelector(
    getProdState,
    fromProduct.videoUploadLoaded
  );
  export const videoUploadFailed = createSelector(
    getProdState,
    fromProduct.videoUploadFailed
  );

    // VIDEO PREVIEW

    export const videoPreview = createSelector(
      getProdState,
      fromProduct.videoPreview
    );
    export const videoPreviewLoading = createSelector(
      getProdState,
      fromProduct.videoPreviewLoading
    );
    export const videoPreviewLoaded = createSelector(
      getProdState,
      fromProduct.videoPreviewLoaded
    );
    export const videoPreviewFailed = createSelector(
      getProdState,
      fromProduct.videoPreviewFailed
    );


    // export const deleteProbabilityOption = createSelector(
    //   getProdState,
    //   fromProduct.deleteProbabilityOption
    // );



    export const deleteProbabilityOption = createSelector(
      getProdState,
      fromProduct.deleteProbabilityOption
    );
    export const deleteProbabilityOptionLoading = createSelector(
      getProdState,
      fromProduct.deleteProbabilityOptionLoading
    );
    export const deleteProbabilityOptionLoaded = createSelector(
      getProdState,
      fromProduct.deleteProbabilityOptionLoaded
    );
    export const deleteProbabilityOptionFailed = createSelector(
      getProdState,
      fromProduct.deleteProbabilityOptionFailed
    );