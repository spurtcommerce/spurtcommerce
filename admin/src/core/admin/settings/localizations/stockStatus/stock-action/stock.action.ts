/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../../../shared/utility/utilityHelpers';
import { StockListForm } from '../stock-model/stockstatuslist.model';
import { StockStatusModel } from '../stock-model/stockstatus.model';

export const ActionTypes = {
  DO_STOCKLIST: type('[STOCK] DO STOCKLIST'),
  DO_STOCKLIST_SUCCESS: type('[STOCK] DO STOCKLIST SUCCESS'),
  DO_STOCKLIST_FAIL: type('[STOCK] DO STOCKLIST FAIL'),
  DO_NEWSTOCKLIST: type('[STOCK] DO NEWSTOCK'),
  DO_NEWSTOCKLIST_SUCCESS: type('[STOCK] DO NEWSTOCKLIST_SUCCESS'),
  DO_NEWSTOCKLIST_FAIL: type('[STOCK] DO NEWSTOCKLIST FAIL'),
  Do_STOCkLISTCOUNT: type('[STOCK] DO STOCKLISTCOUNT'),
  Do_STOCkLISTCOUNT_SUCCESS: type('[STOCK] DO STOCKLISTCOUNT_SUCCESS '),
  Do_STOCkLISTCOUNT_FAIL: type('[STOCK] DO STOCKLISTCOUNT_FAIL'),
  DO_STOCKUPDATE: type('[stock] DO STOCKUPDATE'),
  DO_STOCKUPDATE_SUCCESS: type('[stock] DO STOCKUPDATE SUCCESS'),
  DO_STOCKUPDATE_FAIL: type('[stock] DO STOCKUPDATE FAIL'),
  DO_STOCKDELETE: type('[stock] DO STOCKDELETE'),
  DO_STOCKDELETE_SUCCESS: type('[stock] DO STOCKDELETE SUCCESS'),
  DO_STOCKDELETE_FAIL: type('[stock] DO STOCKDELETE FAIL')
};

// STOCK LIST
export class DoStockListAction implements Action {
  type = ActionTypes.DO_STOCKLIST;

  constructor(public payload: StockListForm) {}
}

export class DoStockListSuccess implements Action {
  type = ActionTypes.DO_STOCKLIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoStockListFail implements Action {
  type = ActionTypes.DO_STOCKLIST_FAIL;

  constructor(public payload: any = null) {}
}

// stock add

export class DoAddStockAction implements Action {
  type = ActionTypes.DO_NEWSTOCKLIST;

  constructor(public payload: StockStatusModel) {}
}

export class DoAddStockSuccess implements Action {
  type = ActionTypes.DO_NEWSTOCKLIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAddStockFail implements Action {
  type = ActionTypes.DO_NEWSTOCKLIST_FAIL;

  constructor(public payload: any = null) {}
}

// Stock Count
export class DoStockCount implements Action {
  type = ActionTypes.Do_STOCkLISTCOUNT;

  constructor(public payload: StockListForm) {}
}

export class DoStockCountSuccess implements Action {
  type = ActionTypes.Do_STOCkLISTCOUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoStockCountFail implements Action {
  type = ActionTypes.Do_STOCkLISTCOUNT_FAIL;

  constructor(public payload: any = null) {}
}

// stock update
export class DoStockUpdate implements Action {
  type = ActionTypes.DO_STOCKUPDATE;

  constructor(public payload: any) {}
}

export class DoStockUpdateSuccess implements Action {
  type = ActionTypes.DO_STOCKUPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoStockUpdateFail implements Action {
  type = ActionTypes.DO_STOCKUPDATE_FAIL;

  constructor(public payload: any = null) {}
}

// stock delete

export class DoStockDelete implements Action {
  type = ActionTypes.DO_STOCKDELETE;

  constructor(public payload: any) {}
}

export class DoStockDeleteSuccess implements Action {
  type = ActionTypes.DO_STOCKDELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoStockDeleteFail implements Action {
  type = ActionTypes.DO_STOCKDELETE_FAIL;

  constructor(public payload: any = null) {}
}
