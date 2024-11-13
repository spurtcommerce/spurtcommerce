/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface Media extends Map<string, any> {
  mediaupload: any;
  mediaCreatefolder: any;
  bucketdeletefile: any;
  bucketdeletefolder: any;
  bucketlist: any;
  commonPrefixes: any;
  contents: any;

  mediauploadResponse: any;
  mediauploadRequestLoading: any;
  mediauploadRequestLoaded: any;
  mediauploadRequestFailed: any;

  deletefolderResponse: any;
  deletefolderRequestLoading: any;
  deletefolderRequestLoaded: any;
  deletefolderRequestFailed: any;

  bucketlistResponse: any;
  bucketlistRequestLoading: any;
  bucketlistRequestLoaded: any;
  bucketlistRequestFailed: any;

  searchFolder: any;
  searchFolderResponse: any;
  searchFolderRequestLoading: any;
  searchFolderRequestLoaded: any;
  searchFolderRequestFailed: any;

  bulkImageUpload: any;
  bulkImageUploadLoading: any;
  bulkImageUploadLoaded: any;
  bulkImageUploadFailed: any;

  bulkImageDelete: any;
  bulkImageDeleteLoading: any;
  bulkImageDeleteLoaded: any;
  bulkImageDeleteFailed: any;

  
}

export const MediaStateRecord = Record({
  mediaupload: {},
  bucketdeletefolder: {},
  bucketdeletefile: {},
  buckdelfolder: {},
  bucketlist: {},

  mediauploadResponse: {},
  mediauploadRequestLoading: {},
  mediauploadRequestLoaded: {},
  mediauploadRequestFailed: {},

  deletefolderResponse: {},
  deletefolderRequestLoading: {},
  deletefolderRequestLoaded: {},
  deletefolderRequestFailed: {},

  bucketlistResponse: {},
  bucketlistRequestLoading: {},
  bucketlistRequestLoaded: {},
  bucketlistRequestFailed: {},

  searchFolder: {},
  searchFolderResponse: {},
  searchFolderRequestLoading: {},
  searchFolderRequestLoaded: {},
  searchFolderRequestFailed: {},

  bulkImageUpload: {},
  bulkImageUploadLoading: {},
  bulkImageUploadLoaded: {},
  bulkImageUploadFailed: {},

  bulkImageDelete: {},
  bulkImageDeleteLoading: {},
  bulkImageDeleteLoaded: {},
  bulkImageDeleteFailed: {},


  commonPrefixes: [],
  contents: []
});
