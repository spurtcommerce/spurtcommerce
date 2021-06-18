/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { BrowserModule } from '@angular/platform-browser';
// import { APP_BASE_HREF } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DefaultRoutingModule } from './admin-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../../environments/environment';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../core/app.reducers';
import {
  HTTPStatus,
  RequestInterceptor
} from '../../../core/admin/providers/CommonInterceptor';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy
} from '@angular/common';
import { MaterialModule } from '../default.material.module';
import { AppApiClient } from '../../../core/appApiClient.service';
import { AuthGuard } from '../../../core/admin/providers/auth.guard';
import { EditprofileComponent } from './layout/editprofile/editprofile.component';
import { AuthService } from '../../../core/admin/auth/auth.service';
import { AuthSandbox } from '../../../core/admin/auth/auth.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditprofileService } from '../../../core/admin/profile/editprofile/editprofile.service';
import { EditprofileSandbox } from '../../../core/admin/profile/editprofile/editprofile.sandbox';
import { ConfigService } from '../../../core/admin/service/config.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from './shared/components';
import { DefaultCommonModule } from '../default.common.module';

// Components
import { CONTAINERS, ContainersModule } from './layout/index';
import { EditprofileEffect } from '../../../core/admin/profile/editprofile/effect/editprofile.effect';
import { ImagemanagerpopupComponent } from './shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { OrderstatusEffects } from '../../../core/admin/settings/localizations/orderstatus/orderstatus-effects/orderstatus.effects';
import { OrderstatusSandbox } from '../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberAcceptModule } from '../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PagerComponent } from './shared/components/pagination/pager.component';
import { StockEffects } from '../../../core/admin/settings/localizations/stockStatus/stock-effect/stock.effect';
import { StockService } from '../../../core/admin/settings/localizations/stockStatus/stock.service';
import { StockSandbox } from '../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}
// ConfigService
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AdminComponent,
    PagerComponent,
    EditprofileComponent,
    ImagemanagerpopupComponent,
    CONTAINERS.AuthLayoutComponent,
    CONTAINERS.CommonLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'spurtcommerce' }),
    DefaultRoutingModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ContainersModule,
    ComponentsModule,
    DefaultCommonModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      EditprofileEffect,
      OrderstatusEffects,
      StockEffects
    ]),
    CKEditorModule,
    NgbModule,
    NumberAcceptModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    HTTPStatus,
    AppApiClient,
    AuthGuard,
    AuthService,
    AuthSandbox,
    StockService,
    StockSandbox,
    EditprofileSandbox,
    EditprofileService,
    OrderstatusSandbox,
    OrderstatusApiClientService
  ],

  bootstrap: [AdminComponent],
  entryComponents: [ImagemanagerpopupComponent]
})
export class AdminModule {}
