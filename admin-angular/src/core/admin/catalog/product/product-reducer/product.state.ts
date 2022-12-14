/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';
import { ProductListResponseModel } from '../product-model/product-list-response.model';
import { ProductAddResponseModel } from '../product-model/product-add-response.model';
import { DetailResponseModel } from '../product-model/detail-response.model';

export interface ProductState extends Map<string, any> {
  productList: ProductListResponseModel;
  productCount: any;
  productDelete: any;
  productAdded: any;
  addProductDetail: ProductAddResponseModel;
  productUpdate: any;
  productDetail: DetailResponseModel;
  optionList: any;
  gettingoptionList: any;
  getRatingList: any;
  ratingStatus: any;
  productBulkDelete: any;

  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updatLoading: boolean;
  updatLoaded: boolean;
  updatFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  optionListLoading: boolean;
  optionListLoaded: boolean;
  optionListFailed: boolean;

  gettingOptionLoading: boolean;
  gettingOptionLoaded: boolean;
  gettingOptionFailed: boolean;

  productRemoveListResponse: boolean;
  productRemoveListRequestLoading: boolean;
  productRemoveListRequestLoaded: boolean;
  productRemoveListRequestFailed: boolean;

  productAddListResponse: boolean;
  productAddListRequestLoading: boolean;
  productAddListRequestLoaded: boolean;
  productAddListRequestFailed: boolean;

  questionList: any;
  questionListLoading: boolean;
  questionListLoaded: boolean;
  questionListFailed: boolean;

  addQuestion: any;
  addQuestionLoading: boolean;
  addQuestionLoaded: boolean;
  addQuestionFailed: boolean;

  deleteQuestion: any;
  deleteQuestionLoading: boolean;
  deleteQuestionLoaded: boolean;
  deleteQuestionFailed: boolean;

  changeQuestionStatus: any;
  changeQuestionStatusLoading: boolean;
  changeQuestionStatusLoaded: boolean;
  changeQuestionStatusFailed: boolean;

  answerList: any;
  answerListLoading: boolean;
  answerListLoaded: boolean;
  answerListFailed: boolean;

  updateAnswer: any;
  updateAnswerLoading: boolean;
  updateAnswerLoaded: boolean;
  updateAnswerFailed: boolean;

  deleteAnswer: any;
  deleteAnswerLoading: boolean;
  deleteAnswerLoaded: boolean;
  deleteAnswerFailed: boolean;

  changeAnswerStatus: any;
  changeAnswerStatusLoading: boolean;
  changeAnswerStatusLoaded: boolean;
  changeAnswerStatusFailed: boolean;

  addAnswer: any;
  addAnswerLoading: boolean;
  addAnswerLoaded: boolean;
  addAnswerFailed: boolean;

  defaultAnswer: any;
  defaultAnswerLoading: boolean;
  defaultAnswerLoaded: boolean;
  defaultAnswerFailed: boolean;

  manufacturerList: any;
  manufacturerListLoading: boolean;
  manufacturerListLoaded: boolean;
  manufacturerListFailed: boolean;

  probabiltyOptions: any;
  originalProbabiltyArray: any;

  skuArrayList: any;

  videoUpload: any;
  videoUploadLoading: boolean;
  videoUploadLoaded: boolean;
  videoUploadFailed: boolean;

  videoPreview: any;
  videoPreviewLoading: boolean;
  videoPreviewLoaded: boolean;
  videoPreviewFailed: boolean;

  deleteProbabilityOption: any;
  deleteProbabilityOptionLoading: boolean;
  deleteProbabilityOptionLoaded: boolean;
  deleteProbabilityOptionFailed: boolean;

}

export const ProductStateRecord = Record({
  productlist: [],
  productCount: 0,
  productDelete: {},
  productAdded: {},
  productUpdate: {},
  productDetail: {},
  optionList: {},
  gettingoptionList: {},
  getRatingList: {},
  ratingStatus: {},
  productBulkDelete: {},

  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,

  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updatLoading: false,
  updatLoaded: false,
  updatFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  optionListLoading: false,
  optionListLoaded: false,
  optionListFailed: false,

  gettingOptionLoading: false,
  gettingOptionLoaded: false,
  gettingOptionFailed: false,

  productRemoveListResponse: false,
  productRemoveListRequestLoading: false,
  productRemoveListRequestLoaded: false,
  productRemoveListRequestFailed: false,

  productAddListResponse: false,
  productAddListRequestLoading: false,
  productAddListRequestLoaded: false,
  productAddListRequestFailed: false,

  questionList: [],
  questionListLoading: false,
  questionListLoaded: false,
  questionListFailed: false,

  deleteQuestion: {},
  deleteQuestionLoading: false,
  deleteQuestionLoaded: false,
  deleteQuestionFailed: false,

  changeQuestionStatus: {},
  changeQuestionStatusLoading: false,
  changeQuestionStatusLoaded: false,
  changeQuestionStatusFailed: false,

  answerList: [],
  answerListLoading: false,
  answerListLoaded: false,
  answerListFailed: false,

  updateAnswer: {},
  updateAnswerLoading: false,
  updateAnswerLoaded: false,
  updateAnswerFailed: false,

  deleteAnswer: {},
  deleteAnswerLoading: false,
  deleteAnswerLoaded: false,
  deleteAnswerFailed: false,

  changeAnswerStatus: {},
  changeAnswerStatusLoading: false,
  changeAnswerStatusLoaded: false,
  changeAnswerStatusFailed: false,

  addAnswer: {},
  addAnswerLoading: false,
  addAnswerLoaded: false,
  addAnswerFailed: false,

  defaultAnswer: {},
  defaultAnswerLoading: false,
  defaultAnswerLoaded: false,
  defaultAnswerFailed: false,

  manufacturerList: [],
  manufacturerListLoading: false,
  manufacturerListLoaded: false,
  manufacturerListFailed: false,

  probabiltyOptions: [],
  originalProbabiltyArray: [],

  skuArrayList: [],

  videoUpload: {},
  videoUploadLoading: false,
  videoUploadLoaded: false,
  videoUploadFailed: false,

  videoPreview: {},
  videoPreviewLoading: false,
  videoPreviewLoaded: false,
  videoPreviewFailed: false,

  deleteProbabilityOption:[],
  deleteProbabilityOptionLoading: false,
  deleteProbabilityOptionLoaded: false,
  deleteProbabilityOptionFailed: false,


});
