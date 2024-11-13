import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../components/service/date.service';

@Pipe({
  name: 'sellerDynamicDate'
})
export class SellerDynamicDatePipe implements PipeTransform {
  time: string;
  dateFormat: string
  // constructor( private datePipe:DatePipe ,private service:DateService){

  // }
  // transform(value: Date, type: string): string {
  //   const format = this.service?.getDateTime();
  //   // ${format.time}
  //   return this.datePipe.transform(value, format.hasOwnProperty(type)? format[type]: `${format.date}    `);

  // }

  constructor(private datePipe: DatePipe) {
    this.time = JSON.parse(localStorage.getItem('timeFormate'));
  this.dateFormat = JSON.parse(localStorage.getItem('dateTimeFormate'));
   }
  
  transform(value: string): string {
    const date = new Date(value);
    const formattedDate = this.datePipe.transform(date, this.dateFormat);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let formattedTime;
    if (this.time === '12 hrs') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)} ${ampm}`;
    } else {
      formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
    }
    return `${formattedDate}, ${formattedTime}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
