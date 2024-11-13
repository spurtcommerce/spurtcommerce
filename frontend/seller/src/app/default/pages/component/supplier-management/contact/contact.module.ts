import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CatalogModule } from '../../catalog/catalog.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SupplierManagerComponents } from '../../../../../../../add-ons/add-ons.constant';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    // ListComponent,
    // ContactComponent
  ...SupplierManagerComponents
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([]),
    NgSelectModule,
    TranslateModule,
    NgbModule,
    CatalogModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // This sets the locale to British, which uses dd/MM/yyyy format
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ContactModule { }
