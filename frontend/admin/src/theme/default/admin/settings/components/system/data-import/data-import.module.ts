import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataImportRoutingModule } from './data-import.routing';
import { DataImportComponent } from './data-import.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DataImportComponent
  ],
  imports: [
    CommonModule,
    DataImportRoutingModule,
    NgSelectModule,
    NgbModule,
    TranslateModule.forChild()
  ]
})
export class DataImportodule { }
