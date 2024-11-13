import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingvalueService {

  public data: any;

  // Initialize BehaviorSubject with an initial value
  private mySetting = new BehaviorSubject<string>('');
  // Observable to expose the BehaviorSubject
  mySetting$ = this.mySetting.asObservable();


  constructor() { }


  // Method to update the value
  updateSettingValue(value: any): void {
    let obj:any={
      value:value,
    }

    this.mySetting.next(obj);
  }

  // Method to get the current value
  getCurrentSettingValue(): any {
    return this.mySetting.getValue();
  }
}
