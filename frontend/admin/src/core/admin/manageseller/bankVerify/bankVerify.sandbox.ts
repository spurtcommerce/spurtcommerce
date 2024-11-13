import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as BankVerifyActions from './action/bankVerify.action';
// app state
import * as store from 'src/core/app.state.interface';
import { Router } from '@angular/router';
import { bankVerifyChecked, bankVerifyCheckedLoaded, bankVerifyCheckedLoading, bankVerifyList, bankVerifyListLoaded, bankVerifyListLoading } from './reducer/bankVerify.selector';

 
@Injectable()


export class bankVerifySandbox{
    constructor(
        protected appState: Store<store.AppState>,
        private router: Router) {}
 
 
 //bankVerifyList
 public bankVerifyList$ = this.appState.select(bankVerifyList);
 public bankVerifyListLoading$ = this.appState.select(bankVerifyListLoading);
 public bankVerifyListLoaded$ = this.appState.select(bankVerifyListLoaded);

  //bankVerifyChecked
  public bankVerifyChecked$ = this.appState.select(bankVerifyChecked);
  public bankVerifyCheckedLoading$ = this.appState.select(bankVerifyCheckedLoading);
  public bankVerifyCheckedLoaded$ = this.appState.select(bankVerifyCheckedLoaded);
 


 //bankVerifyList
 public bankVerifyList(value: any) {
    this.appState.dispatch(
      new BankVerifyActions.bankVerifyListAction(value)
    );
  }

   //bankVerifyChecked
 public bankVerifyChecked(value: any) {
  this.appState.dispatch(
    new BankVerifyActions.bankVerifyCheckedAction(value)
  );
}
}





