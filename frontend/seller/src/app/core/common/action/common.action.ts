/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
    GET_PROFILE: type('[login] get profile'),
    GET_PROFILE_SUCCESS: type('[login] get profile success'),
    GET_PROFILE_FAIL: type('[login] get profile fail'),
    
    GET_SETTINGS: type('[login] get settings'),
    GET_SETTINGS_SUCCESS: type('[login] get settings success'),
    GET_SETTINGS_FAIL: type('[login] get settings fail'),
    CLEAR_SETTINGS: type('[login] clearSetting'),

    UPDATE_DOCUMENT: type('[doc] update document'),
    UPDATE_DOCUMENT_SUCCESS: type('[doc] update document success'),
    UPDATE_DOCUMENT_FAIL: type('[doc] update document fail'),

    EDIT_PROFILE: type('[login] edit profile'),
    EDIT_PROFILE_SUCCESS: type('[login] edit profile success'),
    EDIT_PROFILE_FAIL: type('[login] edit profile fail'),

    GET_WISHLIST_COUNT: type('[count] get wishlist count'),
    GET_WISHLIST_COUNT_SUCCESS: type('[count] wishlist count success'),
    GET_WISHLIST_COUNT_FAIL: type('[count] wishlist count fail'),
    DO_SIGN_OUT: type('[signout] sign out'),

    GET_LANGUAGELIST: type('[language] get language'),
    GET_LANGUAGELIST_SUCCESS: type('[language] get language success'),
    GET_LANGUAGELIST_FAIL: type('[language] get language fail'),

    GET_COUNTRY_LIST: type('[language] get country'),
    GET_COUNTRY_LIST_SUCCESS: type('[language] get country success'),
    GET_COUNTRY_LIST_FAIL: type('[language] get country fail'),

    GET_DOCUMENT_LIST: type('[document] get document'),
    GET_DOCUMENT_LIST_SUCCESS: type('[document] get document success'),
    GET_DOCUMENT_LIST_FAIL: type('[document] get document fail'),

    GET_DOCUMENT_COUNT: type('[document] get document count'),
    GET_DOCUMENT_COUNT_SUCCESS: type('[document] get document count success'),
    GET_DOCUMENT_COUNT_FAIL: type('[document] get document count fail'),

    DOWNLOAD_DOCUMENT: type('[doc] download document'),
    DOWNLOAD_DOCUMENT_SUCCESS: type('[doc] download document success'),
    DOWNLOAD_DOCUMENT_FAIL: type('[doc] download document fail'),

    GET_ZONE_LIST: type('[language] get Zone'),
    GET_ZONE_LIST_SUCCESS: type('[language] get Zone success'),
    GET_ZONE_LIST_FAIL: type('[language] get Zone fail'),

    ADD_ON_CONFIG: type('[add on config] add on config'),
    ADD_ON_CONFIG_SUCCESS: type('[add on config] add on config success'),
    ADD_ON_CONFIG_FAIL: type('[add on config] add on config fail'),

     /*Product Attribute List*/

  LANGUAGE_LIST: type('[language1] language1 List'),
  LANGUAGE_LIST_SUCCESS: type('[language1] language1 List Success'),
  LANGUAGE_LIST_FAIL: type('[language1] language1 List Fail'),

};

/* get wishlist count action*/
export class GetWishlistCount implements Action {
    type = ActionTypes.GET_WISHLIST_COUNT;

    constructor(public payload: any) {
    }
}
/* get Wishlist action*/
export class GetWishlistCountSuccess implements Action {
    type = ActionTypes.GET_WISHLIST_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetWishlistCountFail implements Action {
    type = ActionTypes.GET_WISHLIST_COUNT_FAIL;

    constructor(public payload: any) {
    }
}

/* get profile action*/

export class GetProfile implements Action {
    type = ActionTypes.GET_PROFILE;

    constructor(public payload = null) {
    }
}

export class GetProfileSuccess implements Action {
    type = ActionTypes.GET_PROFILE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetProfileFail implements Action {
    type = ActionTypes.GET_PROFILE_FAIL;

    constructor(public payload: any) {
    }
}
/* get setting action*/

export class GetSetting implements Action {
    type = ActionTypes.GET_SETTINGS;

    constructor(public payload = null) {
    }
}

export class GetSettingSuccess implements Action {
    type = ActionTypes.GET_SETTINGS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetSettingFail implements Action {
    type = ActionTypes.GET_SETTINGS_FAIL;

    constructor(public payload: any) {
    }
}

export class clearSetting implements Action {
    type = ActionTypes.CLEAR_SETTINGS;

    constructor(public payload = null) {
    }
}


/* get setting action*/

export class UpdateDocument implements Action {
    type = ActionTypes.UPDATE_DOCUMENT;

    constructor(public payload = null) {
    }
}

export class GetUpdateDocumentSuccess implements Action {
    type = ActionTypes.UPDATE_DOCUMENT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetUpdateDocumentFail implements Action {
    type = ActionTypes.UPDATE_DOCUMENT_FAIL;

    constructor(public payload: any) {
    }
}
/* get setting action*/

export class DownloadDocument implements Action {
    type = ActionTypes.DOWNLOAD_DOCUMENT;

