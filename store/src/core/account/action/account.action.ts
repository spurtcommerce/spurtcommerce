/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { ChangePasswordModel } from '../models/changePassword.model';
import { EditProfileModal } from '../models/editProfile.modal';
import { OrderHistoryRequestModel } from '../models/order-history-request.model';

export const ActionTypes = {
  // change password actions
  DO_CHANGE_PASSWORD: type('[login] do change password'),
  CHANGE_PASSWORD_SUCCESS: type('[login] do change password success'),
  CHANGE_PASSWORD_FAIL: type('[login] do  change password fail'),

  // Edit profile actions
  EDIT_PROFILE: type('[login] edit profile'),
  EDIT_PROFILE_SUCCESS: type('[login] edit profile success'),
  EDIT_PROFILE_FAIL: type('[login] edit profile fail'),

  // get order history actions
  GET_ORDER_HISTORY: type('[history] edit profile'),
  GET_ORDER_HISTORY_SUCCESS: type('[history] edit profile success'),
  GET_ORDER_HISTORY_FAIL: type('[history] edit profile fail'),

  // get order history count actions
  GET_ORDER_HISTORY_COUNT: type('[history] history count'),
  GET_ORDER_HISTORY_SUCCESS_COUNT: type('[history] history count success'),
  GET_ORDER_HISTORY_COUNT_FAIL: type('[history] history count fail'),

  // get order detail actions
  GET_ORDER_DETAIL: type('[order_detail] order detail'),
  CLEAR_ORDER_DETAIL: type('[order_detail] clear order detail'),
  GET_ORDER_DETAIL_SUCCESS: type('[order_detail] order detail success'),
  GET_ORDER_DETAIL_FAIL: type('[order_detail] order detail fail'),
};

/*  Change Password Actions */
export class ChangePassword implements Action {
  type = ActionTypes.DO_CHANGE_PASSWORD;

  constructor(public payload: ChangePasswordModel) {}
}

/*  Change Password success Actions */

export class ChangePasswordSuccess implements Action {
  type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: any) {}
}

/*  Change Password fail Actions */

export class ChangePasswordFail implements Action {
  type = ActionTypes.CHANGE_PASSWORD_FAIL;

  constructor(public payload: any) {}
}

/*  Edit Profile Actions */

export class EditProfile implements Action {
  type = ActionTypes.EDIT_PROFILE;

  constructor(public payload: EditProfileModal) {}
}

/*  Edit Profile success Actions */

export class EditProfileSuccess implements Action {
  type = ActionTypes.EDIT_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

/*  Edit Profile fail Actions */

export class EditProfileFail implements Action {
  type = ActionTypes.EDIT_PROFILE_FAIL;

  constructor(public payload: any) {}
}

/* Get Order History  Actions */

export class GetOrderHistory implements Action {
  type = ActionTypes.GET_ORDER_HISTORY;

  constructor(public payload: OrderHistoryRequestModel) {}
}

/* Get Order History success Actions */

export class GetOrderHistorySuccess implements Action {
  type = ActionTypes.GET_ORDER_HISTORY_SUCCESS;

  constructor(public payload: any) {}
}

/* Get Order History fail Actions */

export class GetOrderHistoryFail implements Action {
  type = ActionTypes.GET_ORDER_HISTORY_FAIL;

  constructor(public payload: any) {}
}

/* Get Order History count Actions */

export class GetOrderHistoryCount implements Action {
  type = ActionTypes.GET_ORDER_HISTORY_COUNT;

  constructor(public payload: OrderHistoryRequestModel) {}
}

/* Get Order History count success Actions */

export class GetOrderHistoryCountSuccess implements Action {
  type = ActionTypes.GET_ORDER_HISTORY_SUCCESS_COUNT;

  constructor(public payload: any) {}
}

/* Get Order History count fail Actions */

export class GetOrderHistoryCountFail implements Action {
  type = ActionTypes.GET_ORDER_HISTORY_COUNT_FAIL;

  constructor(public payload: any) {}
}

/* Get Order detail Actions */

export class GetOrderDetail implements Action {
  type = ActionTypes.GET_ORDER_DETAIL;

  constructor(public payload: any) {}
}

/* Clear Order detail Actions */

export class ClearOrderDetail implements Action {
  type = ActionTypes.CLEAR_ORDER_DETAIL;

  constructor(public payload: any = null) {}
}

/* Get Order detail success Actions */

export class GetOrderDetailSuccess implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

/* Get Order detail fail Actions */

export class GetOrderDetailFail implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFail
  | EditProfile
  | EditProfileSuccess
  | EditProfileFail
  | GetOrderHistory
  | GetOrderHistorySuccess
  | GetOrderHistoryFail
  | GetOrderDetail
  | GetOrderDetailSuccess
  | GetOrderDetailFail
  | ClearOrderDetail
  | GetOrderHistoryCount
  | GetOrderHistoryCountSuccess
  | GetOrderHistoryCountFail;
