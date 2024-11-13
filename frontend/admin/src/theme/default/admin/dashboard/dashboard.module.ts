/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { DashboardComponent } from './dashboard.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { DashboardService } from '../../../../core/admin/dashboard/dashboard.service';
import { DashboardSandbox } from '../../../../core/admin/dashboard/dashboard.sandbox';
import { DashboardEffects } from '../../../../core/admin/dashboard/effects/dashboard.effect';

// Routing Module
import { DashboardRoutingModule } from './dashboard.routing';
import { PersonalizeProductEffect } from '../../../../core/admin/settings/personalize/product/product-effects/product-effect';
import { PerSonalizeProductService } from '../../../../core/admin/settings/personalize/product/product-service';
import { PersonalizeProductSandbox } from '../../../../core/admin/settings/personalize/product/product-sandbox';

// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { TruncatePipe } from '../../../../core/admin/shared/pipes/stringLengthCompress';
import { ComponentsModule } from '../shared/components';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as PlotlyJS from 'plotly.js-dist';
import {
  PlotlyModule,
  PlotlyViaCDNModule,
} from 'angular-plotly.js';
import { SellerEffects } from 'src/core/admin/vendor/pages/seller/seller-effects/seller.effects';
import { SellerService } from 'src/core/admin/vendor/pages/seller/seller.service';
import { SellerSandbox } from 'src/core/admin/vendor/pages/seller/seller.sandbox';
import { NgChartsModule } from 'ng2-charts';
import { FiltersPipe } from './search.pipe';

PlotlyModule.plotlyjs = PlotlyJS;
PlotlyViaCDNModule.setPlotlyVersion('1.55.2'); // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.setPlotlyBundle('basic');

@NgModule({
    declarations: [DashboardComponent, TruncatePipe,FiltersPipe],
    imports: [
        CommonModule,
        ComponentsModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        DashboardRoutingModule,
        NgxChartsModule,
        NgChartsModule,
        EffectsModule.forFeature([DashboardEffects, SellerEffects]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        PlotlyModule,
    ],
    providers: [DashboardService, DashboardSandbox, SellerService, SellerSandbox],
    exports:[FiltersPipe],
    bootstrap: []
})
export class DashboardModule {}
