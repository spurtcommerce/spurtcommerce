import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataExportComponent } from './data-export/data-export.component';

const smtpRoutes: Routes = [{ path: '', component: DataExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(smtpRoutes)],
  exports: [RouterModule]
})
export class DataExportRoutingModule { }
