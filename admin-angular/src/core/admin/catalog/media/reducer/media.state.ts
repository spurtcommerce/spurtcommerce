/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

  commonPrefixes: [],
  contents: []
});
