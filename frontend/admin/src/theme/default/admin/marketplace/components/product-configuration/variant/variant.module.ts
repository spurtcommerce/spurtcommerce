import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariantRoutingModule } from './variant-routing.module';
import {variantsComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { DefaultCommonModule } from '../../../../../../../../src/theme/default/default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../../../../../../src/theme/default/admin/shared/components';
import { MaterialModule } from '../../../../../../../../src/theme/default/default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../../../../src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { NumberAcceptModule } from '../../../../../../../../src/core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [     

  ],
  imports: [
    CommonModule,
    VariantRoutingModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    CKEditorModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    NumberAcceptModule
  ],
  providers:[
  ],
})
export class VariantModule { }
