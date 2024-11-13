import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataImportComponent } from './data-import.component';

const smsRoutes: Routes = [{ path: '', component: DataImportComponent }];

@NgModule({
  imports: [RouterModule.forChild(smsRoutes)],
  exports: [RouterModule]
})
export class DataImportRoutingModule { }
