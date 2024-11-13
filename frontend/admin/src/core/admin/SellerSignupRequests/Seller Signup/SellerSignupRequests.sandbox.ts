import { Injectable } from '@angular/core';
// store
import { Store } from '@ngrx/store';
// actions
import * as SellerSignupRequests from './action/SellerSignupRequests.action';
// app state
import * as store from 'src/core/app.state.interface';
import { Router } from '@angular/router';
import { sellerSignupList, sellerSignupListLoading, sellerSignupListLoaded,sellerSignupListCount,sellerSignupListCountLoading,sellerSignupListCountLoaded,updateSeller,updateSellerLoading,updateSellerLoaded} from './reducer/SellerSignupRequests.selector';

 
@Injectable()


export class SellerSignupListSandbox{
    constructor(
        protected appState: Store<store.AppState>,
        private router: Router) {}
 
 
 //sellerSignupList
 public sellerSignupList$ = this.appState.select(sellerSignupList);
 public sellerSignupListLoading$ = this.appState.select(sellerSignupListLoading);
 public sellerSignupListLoaded$ = this.appState.select(sellerSignupListLoaded);


  //sellerSignupListCount
  public sellerSignupListCount$ = this.appState.select(sellerSignupListCount);
  public sellerSignupListCountLoading$ = this.appState.select(sellerSignupListCountLoading);
  public sellerSignupListCountLoaded$ = this.appState.select(sellerSignupListCountLoaded);


  //updateSeller
  public updateSeller$ = this.appState.select(updateSeller);
  public updateSellerLoading$ = this.appState.select(updateSellerLoading);
  public updateSellerLoaded$ = this.appState.select(updateSellerLoaded);

 //sellerSignupList
 public sellerSignupList(value: any) {
 
    this.appState.dispatch(
      new SellerSignupRequests.sellerSignupListAction(value)
    );
  }


   //sellerSignupListCount
 public sellerSignupListCount(value: any) {
  
    this.appState.dispatch(
      new SellerSignupRequests.sellerSignupListCountAction(value)
    );
  }


   //updateSeller
   public updateSeller(value: any) {
     this.appState.dispatch(
      new SellerSignupRequests.updateSellerAction(value)
    );
  }


}





