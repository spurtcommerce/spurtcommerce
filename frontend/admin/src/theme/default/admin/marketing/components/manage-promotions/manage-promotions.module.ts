import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePromotionsRoutingModule } from './manage-promotions.routing';
import { couponComponents } from '../../../../../../../add-ons/add-ons.constant';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../../shared/components';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ...couponComponents,
  ],
  imports: [
    EffectsModule.forFeature([]),
    CommonModule,
    ManagePromotionsRoutingModule,
    TranslateModule,
    SharedModule,
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    NumberAcceptModule,
    EffectsModule.forFeature([]),
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    CKEditorModule,
    InfiniteScrollModule,

  ],
  providers: []
})
export class ManagePromotionsModule { }