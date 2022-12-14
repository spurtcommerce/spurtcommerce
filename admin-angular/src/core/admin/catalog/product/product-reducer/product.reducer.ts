/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../product-action/product.action';
// state
import { ProductState, ProductStateRecord } from './product.state';
// model
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { ProductSearchOptionModel } from '../product-model/product-search-option';

export const initialState: ProductState = new ProductStateRecord() as unknown as ProductState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <-------------GET PRODUCT DETAILS--------------> //

    case actions.ActionTypes.GET_PRODUCT_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_SUCCESS: {
      let skuArray: any = [];
      if (payload.data) {
          skuArray.push(payload.data.sku);
      }

      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        productDetail: new DetailResponseModel(payload.data),
        skuArrayList: skuArray,
      });
    }

    case actions.ActionTypes.GET_PRODUCT_DETAIL_FAIL: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: false,
        detailFailed: true
      });
    }

    // <-------------ADD PRODUCT--------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_SUCCESS: {
      const addedProduct = new ProductAddResponseModel(payload.data);
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        addProductDetail: addedProduct,
        productAdded: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_ADD_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }

    // <-------------GET PRODUCT LIST--------------> //

    case actions.ActionTypes.GET_PRODUCT_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_LIST_SUCCESS: {
      let productModel = payload.data.map(_products => {
        const tempProductModel = new ProductListResponseModel(_products);
        return tempProductModel;
      });
      if (state.productDetail && Object.keys(state.productDetail).length) {
        const tempDetails = state.productDetail;
        if (tempDetails.relatedProductDetail && tempDetails.relatedProductDetail.length > 0) {
          productModel = productModel.filter(item1 =>
            !tempDetails.relatedProductDetail.some(item2 => (item2.productId === item1.productId)));
        }
      }
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        productList: productModel
      });
    }


    case actions.ActionTypes.GET_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }

    // <-------------GET PRODUCT LIST COUNT--------------> //

    case actions.ActionTypes.GET_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }

    case actions.ActionTypes.GET_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: false,
        productCount: payload.data
      });
    }

    case actions.ActionTypes.GET_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }

    // <-------------DELETE PRODUCT --------------> //

    case actions.ActionTypes.DO_PRODUCT_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false,
        productDelete: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
        productDelete: payload
      });
    }

    // <-------------CLEAR PRODUCT DETAILS--------------> //

    case actions.ActionTypes.DO_CLEAR_PRODUCT_DETAILS: {
      return Object.assign({}, state, {
        productDetail: {}
      });
    }

    // <-------------UPDATE PRODUCT--------------> //

    case actions.ActionTypes.DO_PRODUCT_UPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        productUpdate: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }

    // <-------------ADD PRODUCT TO FEATURED LIST--------------> //

    case actions.ActionTypes.DO_IS_FEATURE_DETAIL: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_IS_FEATURE_DETAIL_SUCCESS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_IS_FEATURE_DETAIL_FAIL: {
      return Object.assign({}, state, {});
    }

    // <-------------REMOVE PRODUCT--------------> //

    case actions.ActionTypes.DO_PRODUCT_REMOVE_LIST: {
      const Data: any = state.productList;
      for (let i = 0; i < Data.length; i++) {
        if (i === payload) {
          Data.splice(payload, 1);
        }
      }
      return Object.assign({}, state, {
        productRemoveLists: Data,
        productRemoveListResponse: false,
        productRemoveListRequestLoading: true,
        productRemoveListRequestLoaded: false,
        productRemoveListRequestFailed: false
      });
    }

    // <-------------DD PRODUCT--------------> //

    case actions.ActionTypes.DO_PRODUCT_ADD_LIST: {
      const Data: any = state.productList;
      Data.push(payload);
      return Object.assign({}, state, {
        productList: Data,
        productAddListResponse: false,
        productAddListRequestLoading: true,
        productAddListRequestLoaded: false,
        productAddListRequestFailed: false
      });
    }


    // <-------------TODAY DEALS DETAILS--------------> //

    case actions.ActionTypes.DO_TODAY_DEALS_DETAIL: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_TODAY_DEALS_DETAIL_SUCCESS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_TODAY_DEALS_DETAIL_FAIL: {
      return Object.assign({}, state, {});
    }

    // <-------------CHANGE RATING STATUS IN PRODUCT ADD PAGE--------------> //

    case actions.ActionTypes.DO_PRODUCT_RATING_STATUS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_PRODUCT_RATING_STATUS_SUCCESS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_PRODUCT_RATING_STATUS_FAIL: {
      return Object.assign({}, state, {});
    }

    // <-------------GET PRODUCT RATING LIST--------------> //

    case actions.ActionTypes.GET_PRODUCT_RATING: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_PRODUCT_RATING_SUCCESS: {
      return Object.assign({}, state, {
        getRatingList: payload.data
      });
    }

    case actions.ActionTypes.GET_PRODUCT_RATING_FAIL: {
      return Object.assign({}, state, {
        getRatingList: payload.data
      });
    }


    // <-------------BULK DELETE PRODUCT--------------> //

    case actions.ActionTypes.DO_PRODUCT_BULK_DELETE: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_PRODUCT_BULK_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        productDelete: payload
      });
    }

    case actions.ActionTypes.DO_PRODUCT_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
        productDelete: payload
      });
    }


    // <-------------GET QUESTION LIST--------------> //

    case actions.ActionTypes.GET_QUESTION_LIST: {
      return Object.assign({}, state, {
        questionListLoading: true,
        questionListLoaded: false,
        questionListFailed: false,
      });
    }

    case actions.ActionTypes.GET_QUESTION_LIST_SUCCESS: {
      return Object.assign({}, state, {
        questionList: payload.data.questionList,
        questionListLoading: false,
        questionListLoaded: true,
        questionListFailed: false,
      });
    }

    case actions.ActionTypes.GET_QUESTION_LIST_FAIL: {
      return Object.assign({}, state, {
        questionListLoading: false,
        questionListLoaded: false,
        questionListFailed: true,
      });
    }

    // <-------------ADD QUESTION--------------> //

    case actions.ActionTypes.ADD_QUESTION: {
      return Object.assign({}, state, {
        addQuestion: {},
        addQuestionLoading: false,
        addQuestionLoaded: false,
        addQuestionFailed: false,
      });
    }

    case actions.ActionTypes.ADD_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        addQuestion: payload,
        addQuestionLoading: false,
        addQuestionLoaded: false,
        addQuestionFailed: false,
      });
    }

    case actions.ActionTypes.ADD_QUESTION_FAIL: {
      return Object.assign({}, state, {
        addQuestion: {},
        addQuestionLoading: false,
        addQuestionLoaded: false,
        addQuestionFailed: false,
      });
    }

    // <-------------DELETE QUESTION--------------> //

    case actions.ActionTypes.DELETE_QUESTION: {
      return Object.assign({}, state, {
        deleteQuestion: {},
        deleteQuestionLoading: true,
        deleteQuestionLoaded: false,
        deleteQuestionFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_QUESTION_SUCCESS: {
      return Object.assign({}, state, {
        deleteQuestion: payload,
        deleteQuestionLoading: false,
        deleteQuestionLoaded: true,
        deleteQuestionFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_QUESTION_FAIL: {
      return Object.assign({}, state, {
        deleteQuestion: {},
        deleteQuestionLoading: false,
        deleteQuestionLoaded: false,
        deleteQuestionFailed: true,
      });
    }


    // <-------------CHANGE QUESTION STATUS--------------> //

    case actions.ActionTypes.CHANGE_QUESTION_STATUS: {
      return Object.assign({}, state, {
        changeQuestionStatus: {},
        changeQuestionStatusLoading: false,
        changeQuestionStatusLoaded: false,
        changeQuestionStatusFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_QUESTION_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        changeQuestionStatus: payload,
        changeQuestionStatusLoading: false,
        changeQuestionStatusLoaded: false,
        changeQuestionStatusFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_QUESTION_STATUS_FAIL: {
      return Object.assign({}, state, {
        changeQuestionStatus: {},
        changeQuestionStatusLoading: false,
        changeQuestionStatusLoaded: false,
        changeQuestionStatusFailed: false,
      });
    }


    // <-------------GET ANSWER LIST--------------> //

    case actions.ActionTypes.GET_ANSWER_LIST: {
      return Object.assign({}, state, {
        answerList: [],
        answerListLoading: true,
        answerListLoaded: false,
        answerListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ANSWER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        answerList: payload.data.answerList,
        answerListLoading: false,
        answerListLoaded: true,
        answerListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ANSWER_LIST_FAIL: {
      return Object.assign({}, state, {
        answerList: [],
        answerListLoading: false,
        answerListLoaded: false,
        answerListFailed: true,
      });
    }

    // <-------------UPDATE ANSWER--------------> //

    case actions.ActionTypes.UPDATE_ANSWER: {
      return Object.assign({}, state, {
        updateAnswer: {},
        updateAnswerLoading: true,
        updateAnswerLoaded: false,
        updateAnswerFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        updateAnswer: payload,
        updateAnswerLoading: false,
        updateAnswerLoaded: true,
        updateAnswerFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_ANSWER_FAIL: {
      return Object.assign({}, state, {
        updateAnswer: {},
        updateAnswerLoading: false,
        updateAnswerLoaded: false,
        updateAnswerFailed: true,
      });
    }

    // <-------------DELETE ANSWER--------------> //

    case actions.ActionTypes.DELETE_ANSWER: {
      return Object.assign({}, state, {
        deleteAnswer: {},
        deleteAnswerLoading: true,
        deleteAnswerLoaded: false,
        deleteAnswerFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        deleteAnswer: payload,
        deleteAnswerLoading: false,
        deleteAnswerLoaded: true,
        deleteAnswerFailed: false,
      });
    }

    case actions.ActionTypes.DELETE_ANSWER_FAIL: {
      return Object.assign({}, state, {
        deleteAnswer: {},
        deleteAnswerLoading: false,
        deleteAnswerLoaded: false,
        deleteAnswerFailed: true,
      });
    }

    // <-------------CHANGE ANSWER STATUS--------------> //

    case actions.ActionTypes.CHANGE_ANSWER_STATUS: {
      return Object.assign({}, state, {
        changeAnswerStatus: {},
        changeAnswerStatusLoading: false,
        changeAnswerStatusLoaded: false,
        changeAnswerStatusFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_ANSWER_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        changeAnswerStatus: payload,
        changeAnswerStatusLoading: false,
        changeAnswerStatusLoaded: false,
        changeAnswerStatusFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_ANSWER_STATUS_FAIL: {
      return Object.assign({}, state, {
        changeAnswerStatus: {},
        changeAnswerStatusLoading: false,
        changeAnswerStatusLoaded: false,
        changeAnswerStatusFailed: false,
      });
    }

    // <-------------CLEAR QUESTION RELATED STATE VARIABLE--------------> //

    case actions.ActionTypes.CLEAR_VARIABLE: {
      return Object.assign({}, state, {
        deleteQuestion: {},
        addQuestion: {},
        changeQuestionStatus: {},
      });
    }

    // <-------------ADD ANSWER--------------> //

    case actions.ActionTypes.ADD_ANSWER: {
      return Object.assign({}, state, {
        addAnswer: {},
        addAnswerLoading: true,
        addAnswerLoaded: false,
        addAnswerFailed: false,
      });
    }

    case actions.ActionTypes.ADD_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        addAnswer: payload,
        addAnswerLoading: false,
        addAnswerLoaded: true,
        addAnswerFailed: false,
      });
    }

    case actions.ActionTypes.ADD_ANSWER_FAIL: {
      return Object.assign({}, state, {
        addAnswer: {},
        addAnswerLoading: false,
        addAnswerLoaded: false,
        addAnswerFailed: true,
      });
    }


    // <-------------MAKE ANSWER AS DEFAULT--------------> //

    case actions.ActionTypes.MAKE_DEFAULT_ANSWER: {
      return Object.assign({}, state, {
        defaultAnswer: {},
        defaultAnswerLoading: true,
        defaultAnswerLoaded: false,
        defaultAnswerFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_DEFAULT_ANSWER_SUCCESS: {
      return Object.assign({}, state, {
        defaultAnswer: payload,
        defaultAnswerLoading: false,
        defaultAnswerLoaded: true,
        defaultAnswerFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_DEFAULT_ANSWER_FAIL: {
      return Object.assign({}, state, {
        defaultAnswer: {},
        defaultAnswerLoading: false,
        defaultAnswerLoaded: false,
        defaultAnswerFailed: true,
      });
    }

    // <-------------MANUFACTURER LIST--------------> //

    case actions.ActionTypes.GET_MANUFACTURER_LIST: {
      return Object.assign({}, state, {
        manufacturerList: [],
        manufacturerListLoading: true,
        manufacturerListLoaded: false,
        manufacturerListFailed: false,
      });
    }

    case actions.ActionTypes.GET_MANUFACTURER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        manufacturerList: payload.data,
        manufacturerListLoading: false,
        manufacturerListLoaded: true,
        manufacturerListFailed: false,
      });
    }

    case actions.ActionTypes.GET_MANUFACTURER_LIST_FAIL: {
      return Object.assign({}, state, {
        manufacturerList: [],
        manufacturerListLoading: false,
        manufacturerListLoaded: false,
        manufacturerListFailed: true,
      });
    }


    // <-------------VIDEO UPLOAD--------------> //

    case actions.ActionTypes.VIDEO_UPLOAD: {
      return Object.assign({}, state, {
        videoUpload: [],
        videoUploadLoading: true,
        videoUploadLoaded: false,
        videoUploadFailed: false,
      });
    }

    case actions.ActionTypes.VIDEO_UPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        videoUpload: payload,
        videoUploadLoading: false,
        videoUploadLoaded: true,
        videoUploadFailed: false,
      });
    }

    case actions.ActionTypes.VIDEO_UPLOAD_FAIL: {
      return Object.assign({}, state, {
        videoUpload: [],
        videoUploadLoading: false,
        videoUploadLoaded: false,
        videoUploadFailed: true,
      });
    }


    // <-------------VIDEO PREVIEW--------------> //

    case actions.ActionTypes.VIDEO_PREVIEW: {
      return Object.assign({}, state, {
        videoPreview: [],
        videoPreviewLoading: true,
        videoPreviewLoaded: false,
        videoPreviewFailed: false,
      });
    }

    case actions.ActionTypes.VIDEO_PREVIEW_SUCCESS: {
      return Object.assign({}, state, {
        videoPreview: payload.data,
        videoPreviewLoading: false,
        videoPreviewLoaded: true,
        videoPreviewFailed: false,
      });
    }

    case actions.ActionTypes.VIDEO_PREVIEW_FAIL: {
      return Object.assign({}, state, {
        videoPreview: [],
        videoPreviewLoading: false,
        videoPreviewLoaded: false,
        videoPreviewFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}

// product list action
export const getProductList = (state: ProductState) => state.productList;
export const getProductListLoading = (state: ProductState) => state.listLoading;
export const getProductListLoaded = (state: ProductState) => state.listLoaded;
export const getProductListFailed = (state: ProductState) => state.listFailed;

// product count action
export const getProductCount = (state: ProductState) => state.productCount;
export const getProductCountLoading = (state: ProductState) =>
  state.countLoading;
export const getProductCountLoaded = (state: ProductState) => state.countLoaded;
export const getProductCountFailed = (state: ProductState) => state.countFailed;

// product delete action
export const getProductDelete = (state: ProductState) => state.productDelete;
export const getProductDeleteLoading = (state: ProductState) =>
  state.deleteLoading;
export const getProductDeleteLoaded = (state: ProductState) =>
  state.deleteLoaded;
export const getProductDeleteFailed = (state: ProductState) =>
  state.deleteFailed;

// product add action
export const getProductAdd = (state: ProductState) => state.productAdded;
export const getProductAddDetail = (state: ProductState) =>
  state.addProductDetail;
export const getProductAddLoading = (state: ProductState) => state.addLoading;
export const getProductAddLoaded = (state: ProductState) => state.addLoaded;
export const getProductAddFailed = (state: ProductState) => state.addFailed;

// product update action
export const getProductUpdate = (state: ProductState) => state.productUpdate;
export const getProductUpdateLoading = (state: ProductState) =>
  state.updateLoading;
export const getProductUpdateLoaded = (state: ProductState) =>
  state.updateLoaded;
export const getProductUpdateFailed = (state: ProductState) =>
  state.updateFailed;

// product detail action
export const getProductDetail = (state: ProductState) => state.productDetail;
export const getProducDetailLoading = (state: ProductState) =>
  state.detailLoading;
export const getProductDetailLoaded = (state: ProductState) =>
  state.detailLoaded;
export const getProductDetailFailed = (state: ProductState) =>
  state.detailFailed;

// product remove List action
export const getProductRemoveListResponse = (state: ProductState) =>
  state.productRemoveListResponse;
export const getProductRemoveListRequestLoading = (state: ProductState) =>
  state.productRemoveListRequestLoading;
export const getProductRemoveListRequestLoaded = (state: ProductState) =>
  state.productRemoveListRequestLoaded;
export const getProductRemoveListRequestFailed = (state: ProductState) =>
  state.productRemoveListRequestFailed;

// product add List action
export const getProductAddListResponse = (state: ProductState) =>
  state.productAddListResponse;
export const getProductAddListRequestLoading = (state: ProductState) =>
  state.productAddListRequestLoading;
export const getProductAddListRequestLoaded = (state: ProductState) =>
  state.productAddListRequestLoaded;
export const getProductAddListRequestFailed = (state: ProductState) =>
  state.productAddListRequestFailed;

// option list action
export const optionList = (state: ProductState) => state.optionList;
export const optionListLoading = (state: ProductState) =>
  state.optionListLoading;
export const optionListLoaded = (state: ProductState) => state.optionListLoaded;
export const optionListFailed = (state: ProductState) => state.optionListFailed;

// getting option list
export const gettingOptionList = (state: ProductState) =>
  state.gettingoptionList;
export const gettingOptionListLoading = (state: ProductState) =>
  state.gettingOptionLoading;
export const gettingOptionListLoaded = (state: ProductState) =>
  state.gettingOptionLoaded;
export const gettingOptionListFailed = (state: ProductState) =>
  state.gettingOptionFailed;

// get Rating list
export const getRatingList = (state: ProductState) => state.getRatingList;

// product Bulk Delete

export const getProductBulkDelete = (state: ProductState) =>
  state.productBulkDelete;

// add question

export const addQuestion = (state: ProductState) =>
  state.addQuestion;
export const addQuestionLoading = (state: ProductState) =>
  state.addQuestionLoading;
export const addQuestionLoaded = (state: ProductState) =>
  state.addQuestionLoaded;
export const addQuestionFailed = (state: ProductState) =>
  state.addQuestionFailed;


// getting question list

export const questionList = (state: ProductState) =>
  state.questionList;
export const questionListLoading = (state: ProductState) =>
  state.questionListLoading;
export const questionListLoaded = (state: ProductState) =>
  state.questionListLoaded;
export const questionListFailed = (state: ProductState) =>
  state.questionListFailed;

// delete question list

export const deleteQuestion = (state: ProductState) =>
  state.deleteQuestion;
export const deleteQuestionLoading = (state: ProductState) =>
  state.deleteQuestionLoading;
export const deleteQuestionLoaded = (state: ProductState) =>
  state.deleteQuestionLoaded;
export const deleteQuestionFailed = (state: ProductState) =>
  state.deleteQuestionFailed;

// change question status

export const changeQuestionStatus = (state: ProductState) =>
  state.changeQuestionStatus;
export const changeQuestionStatusLoading = (state: ProductState) =>
  state.changeQuestionStatusLoading;
export const changeQuestionStatusLoaded = (state: ProductState) =>
  state.changeQuestionStatusLoaded;
export const changeQuestionStatusFailed = (state: ProductState) =>
  state.changeQuestionStatusFailed;

// get answer list

export const answerList = (state: ProductState) =>
  state.answerList;
export const answerListLoading = (state: ProductState) =>
  state.answerListLoading;
export const answerListLoaded = (state: ProductState) =>
  state.answerListLoaded;
export const answerListFailed = (state: ProductState) =>
  state.answerListFailed;

// answer update

export const updateAnswer = (state: ProductState) =>
  state.updateAnswer;
export const updateAnswerLoading = (state: ProductState) =>
  state.updateAnswerLoading;
export const updateAnswerLoaded = (state: ProductState) =>
  state.updateAnswerLoaded;
export const updateAnswerFailed = (state: ProductState) =>
  state.updateAnswerFailed;

// delete answer

export const deleteAnswer = (state: ProductState) =>
  state.deleteAnswer;
export const deleteAnswerLoading = (state: ProductState) =>
  state.deleteAnswerLoading;
export const deleteAnswerLoaded = (state: ProductState) =>
  state.deleteAnswerLoaded;
export const deleteAnswerFailed = (state: ProductState) =>
  state.deleteAnswerFailed;


// change answer status

export const changeAnswerStatus = (state: ProductState) =>
  state.changeAnswerStatus;
export const changeAnswerStatusLoading = (state: ProductState) =>
  state.changeAnswerStatusLoading;
export const changeAnswerStatusLoaded = (state: ProductState) =>
  state.changeAnswerStatusLoaded;
export const changeAnswerStatusFailed = (state: ProductState) =>
  state.changeAnswerStatusFailed;

// answer add

export const addAnswer = (state: ProductState) =>
  state.addAnswer;
export const addAnswerLoading = (state: ProductState) =>
  state.addAnswerLoading;
export const addAnswerLoaded = (state: ProductState) =>
  state.addAnswerLoaded;
export const addAnswerFailed = (state: ProductState) =>
  state.addAnswerFailed;

// answer default

export const defaultAnswer = (state: ProductState) =>
  state.defaultAnswer;
export const defaultAnswerLoading = (state: ProductState) =>
  state.defaultAnswerLoading;
export const defaultAnswerLoaded = (state: ProductState) =>
  state.defaultAnswerLoaded;
export const defaultAnswerFailed = (state: ProductState) =>
  state.defaultAnswerFailed;

// manufacturer list

export const manufacturerList = (state: ProductState) =>
  state.manufacturerList;
export const manufacturerListLoading = (state: ProductState) =>
  state.manufacturerListLoading;
export const manufacturerListLoaded = (state: ProductState) =>
  state.manufacturerListLoaded;

export const skuArrayList = (state: ProductState) =>
  state.skuArrayList;


// video upload action
export const videoUpload = (state: ProductState) => state.videoUpload;
export const videoUploadLoading = (state: ProductState) => state.videoUploadLoading;
export const videoUploadLoaded = (state: ProductState) => state.videoUploadLoaded;
export const videoUploadFailed = (state: ProductState) => state.videoUploadFailed;

// video preview action
export const videoPreview = (state: ProductState) => state.videoPreview;
export const videoPreviewLoading = (state: ProductState) => state.videoPreviewLoading;
export const videoPreviewLoaded = (state: ProductState) => state.videoPreviewLoaded;
export const videoPreviewFailed = (state: ProductState) => state.videoPreviewFailed;


// export const deleteProbabilityOption = (state: ProductState) => state.deleteProbabilityOption;


export const deleteProbabilityOption = (state: ProductState) => state.deleteProbabilityOption;
export const deleteProbabilityOptionLoading = (state: ProductState) => state.deleteProbabilityOptionLoading;
export const deleteProbabilityOptionLoaded = (state: ProductState) => state.deleteProbabilityOptionLoaded;
export const deleteProbabilityOptionFailed = (state: ProductState) => state.deleteProbabilityOptionFailed;