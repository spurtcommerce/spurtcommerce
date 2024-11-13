/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface PageGroupState extends Map<string, any> {
  pageGroupList: any;
  pageGroupListCount: any;
  addPagesStatus: any;
  updatePages: any;
  pageGroupDelete: any;
  pageGroupListLoading: boolean;
  pageGroupListLoaded: boolean;
  pageGroupListFailed: boolean;
  pageGroupAddLoading: boolean;
  addPages: {};
  pageGroupAddLoaded: boolean;
  pageGroupAddFailed: boolean;
  pageGroupUpdateLoading: boolean;
  pageGroupUpdateLoaded: boolean;
  pageGroupUpdateFailed: boolean;
  pageGroupDeleteLoading: boolean;
  pageGroupDeleteLoaded: boolean;
  pageGroupDeleteFailed: boolean;
  pageGroupCount: any;
  pageGroupCountLoading: boolean;
  pageGroupCountLoaded: boolean;
  pageGroupCountFailed: boolean;
  pageActiveCount: number;
  pageInactiveCount: number;

  pageCountFailed: boolean;
  pageCountLoading: boolean;
  pageCountLoaded: boolean;
  pageCount: any;

  pageDetailsFailed: boolean;
  pageDetailsLoading: boolean;
  pageDetailsLoaded: boolean;
  pageDetails: any;

  // Page Group Localization List
  pageGroupLocalizationList: any;
  pageGroupLocalizationListLoaded: boolean;
  pageGroupLocalizationListLoading: boolean;
  pageGroupLocalizationListFailed: boolean;

  // Page Group Localization Count
  pageGroupLocalizationCount: any;
  pageGroupLocalizationCountLoaded: boolean;
  pageGroupLocalizationCountLoading: boolean;
  pageGroupLocalizationCountFailed: boolean;

  // Page Group Localization Detail
  pageGroupLocalizationDetail: any;
  pageGroupLocalizationDetailLoaded: boolean;
  pageGroupLocalizationDetailLoading: boolean;
  pageGroupLocalizationDetailFailed: boolean;

  // Page Group Localization Create
  pageGroupLocalizationCreate: any;
  pageGroupLocalizationCreateLoaded: boolean;
  pageGroupLocalizationCreateLoading: boolean;
  pageGroupLocalizationCreateFailed: boolean;
}

export const PageGroupStateRecord = Record({
  pageGroupList: {},
  pageGroupListCount: {},
  addPages: {},
  addPagesStatus: {},
  pageGroupDelete: {},
  updatePages: {},
  pageGroupListLoading: false,
  pageGroupListLoaded: false,
  pageGroupListFailed: false,
  pageGroupAddLoading: false,
  pageGroupAddLoaded: false,
  pageGroupAddFailed: false,
  pageGroupUpdateLoading: false,
  pageGroupUpdateLoaded: false,
  pageGroupUpdateFailed: false,
  pageGroupDeleteLoading: false,
  pageGroupDeleteLoaded: false,
  pageGroupDeleteFailed: false,
  pageActiveCount: 0,
  pageInactiveCount: 0,

  pageCountFailed: false,
  pageCountLoading: false,
  pageCountLoaded: false,
  pageCount: {},

  pageDetailsFailed: false,
  pageDetailsLoading: false,
  pageDetailsLoaded: false,
  pageDetails: {},

  pageGroupCountLoading: false,
  pageGroupCountLoaded: false,
  pageGroupCountFailed: false,
  pageGroupCount: {},

  // Page Group Localization List
  pageGroupLocalizationList: [],
  pageGroupLocalizationListLoaded: false,
  pageGroupLocalizationListLoading: false,
  pageGroupLocalizationListFailed: false,

  // Page Group Localization Count
  pageGroupLocalizationCount: [],
  pageGroupLocalizationCountLoaded: false,
  pageGroupLocalizationCountLoading: false,
  pageGroupLocalizationCountFailed: false,

  // Page Group Localization Detail
  pageGroupLocalizationDetail: [],
  pageGroupLocalizationDetailLoaded: false,
  pageGroupLocalizationDetailLoading: false,
  pageGroupLocalizationDetailFailed: false,

  // Page Group Localization Create
  pageGroupLocalizationCreate: [],
  pageGroupLocalizationCreateLoaded: false,
  pageGroupLocalizationCreateLoading: false,
  pageGroupLocalizationCreateFailed: false,
});