    constructor(public payload = null) {
    }
}

export class GetDownloadDocumentSuccess implements Action {
    type = ActionTypes.DOWNLOAD_DOCUMENT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetDownloadDocumentFail implements Action {
    type = ActionTypes.DOWNLOAD_DOCUMENT_FAIL;

    constructor(public payload: any) {
    }
}
/* edit profile action*/

export class EditProfile implements Action {
    type = ActionTypes.EDIT_PROFILE;

    constructor(public payload) {
    }
}

export class EditProfileSuccess implements Action {
    type = ActionTypes.EDIT_PROFILE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class EditProfileFail implements Action {
    type = ActionTypes.EDIT_PROFILE_FAIL;

    constructor(public payload: any) {
    }
}
/* do sign out action*/

export class DoSignOut implements Action {
    type = ActionTypes.DO_SIGN_OUT;

    constructor(public payload: any = null) {
    }
}

/* get language action*/

export class GetLanguage implements Action {
    type = ActionTypes.GET_LANGUAGELIST;

    constructor(public payload: any) {
    }
}

export class GetLanguageSuccess implements Action {
    type = ActionTypes.GET_LANGUAGELIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetLanguageFail implements Action {
    type = ActionTypes.GET_LANGUAGELIST_FAIL;

    constructor(public payload: any) {
    }
}
/* get country action*/

export class GetCountry implements Action {
    type = ActionTypes.GET_COUNTRY_LIST;

    constructor(public payload: any) {
    }
}

export class GetCountrySuccess implements Action {
    type = ActionTypes.GET_COUNTRY_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetCountryFail implements Action {
    type = ActionTypes.GET_COUNTRY_LIST_FAIL;

    constructor(public payload: any) {
    }
}
/* get document action*/

export class GetDocument implements Action {
    type = ActionTypes.GET_DOCUMENT_LIST;

    constructor(public payload: any) {
    }
}

export class GetDocumentSuccess implements Action {
    type = ActionTypes.GET_DOCUMENT_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetDocumentFail implements Action {
    type = ActionTypes.GET_DOCUMENT_LIST_FAIL;

    constructor(public payload: any) {
    }
}
/* get document action*/

export class GetDocumentCount implements Action {
    type = ActionTypes.GET_DOCUMENT_COUNT;

    constructor(public payload: any) {
    }
}

export class GetDocumentCountSuccess implements Action {
    type = ActionTypes.GET_DOCUMENT_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetDocumentCountFail implements Action {
    type = ActionTypes.GET_DOCUMENT_COUNT_FAIL;

    constructor(public payload: any) {
    }
}

/* get country action*/

export class GetZoneList implements Action {
    type = ActionTypes.GET_ZONE_LIST;

    constructor(public payload: any) {
    }
}

export class GetZoneListSuccess implements Action {
    type = ActionTypes.GET_ZONE_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetZoneListFail implements Action {
    type = ActionTypes.GET_ZONE_LIST_FAIL;

    constructor(public payload: any) {
    }
}

/* add on config action*/

export class addOnConfig implements Action {
    type = ActionTypes.ADD_ON_CONFIG;

    constructor(public payload: any) {
    }
}

export class addOnConfigSuccess implements Action {
    type = ActionTypes.ADD_ON_CONFIG_SUCCESS;

    constructor(public payload: any) {
    }
}

export class addOnConfigFail implements Action {
    type = ActionTypes.ADD_ON_CONFIG_FAIL;

    constructor(public payload: any) {
    }
}


/*Product Attribute List*/

export class languageList1Action implements Action {

    type = ActionTypes.LANGUAGE_LIST;
    constructor(public payload: any) {}
  }
  
  export class languageList1Success implements Action {
    type = ActionTypes.LANGUAGE_LIST_SUCCESS;
    constructor(public payload: any) { }
  } 
  
  
  export class languageList1Fail implements Action {
    type = ActionTypes.LANGUAGE_LIST_FAIL;
    constructor(public payload: any = null) { }
  }
  
  

export type Actions
    = GetWishlistCount |
    GetWishlistCountSuccess |
    GetWishlistCountFail |
    GetProfile |
    GetProfileSuccess |
    GetProfileFail |
    UpdateDocument |
    GetUpdateDocumentSuccess |
    GetUpdateDocumentFail |
    DownloadDocument |
    GetDownloadDocumentSuccess |
    GetDownloadDocumentFail |
    GetSetting |
    GetSettingSuccess |
    GetSettingFail |
    DoSignOut |
    GetLanguage |
    GetLanguageSuccess |
    GetLanguageFail |
    GetCountry |
    GetCountrySuccess |
    GetCountryFail |
    GetDocument |
    GetDocumentSuccess |
    GetDocumentFail |
    GetDocumentCount |
    GetDocumentCountSuccess |
    GetDocumentCountFail |
    EditProfile |
    EditProfileSuccess |
    EditProfileFail |
    languageList1Action |
    languageList1Success |
    languageList1Fail;
