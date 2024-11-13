import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
//   selectedFile:any={}
//   private dataSubject = new BehaviorSubject<any>({

// 'data':this.selectedFile
//   }
   
//   );

//   sendData(datas:any) {
//     this.dataSubject.next(datas);
//     console.log("ssssssss",datas)
//   }

//   getData() {
//     return this.dataSubject.asObservable();
//   }

  private sharedValue: any;
  private sharedHeader: any;

  setSharedValue(value: any) {
    this.sharedValue = value;
  }
 
  getSharedValue() {
    return this.sharedValue;
  }


  setSharedHeader(value: any) {
    this.sharedHeader = value;
  }
  getSharedHeader() {
    return this.sharedHeader;
  }
}
