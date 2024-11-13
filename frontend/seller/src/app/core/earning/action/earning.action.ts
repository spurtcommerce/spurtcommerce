/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from "@ngrx/store";
import { type } from "../../shared/utility/utilityHelpers";

export const ActionTypes = {
  EARNING_LIST: type("[myProfile] get earning"),
  EARNING_LIST_SUCCESS: type("[myProfile] get earning success"),
  EARNING_LIST_FAIL: type("[myProfile] get earning fail"),


  //earning count

  EARNING_COUNT: type("[myProfile] get earning count"),
  EARNING_COUNT_SUCCESS: type("[myProfile] get earning count success"),
  EARNING_COUNT_FAIL: type("[myProfile] get earning count fail"),


     /*Exportexcel*/

   EARNING_EXPORT: type("[myProfile] get export earning"),
   EARNING_EXPORT_SUCCESS: type("[myProfile] get export earning success"),
   EARNING_EXPORT_FAIL: type("[myProfile] get export earning fail")

  
};




/* get earning action*/

export class GetEarning implements Action {
    type = ActionTypes.EARNING_LIST;
  
    constructor(public payload = null) { }
  }
  
  export class GetEarningSuccess implements Action {
    type = ActionTypes.EARNING_LIST_SUCCESS;
  
    constructor(public payload: any) { }
  }
  
  export class GetEarningFail implements Action {
    type = ActionTypes.EARNING_LIST_FAIL;
  
    constructor(public payload: any) { }
  }


  /* get earning  count*/

export class GetEarningCount implements Action {
  type = ActionTypes.EARNING_COUNT;

  constructor(public payload = null) { }
}

export class GetEarningCountSuccess implements Action {
  type = ActionTypes.EARNING_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class GetEarningCountFail implements Action {
  type = ActionTypes.EARNING_COUNT_FAIL;

  constructor(public payload: any) { }
}


   /*Exportexcel*/

  export class GetEarningExport implements Action {
    type = ActionTypes.EARNING_EXPORT;
  
    constructor(public payload = null) { }
  }
  
  export class GetEarningExportSuccess implements Action {
    type = ActionTypes.EARNING_EXPORT_SUCCESS;
  
    constructor(public payload: any) { }
  }
  
  export class GetEarningExportFail implements Action {
    type = ActionTypes.EARNING_EXPORT_FAIL;
  
    constructor(public payload: any) { }
  }