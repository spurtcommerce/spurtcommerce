/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {OverlayContainer, Overlay} from '@angular/cdk/overlay';
import {MAT_MENU_SCROLL_STRATEGY} from '@angular/material';
import {CustomOverlayContainer} from './theme/utils/custom-overlay-container';
import {menuScrollStrategy} from './theme/utils/scroll-strategy';
import {AppSettings} from './app.settings';
import {ConfigService} from '../core/service/config.service';
import {RequestInterceptor} from '../core/service/request.interceptor';
import {AuthGuard} from '../core/service/auth.guard';

// modules
import {ComponentsModule} from './shared/components/index';
import {DefaultRoutingModule} from './default.routing';
import {SharedModule} from './shared/shared.module';

// components
import {CONTAINERS} from './common/index';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {DefaultComponent} from './default.component';

// store actions
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metaReducers, reducers} from '../core/reducer.interface';
import {ListsEffect} from '../core/lists/effects/lists.effect';
import {ListsSandbox} from '../core/lists/lists.sandbox';
import {ListsService} from '../core/lists/lists.service';
// component
import {DetailPageComponent} from './pages/detail-page/detail-page.component';
import {LayoutAuthGuard} from '../core/service/layout_auth.guard';
import {UnderDevelopingComponent} from './pages/layout/under-developing/under-developing.component';
import {ShareButtonModule} from '@ngx-share/button';
import {AgmCoreModule} from '@agm/core';
import { APP_BASE_HREF } from '@angular/common';

import { WishlistSandbox } from '../core/wishlist/wishlist.sandbox';
import { WishlistService } from '../core/wishlist/wishlist.service';
import { WishlistEffect } from '../core/wishlist/effects/wishlist.effect';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxSpinnerModule,
        SharedModule,
        ComponentsModule,
        EffectsModule.forRoot([ListsEffect]),
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot([ListsEffect, WishlistEffect]),
        ShareButtonModule.withConfig({
            debug: true
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCfuTV5tYInC-Mj6YJ9LzRocVOdn3yCUGM'
        }),
        DefaultRoutingModule
    ],
    declarations: [
        DefaultComponent,
        NotFoundComponent,
        DetailPageComponent,
        CONTAINERS.LayoutContainerComponent,
        UnderDevelopingComponent
    ],
    providers: [
        AppSettings,
        LayoutAuthGuard,
        AuthGuard,
        ConfigService,
        {provide: OverlayContainer, useClass: CustomOverlayContainer},
        {provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay]},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {provide: APP_BASE_HREF, useValue: ''},
        ListsSandbox,
        ListsService,
        WishlistSandbox,
        WishlistService
    ],
    bootstrap: [DefaultComponent]
})
export class DefaultModule {
}
