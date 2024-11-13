import { AuthSandbox } from './core/auth/auth.sandbox';
import { AuthApiService } from './core/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { RequestInterceptor, HTTPStatus } from './core/providers/interceptor/request.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './default/shared/shared.module';
import { LayoutComponent } from './default/common/layout/layout.component';
import { reducers, metaReducers } from '../app/core/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './core/providers/guards/auth-guard';
import { MediaSandbox } from './core/media/media.sandbox';
import { MediaService } from './core/media/media.service';
import { MediaEffects } from './core/media/effects/media.effect';
import { CommonSandbox } from './core/common/common.sandbox';
import { CommonService } from './core/common/common.service';
import { CommonEffect } from './core/common/effects/common.effect';
import { AuthEffects } from './core/auth/effects/auth.effect';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './default/shared/interfaces/dateformat';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PaymentEffect } from './core/payment/payment-effects/payment.effects';
import { PaymentSandbox } from './core/payment/payment.sandbox';
import { PaymentService } from './core/payment/payment.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ADD_ON_EFFECT, chatConversationComponents } from '../../add-ons/add-ons.constant';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

const commonEffect = [MediaEffects, CommonEffect, AuthEffects,PaymentEffect];

const effectArray = [...commonEffect,...ADD_ON_EFFECT];

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        ...chatConversationComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        // SwiperModule,
        SharedModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
        HttpClientModule,
        MatDatepickerModule,
        EffectsModule.forRoot(effectArray),
        StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: { strictStateImmutability: false, strictActionImmutability: false } }),
        ToastrModule.forRoot({
            timeOut: 2000,
            easing: 'ease-in',
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        HTTPStatus,
        MediaSandbox,
        MediaService,
        CommonSandbox,
        CommonService,
        AuthSandbox,
        AuthApiService,
        PaymentSandbox,
        PaymentService,
        AuthGuard,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        // {
        //   provide: SWIPER_CONFIG,
        //   useValue: DEFAULT_SWIPER_CONFIG
        // },
        { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
