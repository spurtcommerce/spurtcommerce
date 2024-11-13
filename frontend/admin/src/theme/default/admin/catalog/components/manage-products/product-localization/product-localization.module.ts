import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// components
import { ProductLocalizationListComponent } from './product-localization-list/product-localization-list.component';
import { ProductLocalizationAddComponent } from './product-localization-add/product-localization-add.component';
import { ProductLocalizationFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProductEffect } from '../../../../../../../core/admin/catalog/product/product-effect/product.effect';
import { ProductService } from '../../../../../../../core/admin/catalog/product/product.service';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ProductLocalizationEffect } from '../../../../../../../core/admin/catalog/product-localization/effects/product-localization.effects';
import { ProductLocalizationService } from '../../../../../../../core/admin/catalog/product-localization/product-localisation.service';
import { ProductLocalizationSandbox } from '../../../../../../../core/admin/catalog/product-localization/product-loacalization.sandbox';

// Routing Module
import { ProductLocalizationRoutingModule } from './product-localization-routing.module';

// Shared Modules
import { NumberAcceptModule } from '../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';

// ENTRY COMPONENTS
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../../shared/components';
import { PipeModule } from '../../../../shared/components/pipes/category-search.pipe.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    ProductLocalizationListComponent,
    ProductLocalizationAddComponent,
    ProductLocalizationFilterComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ComponentsModule,
    MaterialModule,
    PipeModule,
    ProductLocalizationRoutingModule,
    EffectsModule.forFeature([
      ProductLocalizationEffect, 
      ProductEffect
    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
    NumberAcceptModule,
    NgbModule
  ],
  providers: [
    ProductLocalizationService,
    ProductLocalizationSandbox,
    ProductService,
    ProductSandbox,
    DatePipe,
    Title
  ],
})
export class ProductLocalizationModule { }