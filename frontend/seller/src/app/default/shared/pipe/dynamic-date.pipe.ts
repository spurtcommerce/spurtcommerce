import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Pipe({
  name: 'dynamicDate'
})
export class DynamicDatePipe implements PipeTransform, OnDestroy {
  private localStorageKey = 'dateFormat'; 
  private onDestroy$: Subject<void> = new Subject<void>(); // Subject for managing subscription cleanup
  dateFormat = 'mediumDate'; 

  constructor(private datePipe: DatePipe) {
    window.addEventListener('storage', () => {
      const dateFormat = localStorage.getItem(JSON.parse(this.localStorageKey));
      if (dateFormat) {
        this.dateFormat = dateFormat;
      }
    });

  const initialDateFormat = localStorage.getItem(this.localStorageKey);
  if (initialDateFormat) {
      this.dateFormat = initialDateFormat;
   }
  }

transform(value: any, format?: string, timezone?: string, locale?: string): any {
    return this.datePipe.transform(value, this.dateFormat, timezone, locale);
}

ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}