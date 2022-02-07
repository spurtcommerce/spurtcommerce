/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';
import {LoginResponseModel} from '../models/loginResponse.model';
import {LoginModel} from '../models/login.model';
import {RegisterModel} from '../models/register.model';
import { OauthModel } from '../models/oauth.model';

export const ActionTypes = {
    // login actions
    DO_LOGIN: type('[login] do login'),
    DO_LOGIN_SUCCESS: type('[login] do login success'),
    DO_LOGIN_FAIL: type('[login] do login fail'),
    // login actions
    DO_OAUTH_LOGIN: type('[login] do oauth login'),
    // register actions
    DO_REGISTER: type('[login] do register'),
    DO_REGISTER_SUCCESS: type('[login] do register success'),
    DO_REGISTER_FAIL: type('[login] do register fail'),
    // recover account action
    DO_RECOVER: type('[login] do recover'),
    RECOVER_SUCCESS: type('[login] do recover success'),
    RECOVER_FAIL: type('[login] do recover fail'),
};
// login actions
export class DoLogin implements Action {
    type = ActionTypes.DO_LOGIN;

    constructor(public payload: LoginModel) {
    }
}

export class DoLoginSuccess implements Action {
    type = ActionTypes.DO_LOGIN_SUCCESS;

    constructor(public payload: LoginResponseModel) {
    }
}
export class DoLoginFail implements Action {
    type = ActionTypes.DO_LOGIN_FAIL;

    constructor(public payload: any) {
    }
}

// oauth login actions
export class DoOauthLogin implements Action {
    type = ActionTypes.DO_OAUTH_LOGIN;

    constructor(public payload: OauthModel) {
    }
}

// export class DoOauthLoginSuccess implements Action {
//     type = ActionTypes.DO_OAUTH_LOGIN_SUCCESS;

//     constructor(public payload: LoginResponseModel) {
//     }
// }
// export class DoOauthLoginFail implements Action {
//     type = ActionTypes.DO_OAUTH_LOGIN_FAIL;

//     constructor(public payload: any) {
//     }
// }
// register actions

export class DoRegister implements Action {
    type = ActionTypes.DO_REGISTER;

    constructor(public payload: RegisterModel) {
    }
}

export class DoRegisterSuccess implements Action {
    type = ActionTypes.DO_REGISTER_SUCCESS;

    constructor(public payload: LoginResponseModel) {
    }
}
export class DoRegisterFail implements Action {
    type = ActionTypes.DO_REGISTER_FAIL;

    constructor(public payload: any) {
    }
}
// recover account action

export class RecoverAccount implements Action {
    type = ActionTypes.DO_RECOVER;

    constructor(public payload: any) {
    }
}

export class RecoverAccountSuccess implements Action {
    type = ActionTypes.RECOVER_SUCCESS;

    constructor(public payload: LoginResponseModel) {
    }
}
export class RecoverAccountFail implements Action {
    type = ActionTypes.RECOVER_FAIL;

    constructor(public payload: any) {
    }
}
export type Actions
    = DoLogin|
    DoLoginSuccess|
    DoLoginFail|
    DoOauthLogin|
    DoRegister|
    DoRegisterSuccess|
    DoRegisterFail|
    RecoverAccount|
    RecoverAccountSuccess|
    RecoverAccountFail;
