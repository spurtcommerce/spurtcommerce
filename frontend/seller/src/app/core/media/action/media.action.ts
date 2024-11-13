/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// store
import {type} from '../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
// model
import { MediauploadForm } from '../models/mediaupload.model';
import { MediacreatefolderForm } from '../models/mediacreatefolder.model';
import { BucketdeletefolderForm } from '../models/bucketdeletefolder.model';
import { BucketdeletefileForm } from '../models/bucketdeletefile.model';
import { BucketlistForm } from '../models/bucketlist.model';
import { SearchfolderForm } from '../models/searchfolder.model';

export const ActionTypes = {
  // Mediada upload
  DO_MEDIAUPLOAD: type('[Media] Do Mediaupload'),
  DO_MEDIAUPLOAD_SUCCESS: type('[Media] Do Mediaupload Success'),
  DO_MEDIAUPLOAD_FAIL: type('[Media] Do Mediaupload Fail'),
  // media create folder
  DO_MEDIACREATEFOLDER: type('[Media] Do Mediacreatefolder'),
  DO_MEDIACREATEFOLDER_SUCCESS: type('[Media] Do Mediacreatefolder Success'),
  DO_MEDIACREATEFOLDER_FAIL: type('[Media] Do Mediacreatefolder Fail'),

  DO_DELETEFILE: type('[Delete] Do Deletefile'),
  DO_DELETEFILE_SUCCESS: type('[Delete] Do Deletefile Success'),
  DO_DELETEFILE_FAIL: type('[Delete] Do Deletefile Fail'),
  DO_DELETEFOLDER: type('[Delete] Do Deletefolder'),
  DO_DELETEFOLDER_SUCCESS: type('[Delete] Do Deletefolder Success'),
  DO_DELETEFOLDER_FAIL: type('[Delete] Do Deletefolder Fail'),

  DO_BUCKETLIST: type('[List] Do Bucklist'),
  DO_BUCKETLIST_SUCCESS: type('[List] Do Bucklist Success'),
  DO_BUCKETLIST_FAIL: type('[List] Do Bucklist Fail'),

  DO_SEARCHFOLDER: type('[search] Do Searchfolder'),
  DO_SEARCHFOLDER_SUCCESS: type('[search] Do Searchfolder Success'),
  DO_SEARCHFOLDER_FAIL: type('[search] Do Searchfolder Fail')
};

// MEDIA UPLOAD
export class DoMediaUploadAction implements Action {
  type = ActionTypes.DO_MEDIAUPLOAD;

  constructor(public payload: MediauploadForm) {}
}

export class DoMediaUploadSuccessAction implements Action {
  type = ActionTypes.DO_MEDIAUPLOAD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoMediaUploadFailAction implements Action {
  type = ActionTypes.DO_MEDIAUPLOAD_FAIL;

  constructor(public payload: any = null) {}
}

// MEDIA CREATE FOLDER
export class DoMediaCreatefolderAction implements Action {
  type = ActionTypes.DO_MEDIACREATEFOLDER;

  constructor(public payload: MediacreatefolderForm) {}
}

export class DoMediaCreatefolderSuccessAction implements Action {
  type = ActionTypes.DO_MEDIACREATEFOLDER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoMediaCreatefolderFailAction implements Action {
  type = ActionTypes.DO_MEDIACREATEFOLDER_FAIL;

  constructor(public payload: any = null) {}
}

// BUCKLIST

export class DoBucketlistAction implements Action {
  type = ActionTypes.DO_BUCKETLIST;

  constructor(public payload: BucketlistForm) {}
}

export class DoBucketlistSuccessAction implements Action {
  type = ActionTypes.DO_BUCKETLIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoBucketlistFailAction implements Action {
  type = ActionTypes.DO_BUCKETLIST_FAIL;

  constructor(public payload: any = null) {}
}

// BUCKLIST DELETE FILE

export class DoDeletefileAction implements Action {
  type = ActionTypes.DO_DELETEFILE;

  constructor(public payload: BucketdeletefileForm) {}
}

export class DoDeletefileSuccessAction implements Action {
  type = ActionTypes.DO_DELETEFILE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeletefileFailAction implements Action {
  type = ActionTypes.DO_DELETEFILE_FAIL;

  constructor(public payload: any = null) {}
}

// BUCKLIST DELETE FOLDER

export class DoDeletefolderAction implements Action {
  type = ActionTypes.DO_DELETEFOLDER;

  constructor(public payload: BucketdeletefolderForm) {}
}

export class DoDeletefolderSuccessAction implements Action {
  type = ActionTypes.DO_DELETEFOLDER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeletefolderFailAction implements Action {
  type = ActionTypes.DO_DELETEFOLDER_FAIL;

  constructor(public payload: any = null) {}
}

// SEARCH FOLDER

export class DoSearchfolderAction implements Action {
  type = ActionTypes.DO_SEARCHFOLDER;

  constructor(public payload: SearchfolderForm) {}
}

export class DoSearchfolderSuccessAction implements Action {
  type = ActionTypes.DO_SEARCHFOLDER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoSearchfolderFailAction implements Action {
  type = ActionTypes.DO_SEARCHFOLDER_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoMediaUploadAction
  | DoMediaUploadSuccessAction
  | DoMediaUploadFailAction
  | DoMediaCreatefolderAction
  | DoMediaCreatefolderSuccessAction
  | DoMediaCreatefolderFailAction
  | DoBucketlistAction
  | DoBucketlistSuccessAction
  | DoBucketlistFailAction
  | DoDeletefolderAction
  | DoDeletefolderSuccessAction
  | DoDeletefolderFailAction
  | DoDeletefileAction
  | DoDeletefileSuccessAction
  | DoSearchfolderAction
  | DoSearchfolderSuccessAction
  | DoSearchfolderFailAction
  | DoDeletefileFailAction;
