import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  getDateTime() {
    const val = JSON.parse(localStorage.getItem('dateTimeFormate'));
    const time = JSON.parse(localStorage.getItem('timeFormate'));
    const format = {
      // date: val?.hasOwnProperty('dateFormate') ? val?.dateFormate : 'dd/MM/yyyy',

      date:val?val:'dd/MM/yyyy',


      
    //  time: time?time : 'HH:mm:ss:SSS',
    }
    
    return format;
  }
}
