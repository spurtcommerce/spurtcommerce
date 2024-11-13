import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DatePipe } from '@angular/common';

// third party 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { ProductLocalizationListComponent } from './product-localization-list/product-localization-list.component';
import { ProductLocalizationAddComponent } from './product-localization-add/product-localization-add.component';
import { ProductLocalizationFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';

// Routing Module
import { ProductLocalizationRoutingModule } from './product-localization-routing.module';
import { ProductLocalizationService } from '../../../../../../../src/app/core/catalog/product-localization/product-localisation.service';
import { ProductLocalizationSandbox } from '../../../../../../../src/app/core/catalog/product-localization/product-loacalization.sandbox';
import { ProductLocalizationEffect } from '../../../../../../../src/app/core/catalog/product-localization/effects/product-localization.effects';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { CommonService } from '../../../../../../../src/app/core/common/common.service';
import { CommonEffect } from '../../../../../../../src/app/core/common/effects/common.effect';

// Shared Modules
import { SharedModule } from '../../../../../../../src/app/default/shared/shared.module';
import { MaterialModule } from '../../../../../../../src/app/material.module';
import { PipeModule } from '../../../../../../../src/app/default/shared/pipe/pipe.module';

// ENTRY COMPONENTS
import { NumberAcceptModule } from '../../../../../../../src/app/default/shared/validation-directives/onlyNumber.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProductLocalizationListComponent,
    ProductLocalizationAddComponent,
    ProductLocalizationFilterComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PipeModule,
    NgSelectModule,
    ProductLocalizationRoutingModule,
    EffectsModule.forFeature([
      ProductLocalizationEffect, 
      CommonEffect
    ]),
    TranslateModule,
    CKEditorModule,
    NumberAcceptModule,
    NgbModule
  ],
  providers: [
    ProductLocalizationService,
    ProductLocalizationSandbox,
    CommonSandbox,
    CommonService,
    DatePipe,
    Title
  ],
})
export class ProductLocalizationModule { }