import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageChangeService {

 private actionSubject = new Subject<any>();

 actionObservable$ = this.actionSubject.asObservable();

 triggerAction(data: any) {
   this.actionSubject.next(data);
 }
}
