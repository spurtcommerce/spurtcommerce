import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// store
import { Store } from "@ngrx/store";
// actions
import * as DocumentVerifyActions from "./action/document.action";
// app state
import * as store from "src/core/app.state.interface";
//selector
import {
  DocumentVerifynew,
  DocumentVerifynewLoaded,
  DocumentVerifynewLoading,
  documentVerifyChecked,
  documentVerifyCheckedLoaded,
  documentVerifyCheckedLoading,
  documentVerifyList,
  documentVerifyListLoaded,
  documentVerifyListLoading,
  documentView,
  documentViewLoading,
  documentViewLoaded,
} from "./reducer/document.selector";

@Injectable()
export class documentVerifySandbox {
  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) { }

  //documentVerifyList
  public documentVerifyList$ = this.appState.select(documentVerifyList);
  public documentVerifyListLoading$ = this.appState.select(documentVerifyListLoading);
  public documentVerifyListLoaded$ = this.appState.select(documentVerifyListLoaded);
  //documentVerifyChecked
  public documentVerifyChecked$ = this.appState.select(documentVerifyChecked);
  public documentVerifyCheckedLoading$ = this.appState.select(documentVerifyCheckedLoading);
  public documentVerifyCheckedLoaded$ = this.appState.select(documentVerifyCheckedLoaded);

 //DocumentVerifynew
  public DocumentVerifynew$ = this.appState.select(DocumentVerifynew);
  public DocumentVerifynewLoading$ = this.appState.select(DocumentVerifynewLoading);
  public DocumentVerifynewLoaded$ = this.appState.select(DocumentVerifynewLoaded);


   //documentView
   public documentView$ = this.appState.select(documentView);
   public documentViewLoading$ = this.appState.select(documentViewLoading);
   public documentViewLoaded$ = this.appState.select(documentViewLoaded);

  //documentVerifyList
  public documentVerifyList(value: any) {
    this.appState.dispatch(
      new DocumentVerifyActions.documentVerifyListAction(value)
    );
  }
  //documentVerifyChecked
  public documentVerifyChecked(value: any) {
    this.appState.dispatch(
      new DocumentVerifyActions.documentVerifyCheckedAction(value)
    );
  }

  //DocumentVerifynew
  public DocumentVerifynew(value: any) {
    this.appState.dispatch(
      new DocumentVerifyActions.DocumentVerifynewAction(value)
    );
  }


  //documentView
  public documentView(value: any) {
    this.appState.dispatch(
      new DocumentVerifyActions.documentViewAction(value)
    );
  }
}
