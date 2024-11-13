import { Map, Record } from 'immutable';
export interface MyShopState extends Map<string, any> {

  // basicDetailCreate //
  basicDetailCreate: any;
  basicDetailCreateLoading: boolean;
  basicDetailCreateLoaded: boolean;
  basicDetailCreateFailed: boolean;

  // basicDetailGet //
  basicDetailGet: any;
  basicDetailGetLoading: boolean;
  basicDetailGetLoaded: boolean;
  basicDetailGetFailed: boolean;


  // certificateUpdate //
  certificateUpdate: any;
  certificateUpdateLoading: boolean;
  certificateUpdateLoaded: boolean;
  certificateUpdateFailed: boolean;

  // certificateDetail //
  certificateDetail: any;
  certificateDetailLoading: boolean;
  certificateDetailLoaded: boolean;
  certificateDetailFailed: boolean;

  // imageUpload //
  imageUpload: any;
  imageUploadLoading: boolean;
  imageUploadLoaded: boolean;
  imageUploadFailed: boolean;

  // imageUpdate //
  imageUpdate: any;
  imageUpdateLoading: boolean;
  imageUpdateLoaded: boolean;
  imageUpdateFailed: boolean;

  // imageDetail //
  imageDetail: any;
  imageDetailLoading: boolean;
  imageDetailLoaded: boolean;
  imageDetailFailed: boolean;

  // videoUpload //
  videoUpload: any;
  videoUploadLoading: boolean;
  videoUploadLoaded: boolean;
  videoUploadFailed: boolean;

  // videoUpdate //
  videoUpdate: any;
  videoUpdateLoading: boolean;
  videoUpdateLoaded: boolean;
  videoUpdateFailed: boolean;

  // videoDetail //
  videoDetail: any;
  videoDetailLoading: boolean;
  videoDetailLoaded: boolean;
  videoDetailFailed: boolean;

  // certificateList //
  certificateList: any;
  certificateListLoading: boolean;
  certificateListLoaded: boolean;
  certificateListFailed: boolean;

  // certificateListCount //
  certificateListCount: any;
  certificateListCountLoading: boolean;
  certificateListCountLoaded: boolean;
  certificateListCountFailed: boolean;


  // certificateDelete //
  certificateDelete: any;
  certificateDeleteLoading: boolean;
  certificateDeleteLoaded: boolean;
  certificateDeleteFailed: boolean;

  // DocumentUpload //
  DocumentUpload: any;
  DocumentUploadLoading: boolean;
  DocumentUploadLoaded: boolean;
  DocumentUploadFailed: boolean;

  // documentType //
  documentType: any;
  documentTypeLoading: boolean;
  documentTypeLoaded: boolean;
  documentTypeFailed: boolean;

  // certificateCreate //
  certificateCreate: any;
  certificateCreateLoading: boolean;
  certificateCreateLoaded: boolean;
  certificateCreateFailed: boolean;

  // VideoStatusChange //
  VideoStatusChange: any;
  VideoStatusChangeLoading: boolean;
  VideoStatusChangeLoaded: boolean;
  VideoStatusChangeFailed: boolean;

  // personalized settings
  // updatePersonalizedSettings //
  updatePersonalizedSettings: any;
  updatePersonalizedSettingsLoading: boolean;
  updatePersonalizedSettingsLoaded: boolean;
  updatePersonalizedSettingsFailed: boolean;

  // getPersonalizedSettings //
  getPersonalizedSettings: any;
  getPersonalizedSettingsLoading: boolean;
  getPersonalizedSettingsLoaded: boolean;
  getPersonalizedSettingsFailed: boolean;
}

export const MyShopStateRecord = Record({
  // basicDetailCreate /
  basicDetailCreate: [],
  basicDetailCreateLoading: false,
  basicDetailCreateLoaded: false,
  basicDetailCreateFailed: false,


  // basicDetailGet /
  basicDetailGet: [],
  basicDetailGetLoading: false,
  basicDetailGetLoaded: false,
  basicDetailGetFailed: false,


  // certificateUpdate /
  certificateUpdate: [],
  certificateUpdateLoading: false,
  certificateUpdateLoaded: false,
  certificateUpdateFailed: false,

  // certificateDetail /
  certificateDetail: [],
  certificateDetailLoading: false,
  certificateDetailLoaded: false,
  certificateDetailFailed: false,

  // imageUpload /
  imageUpload: [],
  imageUploadLoading: false,
  imageUploadLoaded: false,
  imageUploadFailed: false,

  // imageUpdate /
  imageUpdate: [],
  imageUpdateLoading: false,
  imageUpdateLoaded: false,
  imageUpdateFailed: false,

  // imageDetail /
  imageDetail: [],
  imageDetailLoading: false,
  imageDetailLoaded: false,
  imageDetailFailed: false,

  // videoUpload /
  videoUpload: [],
  videoUploadLoading: false,
  videoUploadLoaded: false,
  videoUploadFailed: false,

  // videoUpdate /
  videoUpdate: [],
  videoUpdateLoading: false,
  videoUpdateLoaded: false,
  videoUpdateFailed: false,

  // videoDetail /
  videoDetail: [],
  videoDetailLoading: false,
  videoDetailLoaded: false,
  videoDetailFailed: false,

  // certificateList /
  certificateList: [],
  certificateListLoading: false,
  certificateListLoaded: false,
  certificateListFailed: false,

  // certificateListCount /
  certificateListCount: [],
  certificateListCountLoading: false,
  certificateListCountLoaded: false,
  certificateListCountFailed: false,

  // certificateDelete /
  certificateDelete: [],
  certificateDeleteLoading: false,
  certificateDeleteLoaded: false,
  certificateDeleteFailed: false,

  // DocumentUpload /
  DocumentUpload: [],
  DocumentUploadLoading: false,
  DocumentUploadLoaded: false,
  DocumentUploadFailed: false,

  // documentType /
  documentType: [],
  documentTypeLoading: false,
  documentTypeLoaded: false,
  documentTypeFailed: false,

  // certificateCreate /
  certificateCreate: [],
  certificateCreateLoading: false,
  certificateCreateLoaded: false,
  certificateCreateFailed: false,

  // VideoStatusChange /
  VideoStatusChange: [],
  VideoStatusChangeLoading: false,
  VideoStatusChangeLoaded: false,
  VideoStatusChangeFailed: false,


  // personalized settings
  // updatePersonalizedSettings //
  updatePersonalizedSettings: [],
  updatePersonalizedSettingsLoading: false,
  updatePersonalizedSettingsLoaded: false,
  updatePersonalizedSettingsFailed: false,

  // getPersonalizedSettings //
  getPersonalizedSettings: [],
  getPersonalizedSettingsLoading: false,
  getPersonalizedSettingsLoaded: false,
  getPersonalizedSettingsFailed: false,
});

