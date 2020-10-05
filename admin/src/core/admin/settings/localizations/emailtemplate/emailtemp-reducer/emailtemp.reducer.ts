/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../../../localizations/emailtemplate/emailtemp-action/emailtemp.action';
import { EmailTempRecordState, EmailTempState } from './emailtemp.state';
import { EmailTempListResponseModel } from '../emailtemp-model/emailtemplist.response.model';

export const initialState: EmailTempState = new EmailTempRecordState() as EmailTempState;

export function reducer(
  state = initialState,
  { type, payload }: any
): EmailTempState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_EMAIL_TEMP_ACTION: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_EMAIL_TEMP_ACTION: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_EMAIL_TEMP_LIST_ACTION: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_EMAIL_TEMP_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_EMAIL_TEMP_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_NEW_EMAIL_TEMP_SUCCESS: {
      return Object.assign({}, state, {
        newEmailTemp: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_EMAIL_TEMP_SUCCESS: {
      return Object.assign({}, state, {
        updateEmailTemp: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_EMAIL_TEMP_LIST_SUCCESS: {
      const emailTempList = payload.data.map(_template => {
        const tempListModel = new EmailTempListResponseModel(_template);
        return tempListModel;
      });
      return Object.assign({}, state, {
        emailTempList: emailTempList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_EMAIL_TEMP_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        emailTempPagination: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_EMAIL_TEMP_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        emailTempDelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_NEW_EMAIL_TEMP_FAIL: {
      return Object.assign({}, initialState, {
        newEmailTemp: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_EMAIL_TEMP_FAIL: {
      return Object.assign({}, initialState, {
        updateEmailTemp: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_EMAIL_TEMP_DELETE_FAIL: {
      return Object.assign({}, initialState, {
        emailTempDelete: payload,
        failed: true
      });
    }
    case actions.ActionTypes.GET_EMAIL_TEMP_LIST_FAIL: {
      return Object.assign({}, initialState, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getAddEmailTemp = (state: EmailTempState) => state.newEmailTemp;
export const getupdateemailtemp = (state: EmailTempState) =>
  state.updateEmailTemp;
export const getdeleteemailtemp = (state: EmailTempState) =>
  state.emailTempDelete;
export const getemailtemplist = (state: EmailTempState) => state.emailTempList;
export const getemailtempagination = (state: EmailTempState) =>
  state.emailTempPagination;

export const getEmailTempListLoading = (state: EmailTempState) =>
  state.listLoading;
export const getEmailTempListLoaded = (state: EmailTempState) =>
  state.listLoaded;
export const getEmailTempListFailed = (state: EmailTempState) =>
  state.listFailed;

export const getEmailTempCountLoading = (state: EmailTempState) =>
  state.countLoading;
export const getEmailTempCountLoaded = (state: EmailTempState) =>
  state.countLoaded;
export const getEmailTempCountFailed = (state: EmailTempState) =>
  state.countFailed;

export const getEmailTempAddLoading = (state: EmailTempState) =>
  state.addLoading;
export const getEmailTempAddLoaded = (state: EmailTempState) => state.addLoaded;
export const getEmailTempAddFailed = (state: EmailTempState) => state.addFailed;

export const getEmailTempUpdateLoading = (state: EmailTempState) =>
  state.updateLoading;
export const getEmailTempUpdateLoaded = (state: EmailTempState) =>
  state.updateLoaded;
export const getEmailTempUpdateFailed = (state: EmailTempState) =>
  state.updateFailed;

export const getEmailTempDeleteLoading = (state: EmailTempState) =>
  state.deleteLoading;
export const getEmailTempDeleteLoaded = (state: EmailTempState) =>
  state.deleteLoaded;
export const getEmailTempDeleteFailed = (state: EmailTempState) =>
  state.deleteFailed;
