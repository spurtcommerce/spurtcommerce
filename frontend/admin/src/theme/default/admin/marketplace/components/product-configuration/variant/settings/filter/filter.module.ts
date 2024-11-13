import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterRoutingModule } from './filter-routing.module';
import { variantFilterComponents } from '../../../../../../../../../../add-ons/add-ons.constant';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultCommonModule } from '../../../../../../../../../../src/theme/default/default.common.module';
import { ComponentsModule } from '../../../../../../../../../../src/theme/default/admin/shared/components';
import { MaterialModule } from '../../../../../../../../../../src/theme/default/default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../../../../../../src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { NumberAcceptModule } from '../../../../../../../../../../src/core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    ...variantFilterComponents
  ],
  imports: [
    CommonModule,
    FilterRoutingModule,
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
    EffectsModule.forFeature([   ]),
    NumberAcceptModule
  ]
})
export class FilterModule { }
