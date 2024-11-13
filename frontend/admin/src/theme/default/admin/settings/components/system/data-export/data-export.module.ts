import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataExportRoutingModule } from './data-export.routing';
import { DataExportComponent } from './data-export/data-export.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DataExportComponent
  ],
  imports: [
    CommonModule,
    DataExportRoutingModule,
    TranslateModule.forChild()
  ]
})
export class DataExportModule { }
