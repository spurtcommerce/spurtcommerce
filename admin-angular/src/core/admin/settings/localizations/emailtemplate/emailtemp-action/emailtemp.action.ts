/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { EmailTempForm } from '../emailtemp-model/emailtemp.model';
import { EmailTempListForm } from '../emailtemp-model/emailtemplist.model';

export const ActionTypes = {
  DO_NEW_EMAIL_TEMP_ACTION: type('[Settings email template] Do email template'),
  DO_NEW_EMAIL_TEMP_SUCCESS: type(
    '[Settings email template] Do email template Success'
  ),
  DO_NEW_EMAIL_TEMP_FAIL: type(
    '[Settings email template] Do email template Fail'
  ),
  DO_UPDATE_EMAIL_TEMP_ACTION: type(
    '[Settings email template] Do email templateCountry'
  ),
  DO_UPDATE_EMAIL_TEMP_SUCCESS: type(
    '[Settings email template] Do Updateemail template Success'
  ),
  DO_UPDATE_EMAIL_TEMP_FAIL: type(
    '[Settings email template] Do Updateemail template Fail'
  ),
  GET_EMAIL_TEMP_LIST_ACTION: type('[email template] Do email templatelist'),
  GET_EMAIL_TEMP_LIST_SUCCESS: type(
    '[email template] Do email templatelist Success'
  ),
  GET_EMAIL_TEMP_LIST_FAIL: type('[email template] Do email templatelist Fail'),
  GET_EMAIL_TEMP_COUNT_ACTION: type(
    '[email template Pagination] Do email template Paination '
  ),
  GET_EMAIL_TEMP_COUNT_SUCCESS: type(
    '[email template Pagination] Do email template Paination  Success'
  ),
  GET_EMAIL_TEMP_COUNT_FAIL: type(
    '[email template Pagination] Do email template Paination  Fail'
  ),
  DO_EMAIL_TEMP_DELETE: type('[Delete] Do email template Delete'),
  DO_EMAIL_TEMP_DELETE_SUCCESS: type('[Delete] Do email template Success'),
  DO_EMAIL_TEMP_DELETE_FAIL: type('[Delete] Do email template Delete Fail')
};

// ADD EmailTemp

export class DoNewEmailTempAction implements Action {
  type = ActionTypes.DO_NEW_EMAIL_TEMP_ACTION;

  constructor(public payload: EmailTempForm) {}
}

export class DoNewEmailTempSuccessAction implements Action {
  type = ActionTypes.DO_NEW_EMAIL_TEMP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewEmailTempFailAction implements Action {
  type = ActionTypes.DO_NEW_EMAIL_TEMP_FAIL;

  constructor(public payload: any = null) {}
}

// UPDATE EmailTemp

export class DoUpdateEmailTempAction implements Action {
  type = ActionTypes.DO_UPDATE_EMAIL_TEMP_ACTION;

  constructor(public payload: EmailTempForm) {}
}

export class DoUpdateEmailTempSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_EMAIL_TEMP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateEmailTempFailAction implements Action {
  type = ActionTypes.DO_UPDATE_EMAIL_TEMP_FAIL;

  constructor(public payload: any = null) {}
}

// EmailTemp LIST
export class DoEmailTemplistAction implements Action {
  type = ActionTypes.GET_EMAIL_TEMP_LIST_ACTION;

  constructor(public payload: EmailTempListForm) {}
}

export class DoEmailTemplistSuccessAction implements Action {
  type = ActionTypes.GET_EMAIL_TEMP_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoEmailTemplistFailAction implements Action {
  type = ActionTypes.GET_EMAIL_TEMP_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// EmailTemp  PAGINATION

export class DoEmailTempPaginationAction implements Action {
  type = ActionTypes.GET_EMAIL_TEMP_COUNT_ACTION;

  constructor(public payload: any) {}
}

export class DoEmailTempPaginationSuccessAction implements Action {
  type = ActionTypes.GET_EMAIL_TEMP_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoEmailTempPaginationFailAction implements Action {
  type = ActionTypes.GET_EMAIL_TEMP_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

export class DoEmailTempDeleteAction implements Action {
  type = ActionTypes.DO_EMAIL_TEMP_DELETE;

  constructor(public payload: any) {}
}

export class DoEmailTempDeleteSuccessAction implements Action {
  type = ActionTypes.DO_EMAIL_TEMP_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoEmailTempDeleteFailAction implements Action {
  type = ActionTypes.DO_EMAIL_TEMP_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewEmailTempAction
  | DoNewEmailTempSuccessAction
  | DoNewEmailTempFailAction
  | DoUpdateEmailTempAction
  | DoUpdateEmailTempSuccessAction
  | DoUpdateEmailTempFailAction
  | DoEmailTemplistAction
  | DoEmailTemplistSuccessAction
  | DoEmailTemplistFailAction
  | DoEmailTempPaginationAction
  | DoEmailTempPaginationSuccessAction
  | DoEmailTempPaginationFailAction
  | DoEmailTempDeleteAction
  | DoEmailTempDeleteSuccessAction
  | DoEmailTempDeleteFailAction;
