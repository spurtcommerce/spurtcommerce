/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as mediaActions from './action/media.action';
// selectors
import {
  getbucketDeleteFile,
  getbucketDeleteFolder,
  getBucketListData,
  getMediaCreatefolder,
  getMediaUploaddata,
  getmediauploadResponse,
  getmediauploadRequestLoaded,
  getmediauploadRequestFailed,
  getbucketlistRequestFailed,
  getdeletefolderResponse,
  getdeletefolderRequestLoading,
  getdeletefolderRequestLoaded,
  getdeletefolderRequestFailed,
  getbucketlistResponse,
  getbucketlistRequestLoading,
  getbucketlistRequestLoaded,
  getSearchFolder,
  getSearchFolderResponse,
  getSearchFolderRequestLoading,
  getSearchFolderRequestLoaded,
  getSearchFolderRequestFailed
} from './reducer/mediaselectors';
// model
import { MediauploadForm } from './models/mediaupload.model';
import { MediacreatefolderForm } from './models/mediacreatefolder.model';
import { BucketdeletefileForm } from './models/bucketdeletefile.model';
import { BucketdeletefolderForm } from './models/bucketdeletefolder.model';
import { BucketlistForm } from './models/bucketlist.model';
import { getmediauploadRequestLoading } from './reducer/media.reducer';
import { getmediauploadRequestLoadings } from './reducer/mediaselectors';
import { SearchfolderForm } from './models/searchfolder.model';

@Injectable()
export class MediaSandbox {
  public getBucketListData$ = this.appState.select(getBucketListData);
  public getBucketDeleteFile$ = this.appState.select(getbucketDeleteFile);
  public getBucketDeleteFolder$ = this.appState.select(getbucketDeleteFolder);
  public getMediaUpload$ = this.appState.select(getMediaUploaddata);
  public getMediaCreatefold$ = this.appState.select(getMediaCreatefolder);

  public getmediauploadResponse$ = this.appState.select(getmediauploadResponse);
  public getmediauploadRequestLoading$ = this.appState.select(
    getmediauploadRequestLoadings
  );
  public getMediaCregetmediauploadRequestLoadedatefold$ = this.appState.select(
    getmediauploadRequestLoaded
  );
  public getmediauploadRequestFailed$ = this.appState.select(
    getmediauploadRequestFailed
  );

  public getdeletefolderResponse$ = this.appState.select(
    getdeletefolderResponse
  );
  public getdeletefolderRequestLoading$ = this.appState.select(
    getdeletefolderRequestLoading
  );
  public getdeletefolderRequestLoaded$ = this.appState.select(
    getdeletefolderRequestLoaded
  );
  public getdeletefolderRequestFailed$ = this.appState.select(
    getdeletefolderRequestFailed
  );

  public getbucketlistResponse$ = this.appState.select(getbucketlistResponse);
  public getbucketlistRequestLoading$ = this.appState.select(
    getbucketlistRequestLoading
  );
  public getbucketlistRequestLoaded$ = this.appState.select(
    getbucketlistRequestLoaded
  );
  public getbucketlistRequestFailed$ = this.appState.select(
    getbucketlistRequestFailed
  );

  public getSearchFolder$ = this.appState.select(getSearchFolder);
  public getSearchFolderResponse$ = this.appState.select(
    getSearchFolderResponse
  );
  public getSearchFolderRequestLoading$ = this.appState.select(
    getSearchFolderRequestLoading
  );
  public getSearchFolderRequestLoaded$ = this.appState.select(
    getSearchFolderRequestLoaded
  );
  public getSearchFolderRequestFailed$ = this.appState.select(
    getSearchFolderRequestFailed
  );

  constructor(protected appState: Store<store.AppState>) {}

  public getbuckupload(data) {
    this.appState.dispatch(
      new mediaActions.DoMediaUploadAction(new MediauploadForm(data))
    );
  }

  public getbuckcreatefolder(data) {
    this.appState.dispatch(
      new mediaActions.DoMediaCreatefolderAction(
        new MediacreatefolderForm(data)
      )
    );
  }

  public bucketListApi(value) {
    this.appState.dispatch(
      new mediaActions.DoBucketlistAction(new BucketlistForm(value))
    );
  }

  public deleteFile(value) {
    this.appState.dispatch(
      new mediaActions.DoDeletefileAction(new BucketdeletefileForm(value))
    );
  }

  public deleteFolderApi(value) {
    this.appState.dispatch(
      new mediaActions.DoDeletefolderAction(new BucketdeletefolderForm(value))
    );
  }

  public searchFolders(value) {
    this.appState.dispatch(
      new mediaActions.DoSearchfolderAction(new SearchfolderForm(value))
    );
  }
}
