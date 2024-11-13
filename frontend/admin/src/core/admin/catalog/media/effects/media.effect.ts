/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// effects
import { createEffect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../action/media.action';
import { catchError } from 'rxjs/operators';
// service
import { MediaService } from '../media.service';

@Injectable()
export class MediaEffects {
  constructor(private action$: Actions, private apiCli: MediaService) {}

  // MEDIA UPLOAD
  
  domediaupload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_MEDIAUPLOAD),
    map((action: actions.DoMediaUploadAction) => action.payload),
    switchMap(state => {
      return this.apiCli.document(state).pipe(
        switchMap(user => [new actions.DoMediaUploadSuccessAction(user)]),
        catchError(error => of(new actions.DoMediaUploadFailAction(error)))
      );
    })
  ));

  // MEDIA CREATE FOLDER

  
  domediafolder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_MEDIACREATEFOLDER),
    map((action: actions.DoMediaCreatefolderAction) => action.payload),
    switchMap(state => {
      return this.apiCli.CreateFolder(state).pipe(
        switchMap(user => [new actions.DoMediaCreatefolderSuccessAction(user)]),
        catchError(error =>
          of(new actions.DoMediaCreatefolderFailAction(error))
        )
      );
    })
  ));

  
  dobuckdelfile$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETEFILE),
    map((action: actions.DoDeletefileAction) => action.payload),
    switchMap(state => {
      return this.apiCli.deleteImage(state).pipe(
        switchMap(user => [new actions.DoDeletefileSuccessAction(user)]),
        catchError(error => of(new actions.DoDeletefileFailAction(error)))
      );
    })
  ));
  // buck del folder

  
  dobuckdelfolder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETEFOLDER),
    map((action: actions.DoDeletefolderAction) => action.payload),
    switchMap(state => {
      return this.apiCli.deleteFolder(state).pipe(
        switchMap(user => [new actions.DoDeletefolderSuccessAction(user)]),
        catchError(error => of(new actions.DoDeletefolderFailAction(error)))
      );
    })
  ));

  // BUCKETLIST
  
  dobucklists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BUCKETLIST),
    map((action: actions.DoBucketlistAction) => action.payload),
    switchMap(state => {
      return this.apiCli.bucketLists(state).pipe(
        switchMap(user => [new actions.DoBucketlistSuccessAction(user)]),
        catchError(error => of(new actions.DoBucketlistFailAction(error)))
      );
    })
  ));

  // SEARCH FOLDER
  
  dosearchFolder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_SEARCHFOLDER),
    map((action: actions.DoSearchfolderAction) => action.payload),
    switchMap(state => {
      return this.apiCli.searchFolder(state).pipe(
        switchMap(user => [new actions.DoSearchfolderSuccessAction(user)]),
        catchError(error => of(new actions.DoSearchfolderFailAction(error)))
      );
    })
  ));

  // BULK IMAGE UPLOAD
  
  bulkImageUpload$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.BULK_IMAGE_UPLOAD),
    map((action: actions.BulkImageUploadAction) => action.payload),
    switchMap(state => {
      return this.apiCli.bulkImageUpload(state).pipe(
        switchMap(user => [new actions.BulkImageUploadSuccessAction(user)]),
        catchError(error => of(new actions.BulkImageUploadFailAction(error)))
      );
    })
  ));

    // BULK IMAGE DELETE
    
    bulkImageDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.BULK_IMAGE_DELETE),
      map((action: actions.BulkDeleteImageAction) => action.payload),
      switchMap(state => {
        return this.apiCli.bulkImageDelete(state).pipe(
          switchMap(user => [new actions.BulkDeleteImageSuccessAction(user)]),
          catchError(error => of(new actions.BulkImageUploadFailAction(error)))
        );
      })
    ));
}
