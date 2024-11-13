/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface vendorGroupState extends Map<string, any> {
  vendorGroup: any;
  vendorGroupLoading: boolean;
  vendorGroupLoaded: boolean;
  vendorGroupFailed: boolean;

  // industryList
  industryList: any;
  industryListLoading: boolean;
  industryListLoaded: boolean;
  industryListFailed: boolean;


  vendorGroupCount: any;
  vendorGroupCountLoading: boolean;
  vendorGroupCountLoaded: boolean;
  vendorGroupCountFailed: boolean;

  vendorGroupAdd: any;
  vendorGroupAddLoading: boolean;
  vendorGroupAddLoaded: boolean;
  vendorGroupAddFailed: boolean;

  vendorGroupDetail: any;
  vendorGroupDetailLoading: boolean;
  vendorGroupDetailLoaded: boolean;
  vendorGroupDetailFailed: boolean;

  vendorGroupDelete: any;
  vendorGroupDeleteLoading: boolean;
  vendorGroupDeleteLoaded: boolean;
  vendorGroupDeleteFailed: boolean;

  vendorGroupUpdate: any;
  vendorGroupUpdateLoading: boolean;
  vendorGroupUpdateLoaded: boolean;
  vendorGroupUpdateFailed: boolean;

  vendorGroupCounts: any;
  vendorGroupCountsLoading: boolean;
  vendorGroupCountsLoaded: boolean;
  vendorGroupCountsFailed: boolean;

}

export const vendorGroupRecord = Record({
  vendorGroup: [],
  vendorGroupLoading: false,
  vendorGroupLoaded: false,
  vendorGroupFailed: false,

    // industryList
    industryList: [],
    industryListLoading: false,
    industryListLoaded: false,
    industryListFailed: false,
  

  vendorGroupCount: [],
  vendorGroupCountLoading: false,
  vendorGroupCountLoaded: false,
  vendorGroupCountFailed: false,

  vendorGroupAdd: [],
  vendorGroupAddLoading: false,
  vendorGroupAddLoaded: false,
  vendorGroupAddFailed: false,

  vendorGroupDetail: [],
  vendorGroupDetailLoading: false,
  vendorGroupDetailLoaded: false,
  vendorGroupDetailFailed: false,

  vendorGroupDelete: [],
  vendorGroupDeleteLoading: false,
  vendorGroupDeleteLoaded: false,
  vendorGroupDeleteFailed: false,

  vendorGroupUpdate: [],
  vendorGroupUpdateLoading: false,
  vendorGroupUpdateLoaded: false,
  vendorGroupUpdateFailed: false,

  vendorGroupCounts: [],
  vendorGroupCountsLoading: false,
  vendorGroupCountsLoaded: false,
  vendorGroupCountsFailed: false,
});
