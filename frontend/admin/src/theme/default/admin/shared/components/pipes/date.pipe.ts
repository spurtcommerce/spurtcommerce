import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'dynamicDate'
})
export class DynamicDatePipe implements PipeTransform {
  time: string;
  dateFormat: string
//   private localStorageKey = 'dateFormat'; 
//   private onDestroy$: Subject<void> = new Subject<void>(); // Subject for managing subscription cleanup
//   dateFormat = 'mediumDate'; 

//   constructor(private datePipe: DatePipe) {
//     window.addEventListener('storage', () => {
//       const dateFormat = localStorage.getItem(JSON.parse(this.localStorageKey));
//       if (dateFormat) {
//         this.dateFormat = dateFormat;
//       }
//     });

//   const initialDateFormat = localStorage.getItem(this.localStorageKey);
//   if (initialDateFormat) {
//       this.dateFormat = initialDateFormat;
//    }
//   }

// transform(value: any, format?: string, timezone?: string, locale?: string): any {

//     return this.datePipe.transform(value, this.dateFormat, timezone, locale);
// }

// ngOnDestroy(): void {

//     this.onDestroy$.next();
//     this.onDestroy$.complete();
//   }
constructor(private datePipe: DatePipe){
  this.time =localStorage.getItem('timeFormat');
  this.dateFormat = localStorage.getItem('dateFormat');
}

transform(value: string): string {
  const date = new Date(value);
  const timePortion = value?.split('T')[1]?.split('.')[0];

  if (timePortion === '00:00:00') {
    const formattedDate = this.datePipe.transform(date, this.dateFormat);
    return `${formattedDate}`;
  }

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  let formattedTime;
  if (this.time === '12 hrs') {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)} ${ampm}`;
  } else {
    formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  const formattedDate = this.datePipe.transform(date, this.dateFormat);
  return `${formattedDate}, ${formattedTime}`;
}

padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}



// transform(value: string): string {
//   const date = new Date(value);
//   const formattedDate = this.datePipe.transform(date, this.dateFormat);
//   let hours = date.getHours();
//   const minutes = date.getMinutes();
//   let formattedTime;
//   if (this.time === '12 hrs') {
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)} ${ampm}`;
//   } else {
//     formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}`;
//   }
//   return `${formattedDate}, ${formattedTime}`;
// }

// padZero(num: number): string {
//   return num < 10 ? '0' + num : num.toString();
// }
}