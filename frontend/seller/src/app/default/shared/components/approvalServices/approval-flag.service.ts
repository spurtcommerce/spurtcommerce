import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonSandbox } from '../../../../../../src/app/core/common/common.sandbox';

@Injectable({
  providedIn: 'root'
})
export class ApprovalFlagService {

  public data: any;

  // Initialize BehaviorSubject with an initial value
  private mySubject = new BehaviorSubject<string>('');
  // Observable to expose the BehaviorSubject
  mySubject$ = this.mySubject.asObservable();


  constructor(public commonSandbox: CommonSandbox,) { }


  // Method to update the value
  updateValue(value: any): void {


    let obj: any = {
      value: value,
      approvalStatus: value?.approvalFlag == 1 ? false : true 
    }

    this.mySubject.next(obj);
  }

  // Method to get the current value
  getCurrentValue(): any {
    return this.mySubject.getValue();
  }


}
