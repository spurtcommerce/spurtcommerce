# spurtb2c-vendor
1) Remove unused imports, comments, Variables, methods, console.
2) Code structure 
   => Import order (Angular,third party,Own Modules, shared Modules, Components, shared Components, Sandbox,service,Shared Service, Effect, Constant , Model(Interfaces))
   => Variables - CamelCase (public variable, private variable, arrow functions)
   => constructor(private, public)
   => ngOnInit
   => public methods (return type void or type definition)
   => private methods (return type void or type definition)
   => ngOnDestroy()
3) Varibale name should be camelCase.
4) Class name should pascal case.
5) use const if value not going to be changed.
6) Reuse the code and avoid duplicate codes if same code in multiple places.
7) Use the constant file for easy change like api url, titles.
8) Use interface , Tslint, equality, semicolon, code alignment, comments for code.
9) Use utility for common codes.
10) Maximum a method contains 25 - 30 lines.if exceeds create new method.
11) Use changeDetection --> ChangeDetectionStrategy.OnPush to avoid tree shaking.Use markforcheck for detect changes.
12) Use services like providedIn root, Module, Providers array accrodingly based on the use case.
13) Check the network if unwanted api calls occurs kindly remove,a network request may take more time to give response address and resolve it.
14) Use the cache service if api call will be used frequently.
15) Use trackby for loops in html.

      --component.ts--
      
      trackByIndex = (index: number): number => index;
      
      --component.html--
      
      <ng-container *ngFor="let data of chatMessage;let i=index;trackBy: trackByIndex">
      {{data.message}}
      </ng-container>
  
  
  

// Code Structer

//Angular imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin, of } from 'rxjs';
//Third-party
import { Subscription, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // List
  isEnable = false;
  isSpinnerShow: boolean = false;
  limit: number = 0;
  userList: IUserList[] = [];
  offset = 0;
  // filter
  isShowFilter = false;
  filterForm: formGroup;

  trackByIndex = (index: number) => index;

  constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef, private service: LayoutService) {

  }

  ngOnInit(): void {
    // List
    this.getList();
    this.initializeForm();
  }
  // List
  getList(): void {

  }
  // add
  private add(a: number, b: number): number {
    return a + b;
  }
  // Intialize Form
  private initializeForm(): void {

  }

  ngOnDestroy(): void {

  }
}

kindly give comments for html also for all divs like filter, sidebar ,menu.


//Interface

list.model.ts -> File Name

export interface IUserList { 
 userName: string;
 userID: number;
 detail: {
  aliasName: string;
 }
}

//Constant
list.constant.ts -> File Name

export const MaxLimit = 5;

list.component.ts -> File Name

import { MaxLimit } from './list.constant.ts'
import { IUserList } from './list.model';

userList: IUserList[] = [];
limit = maxLimit;