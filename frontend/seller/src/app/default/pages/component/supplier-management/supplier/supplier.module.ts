import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { NgSelectModule } from '@ng-select/ng-select';

import { CatalogModule } from '../../catalog/catalog.module';
import { SupplierComponents } from '../../../../../../../add-ons/add-ons.constant';


@NgModule({
  declarations: [
    ...SupplierComponents,
    // ListComponent,
    // AddComponent,
    // DocumentComponent,
    // LinkComponent,
    // SupplierContactComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([]),
    NgSelectModule,
    TranslateModule,
    NgbAccordionModule,
    NgbModule,
    CatalogModule
  ],
  providers:[
   
  ]
})
export class SupplierModule { }
