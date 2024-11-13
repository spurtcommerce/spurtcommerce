import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NewCatalogRoutingModule } from './new-catalog-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../../../../../../src/app/default/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from '../../../../../../src/app/core/product/product-effects/product.effects';
import { ProductService } from '../../../../../../src/app/core/product/product.service';
import { ProductSandbox } from '../../../../../../src/app/core/product/product.sandbox';
import { CustomCurrencyPipe } from '../../../../../../src/app/default/shared/pipe/currency-symbol.pipe';
import { ConfigService } from '../../../../../../src/app/core/services/config.service';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NewProductEffects } from '../../../../../../src/app/core/catalog/product/product-effects/product.effects';
import { NewProductSandbox } from '../../../../../../src/app/core/catalog/product/product.sandbox';
import { NewProductService } from '../../../../../../src/app/core/catalog/product/product.service';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CatalogModule } from '../catalog/catalog.module';
import { ModalPopupComponent } from '../catalog/manage-product/modalpopup/modalpopup.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../../../../src/app/core/common/common.service';
import { CommonSandbox } from '../../../../../../src/app/core/common/common.sandbox';

@NgModule({
    declarations: [
        LayoutComponent,
        // ModalPopupComponent
        
    ],
    imports: [
        CommonModule,
        NewCatalogRoutingModule,
        SharedModule,
        EffectsModule.forFeature([ProductEffect, NewProductEffects]),
        NgSelectModule,
        NgbModule,
        NgbAccordionModule,
        CatalogModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        NewProductSandbox,
        NewProductService,
        ProductEffect,
        ProductService,
        ProductSandbox,
        DatePipe,
        CustomCurrencyPipe,
        ConfigService,
        CommonSandbox,
        CommonService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class NewCatalogModule { }
