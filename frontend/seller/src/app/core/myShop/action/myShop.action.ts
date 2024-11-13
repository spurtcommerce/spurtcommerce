import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';



export const ActionTypes = {

  // basicDetailCreate //
  BASIC_DETAIL_CREATE_ACTION: type('[MY_SHOP] basicDetailCreate'),
  BASIC_DETAIL_CREATE_SUCCESS: type('[MY_SHOP] basicDetailCreate success'),
  BASIC_DETAIL_CREATE_FAIL: type('[MY_SHOP] basicDetailCreate Fail'),

  // basicDetailGet //
  BASIC_DETAIL_GET_ACTION: type('[MY_SHOP] basicDetailGet'),
  BASIC_DETAIL_GET_SUCCESS: type('[MY_SHOP] basicDetailGet success'),
  BASIC_DETAIL_GET_FAIL: type('[MY_SHOP] basicDetailGet Fail'),

  // certificateUpdate //
  CERTIFICATE_UPDATE_ACTION: type('[MY_SHOP] certificateUpdate'),
  CERTIFICATE_UPDATE_SUCCESS: type('[MY_SHOP] certificateUpdate success'),
  CERTIFICATE_UPDATE_FAIL: type('[MY_SHOP] certificateUpdate Fail'),

  // certificateDetail //
  CERTIFICATE_DETAIL_ACTION: type('[MY_SHOP] certificateDetail'),
  CERTIFICATE_DETAIL_SUCCESS: type('[MY_SHOP] certificateDetail success'),
  CERTIFICATE_DETAIL_FAIL: type('[MY_SHOP] certificateDetail Fail'),

  // imageUpload //
  IMAGE_UPLOAD_ACTION: type('[MY_SHOP] imageUpload'),
  IMAGE_UPLOAD_SUCCESS: type('[MY_SHOP] imageUpload success'),
  IMAGE_UPLOAD_FAIL: type('[MY_SHOP] imageUpload Fail'),


  // imageUpdate //
  IMAGE_UPDATE_ACTION: type('[MY_SHOP] imageUpdate'),
  IMAGE_UPDATE_SUCCESS: type('[MY_SHOP] imageUpdate success'),
  IMAGE_UPDATE_FAIL: type('[MY_SHOP] imageUpdate Fail'),

  // imageDetail //
  IMAGE_DETAIL_ACTION: type('[MY_SHOP] imageDetail'),
  IMAGE_DETAIL_SUCCESS: type('[MY_SHOP] imageDetail success'),
  IMAGE_DETAIL_FAIL: type('[MY_SHOP] imageDetail Fail'),


  // videoUpload //
  VIDEO_UPLOAD_ACTION: type('[MY_SHOP] videoUpload'),
  VIDEO_UPLOAD_SUCCESS: type('[MY_SHOP] videoUpload success'),
  VIDEO_UPLOAD_FAIL: type('[MY_SHOP] videoUpload Fail'),

  // videoUpdate //
  VIDEO_UPDATE_ACTION: type('[MY_SHOP] videoUpdate'),
  VIDEO_UPDATE_SUCCESS: type('[MY_SHOP] videoUpdate success'),
  VIDEO_UPDATE_FAIL: type('[MY_SHOP] videoUpdate Fail'),

  // videoDetail //
  VIDEO_DETAIL_ACTION: type('[MY_SHOP] videoDetail'),
  VIDEO_DETAIL_SUCCESS: type('[MY_SHOP] videoDetail success'),
  VIDEO_DETAIL_FAIL: type('[MY_SHOP] videoDetail Fail'),

  // certificateList //
  CERTIFICATE_LIST_ACTION: type('[MY_SHOP] certificateList'),
  CERTIFICATE_LIST_SUCCESS: type('[MY_SHOP] certificateList success'),
  CERTIFICATE_LIST_FAIL: type('[MY_SHOP] certificateList Fail'),

  // certificateListCount //
  CERTIFICATE_LIST_COUNT_ACTION: type('[MY_SHOP] certificateListCount'),
  CERTIFICATE_LIST_COUNT_SUCCESS: type('[MY_SHOP] certificateListCount success'),
  CERTIFICATE_LIST_COUNT_FAIL: type('[MY_SHOP] certificateListCount Fail'),

  // certificateDelete //
  CERTIFICATE_DELETE_ACTION: type('[MY_SHOP] certificateDelete'),
  CERTIFICATE_DELETE_SUCCESS: type('[MY_SHOP] certificateDelete success'),
  CERTIFICATE_DELETE_FAIL: type('[MY_SHOP] certificateDelete Fail'),

  // DocumentUpload //
  DOCUMENT_UPLOAD_ACTION: type('[MY_SHOP] DocumentUpload'),
  DOCUMENT_UPLOAD_SUCCESS: type('[MY_SHOP] DocumentUpload success'),
  DOCUMENT_UPLOAD_FAIL: type('[MY_SHOP] DocumentUpload Fail'),

  // documentType //
  DOCUMENT_TYPE_ACTION: type('[MY_SHOP] documentType'),
  DOCUMENT_TYPE_SUCCESS: type('[MY_SHOP] documentType success'),
  DOCUMENT_TYPE_FAIL: type('[MY_SHOP] documentType Fail'),

  // certificateCreate //
  CREATE_CERTIFICATE_ACTION: type('[MY_SHOP] certificateCreate'),
  CREATE_CERTIFICATE_SUCCESS: type('[MY_SHOP] certificateCreate success'),
  CREATE_CERTIFICATE_FAIL: type('[MY_SHOP] certificateCreate Fail'),

  // VideoStatusChange //
  VIDEO_STATUS_CHANGE_ACTION: type('[MY_SHOP] VideoStatusChange'),
  VIDEO_STATUS_CHANGE_SUCCESS: type('[MY_SHOP] VideoStatusChange success'),
  VIDEO_STATUS_CHANGE_FAIL: type('[MY_SHOP] VideoStatusChange Fail'),

  // personalized settings

  // updatePersonalizedSettings
  UPDATE_PERSONALIZED_SETTINGS_ACTION: type('[MY_SHOP] updatePersonalizedSettings'),
  UPDATE_PERSONALIZED_SETTINGS_SUCCESS: type('[MY_SHOP] updatePersonalizedSettings success'),
  UPDATE_PERSONALIZED_SETTINGS_FAIL: type('[MY_SHOP] updatePersonalizedSettings Fail'),

  // getPersonalizedSettings
  GET_PERSONALIZED_SETTINGS_ACTION: type('[MY_SHOP] getPersonalizedSettings'),
  GET_PERSONALIZED_SETTINGS_SUCCESS: type('[MY_SHOP] getPersonalizedSettings success'),
  GET_PERSONALIZED_SETTINGS_FAIL: type('[MY_SHOP] getPersonalizedSettings Fail'),
};

