import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { NgbAccordionModule, NgbActiveModal, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../../../../../../add-ons/shared/shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    FormsModule,
    ComponentsModule,
    NgbAccordionModule,
    MaterialModule,
    NgbDropdownModule,
    SharedModule,
    DefaultCommonModule,
    NgSelectModule,
    MaterialModule,

    // NgModule,

    CKEditorModule,
    TranslateModule.forChild({
      loader:{
        provide :TranslateLoader,
        useFactory :HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AttributeRoutingModule
  ],
  providers :[]
})
export class AttributeModule { }
