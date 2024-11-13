import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignPricingRoutingModule } from './assign-pricing-routing.module';
import { AssignComponents } from '../../../../../../add-ons/add-ons.constant';
import { SharedModule } from '../../../../../../src/app/default/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CatalogModule } from '../catalog/catalog.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ...AssignComponents,

  ],
  imports: [
    CommonModule,
    AssignPricingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgbModule,
    MatInputModule,
    MatStepperModule,
    MatIconModule,
    DataTablesModule,
    CKEditorModule,
    NgSelectModule,
    TranslateModule,
    CatalogModule
  ]
})
export class AssignPricingModule { }
