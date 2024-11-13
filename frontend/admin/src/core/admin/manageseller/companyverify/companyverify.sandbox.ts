import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// store
import { Store } from "@ngrx/store";
// actions
import * as CompanyVerifyActions from "./action/companyverify.action";
// app state
import * as store from "src/core/app.state.interface";
//selector
import {
  companyVerifychecked,
  companyVerifycheckedApi,
  companyVerifycheckedApiLoaded,
  companyVerifycheckedApiLoading,
  companyVerifycheckedLoaded,
  companyVerifycheckedLoading,
  companyVerifyList,
  companyVerifyListLoaded,
  companyVerifyListLoading,
  countryList,
  countryListLoaded,
  countryListLoading,
  verificationStatus,
  verificationStatusLoading,
  verificationStatusLoaded
} from "./reducer/companyverify.selector";

@Injectable()
export class companyVerifySandbox {
  //companyVerifyList
  public companyVerifyList$ = this.appState.select(companyVerifyList);
  public companyVerifyListLoading$ = this.appState.select(
    companyVerifyListLoading
  );
  public companyVerifyListLoaded$ = this.appState.select(
    companyVerifyListLoaded
  );

  //companyVerifychecked
  public companyVerifychecked$ = this.appState.select(companyVerifychecked);
  public companyVerifycheckedLoading$ = this.appState.select(
    companyVerifycheckedLoading
  );
  public companyVerifycheckedLoaded$ = this.appState.select(
    companyVerifycheckedLoaded
  );

  //countryList
  public countryList$ = this.appState.select(countryList);
  public countryListLoading$ = this.appState.select(countryListLoading);
  public countryListLoaded$ = this.appState.select(countryListLoaded);

  // companyVerifycheckedApi
  public companyVerifycheckedApi$ = this.appState.select(
    companyVerifycheckedApi
  );
  public companyVerifycheckedApiLoading$ = this.appState.select(
    companyVerifycheckedApiLoading
  );
  public companyVerifycheckedApiLoaded$ = this.appState.select(
    companyVerifycheckedApiLoaded
  );

  // verificationStatus
  public verificationStatus$ = this.appState.select(verificationStatus);
  public verificationStatusLoading$ = this.appState.select(
    verificationStatusLoading
  );
  public verificationStatusLoaded$ = this.appState.select(
    verificationStatusLoaded
  );

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {
    // ----
  }

  public companyVerifyList(value: any) {
    this.appState.dispatch(
      new CompanyVerifyActions.companyVerifyListAction(value)
    );
  }

  //companyVerifychecked

  public companyVerifychecked(value: any) {
    this.appState.dispatch(
      new CompanyVerifyActions.companyVerifycheckedAction(value)
    );
  }

  //countryList

  public countryList(value: any) {
    this.appState.dispatch(new CompanyVerifyActions.countryListAction(value));
  }

  // companyVerifycheckedApi
  public companyVerifycheckedApi(value: any) {
    this.appState.dispatch(
      new CompanyVerifyActions.companyVerifycheckedApiAction(value)
    );
  }

  // verificationStatus
  public verificationStatus(value: any) {
    this.appState.dispatch(
      new CompanyVerifyActions.verificationStatusAction(value)
    );
  }
}