// basicDetailCreate
export class basicDetailCreateAction implements Action {
  type = ActionTypes.BASIC_DETAIL_CREATE_ACTION;
  constructor(public payload: any) { }
}
export class basicDetailCreateSuccessAction implements Action {
  type = ActionTypes.BASIC_DETAIL_CREATE_SUCCESS;
  constructor(public payload: any) { }
}
export class basicDetailCreateFailAction implements Action {
  type = ActionTypes.BASIC_DETAIL_CREATE_FAIL;
  constructor(public payload: any = null) { }
}



// basicDetailGet
export class basicDetailGetAction implements Action {
  type = ActionTypes.BASIC_DETAIL_GET_ACTION;
  constructor(public payload: any) { }
}
export class basicDetailGetSuccessAction implements Action {
  type = ActionTypes.BASIC_DETAIL_GET_SUCCESS;
  constructor(public payload: any) { }
}
export class basicDetailGetFailAction implements Action {
  type = ActionTypes.BASIC_DETAIL_GET_FAIL;
  constructor(public payload: any = null) { }
}

// certificateUpdate
export class certificateUpdateAction implements Action {
  type = ActionTypes.CERTIFICATE_UPDATE_ACTION;
  constructor(public payload: any) { }
}
export class certificateUpdateSuccessAction implements Action {
  type = ActionTypes.CERTIFICATE_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class certificateUpdateFailAction implements Action {
  type = ActionTypes.CERTIFICATE_UPDATE_FAIL;
  constructor(public payload: any = null) { }
}

// certificateDetail
export class certificateDetailAction implements Action {
  type = ActionTypes.CERTIFICATE_DETAIL_ACTION;
  constructor(public payload: any) { }
}
export class certificateDetailSuccessAction implements Action {
  type = ActionTypes.CERTIFICATE_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class certificateDetailFailAction implements Action {
  type = ActionTypes.CERTIFICATE_DETAIL_FAIL;
  constructor(public payload: any = null) { }
}

// imageUpload
export class imageUploadAction implements Action {
  type = ActionTypes.IMAGE_UPLOAD_ACTION;
  constructor(public payload: any) { }
}
export class imageUploadSuccessAction implements Action {
  type = ActionTypes.IMAGE_UPLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class imageUploadFailAction implements Action {
  type = ActionTypes.IMAGE_UPLOAD_FAIL;
  constructor(public payload: any = null) { }
}

// imageUpdate
export class imageUpdateAction implements Action {
  type = ActionTypes.IMAGE_UPDATE_ACTION;
  constructor(public payload: any) { }
}
export class imageUpdateSuccessAction implements Action {
  type = ActionTypes.IMAGE_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class imageUpdateFailAction implements Action {
  type = ActionTypes.IMAGE_UPDATE_FAIL;
  constructor(public payload: any = null) { }
}


// imageDetail
export class imageDetailAction implements Action {
  type = ActionTypes.IMAGE_DETAIL_ACTION;
  constructor(public payload: any) { }
}
export class imageDetailSuccessAction implements Action {
  type = ActionTypes.IMAGE_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class imageDetailFailAction implements Action {
  type = ActionTypes.IMAGE_DETAIL_FAIL;
  constructor(public payload: any = null) { }
}

// videoUpload
export class videoUploadAction implements Action {
  type = ActionTypes.VIDEO_UPLOAD_ACTION;
  constructor(public payload: any) { }
}
export class videoUploadSuccessAction implements Action {
  type = ActionTypes.VIDEO_UPLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class videoUploadFailAction implements Action {
  type = ActionTypes.VIDEO_UPLOAD_FAIL;
  constructor(public payload: any = null) { }
}


// videoUpdate
export class videoUpdateAction implements Action {
  type = ActionTypes.VIDEO_UPDATE_ACTION;
  constructor(public payload: any) { }
}
export class videoUpdateSuccessAction implements Action {
  type = ActionTypes.VIDEO_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class videoUpdateFailAction implements Action {
  type = ActionTypes.VIDEO_UPDATE_FAIL;
  constructor(public payload: any = null) { }
}


// videoDetail
export class videoDetailAction implements Action {
  type = ActionTypes.VIDEO_DETAIL_ACTION;
  constructor(public payload: any) { }
}
export class videoDetailSuccessAction implements Action {
  type = ActionTypes.VIDEO_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class videoDetailFailAction implements Action {
  type = ActionTypes.VIDEO_DETAIL_FAIL;
  constructor(public payload: any = null) { }
}

// certificateList
export class certificateListAction implements Action {
  type = ActionTypes.CERTIFICATE_LIST_ACTION;
  constructor(public payload: any) { }
}
export class certificateListSuccessAction implements Action {
  type = ActionTypes.CERTIFICATE_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class certificateListFailAction implements Action {
  type = ActionTypes.CERTIFICATE_LIST_FAIL;
  constructor(public payload: any = null) { }
}

// certificateListCount
export class certificateListCountAction implements Action {
  type = ActionTypes.CERTIFICATE_LIST_COUNT_ACTION;
  constructor(public payload: any) { }
}
export class certificateListCountSuccessAction implements Action {
  type = ActionTypes.CERTIFICATE_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}
export class certificateListCountFailAction implements Action {
  type = ActionTypes.CERTIFICATE_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}

// certificateDelete
export class certificateDeleteAction implements Action {
  type = ActionTypes.CERTIFICATE_DELETE_ACTION;
  constructor(public payload: any) { }
}
export class certificateDeleteSuccessAction implements Action {
  type = ActionTypes.CERTIFICATE_DELETE_SUCCESS;
  constructor(public payload: any) { }
}
export class certificateDeleteFailAction implements Action {
  type = ActionTypes.CERTIFICATE_DELETE_FAIL;
  constructor(public payload: any = null) { }
}

// DocumentUpload
export class DocumentUploadAction implements Action {
  type = ActionTypes.DOCUMENT_UPLOAD_ACTION;
  constructor(public payload: any) { }
}
export class DocumentUploadSuccessAction implements Action {
  type = ActionTypes.DOCUMENT_UPLOAD_SUCCESS;
  constructor(public payload: any) { }
}
export class DocumentUploadFailAction implements Action {
  type = ActionTypes.DOCUMENT_UPLOAD_FAIL;
  constructor(public payload: any = null) { }
}

// documentType
export class documentTypeAction implements Action {
  type = ActionTypes.DOCUMENT_TYPE_ACTION;
  constructor(public payload: any) { }
}
export class documentTypeSuccessAction implements Action {
  type = ActionTypes.DOCUMENT_TYPE_SUCCESS;
  constructor(public payload: any) { }
}
export class documentTypeFailAction implements Action {
  type = ActionTypes.DOCUMENT_TYPE_FAIL;
  constructor(public payload: any = null) { }
}

// certificateCreate
export class certificateCreateAction implements Action {
  type = ActionTypes.CREATE_CERTIFICATE_ACTION;
  constructor(public payload: any) { }
}
export class certificateCreateSuccessAction implements Action {
  type = ActionTypes.CREATE_CERTIFICATE_SUCCESS;
  constructor(public payload: any) { }
}
export class certificateCreateFailAction implements Action {
  type = ActionTypes.CREATE_CERTIFICATE_FAIL;
  constructor(public payload: any = null) { }
}

// VideoStatusChange
export class VideoStatusChangeAction implements Action {
  type = ActionTypes.VIDEO_STATUS_CHANGE_ACTION;
  constructor(public payload: any) { }
}
export class VideoStatusChangeSuccessAction implements Action {
  type = ActionTypes.VIDEO_STATUS_CHANGE_SUCCESS;
  constructor(public payload: any) { }
}
export class VideoStatusChangeFailAction implements Action {
  type = ActionTypes.VIDEO_STATUS_CHANGE_FAIL;
  constructor(public payload: any = null) { }
}

// personalized settings

// updatePersonalizedSettings
export class updatePersonalizedSettingsAction implements Action {
  type = ActionTypes.UPDATE_PERSONALIZED_SETTINGS_ACTION;
  constructor(public payload: any) { }
}
export class updatePersonalizedSettingsSuccessAction implements Action {
  type = ActionTypes.UPDATE_PERSONALIZED_SETTINGS_SUCCESS;
  constructor(public payload: any) { }
}
export class updatePersonalizedSettingsFailAction implements Action {
  type = ActionTypes.UPDATE_PERSONALIZED_SETTINGS_FAIL;
  constructor(public payload: any = null) { }
}

// getPersonalizedSettings
export class getPersonalizedSettingsAction implements Action {
  type = ActionTypes.GET_PERSONALIZED_SETTINGS_ACTION;
  constructor(public payload: any) { }
}
export class getPersonalizedSettingsSuccessAction implements Action {
  type = ActionTypes.GET_PERSONALIZED_SETTINGS_SUCCESS;
  constructor(public payload: any) { }
}
export class getPersonalizedSettingsFailAction implements Action {
  type = ActionTypes.GET_PERSONALIZED_SETTINGS_FAIL;
  constructor(public payload: any = null) { }
}


export type Actions =
  | basicDetailCreateAction
  | basicDetailCreateSuccessAction
  | basicDetailCreateFailAction
  | basicDetailGetAction
  | basicDetailGetSuccessAction
  | basicDetailGetFailAction
  | certificateUpdateAction
  | certificateUpdateSuccessAction
  | certificateUpdateFailAction
  | certificateDetailAction
  | certificateDetailSuccessAction
  | certificateDetailFailAction
  | imageUploadAction
  | imageUploadSuccessAction
  | imageUploadFailAction
  | imageUpdateAction
  | imageUpdateSuccessAction
  | imageUpdateFailAction
  | imageDetailAction
  | imageDetailSuccessAction
  | imageDetailFailAction
  | videoUploadAction
  | videoUploadSuccessAction
  | videoUploadFailAction
  | videoUpdateAction
  | videoUpdateSuccessAction
  | videoUpdateFailAction
  | videoDetailAction
  | videoDetailSuccessAction
  | videoDetailFailAction
  | certificateListAction
  | certificateListSuccessAction
  | certificateListFailAction
  | certificateListCountAction
  | certificateListCountSuccessAction
  | certificateListCountFailAction
  | certificateDeleteAction
  | certificateDeleteSuccessAction
  | certificateDeleteFailAction
  | DocumentUploadAction
  | DocumentUploadSuccessAction
  | DocumentUploadFailAction
  | DocumentUploadAction
  | DocumentUploadSuccessAction
  | DocumentUploadFailAction
  | certificateCreateAction
  | certificateCreateSuccessAction
  | certificateCreateFailAction
  | VideoStatusChangeAction
  | VideoStatusChangeSuccessAction
  | VideoStatusChangeFailAction
  | updatePersonalizedSettingsAction
  | updatePersonalizedSettingsSuccessAction
  | updatePersonalizedSettingsFailAction
  | getPersonalizedSettingsAction
  | getPersonalizedSettingsSuccessAction
  | getPersonalizedSettingsFailAction;