import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BreadcrumbItem {
  name: string;
  urls: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<any>({ data: {urls: []}});
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  updateBreadcrumb(data: any): void {
      this.breadcrumbSubject.next(data);
  }
}