/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DefaultRoutingModule } from './admin-routing.module';
// import {
//   PERFECT_SCROLLBAR_CONFIG,
//   PerfectScrollbarConfigInterface,
//   PerfectScrollbarModule
// } from 'ngx-perfect-scrollbar';
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
import { AuthService } from '../../../core/admin/auth/auth.service';
import { AuthSandbox } from '../../../core/admin/auth/auth.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EditprofileService } from '../../../core/admin/profile/editprofile/editprofile.service';
import { EditprofileSandbox } from '../../../core/admin/profile/editprofile/editprofile.sandbox';
import { ConfigService } from '../../../core/admin/service/config.service';
// import { ToastrModule } from 'ng6-toastr-notifications';

import { ComponentsModule } from './shared/components';
import { DefaultCommonModule } from '../default.common.module';

// Components
import { ContainersModule } from './layout/index';
import { EditprofileEffect } from '../../../core/admin/profile/editprofile/effect/editprofile.effect';
import { ImagemanagerpopupComponent } from './shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { OrderstatusEffects } from '../../../core/admin/settings/localizations/orderstatus/orderstatus-effects/orderstatus.effects';
import { OrderstatusSandbox } from '../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberAcceptModule } from '../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PagerComponent } from './shared/components/pagination/pager.component';
import { MediaEffects } from '../../../core/admin/catalog/media/effects/media.effect';
import { MediaService } from '../../../core/admin/catalog/media/media.service';
import { MediaSandbox } from '../../../core/admin/catalog/media/media.sandbox';
import { DeleteConfirmationDialogComponent } from './shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SellerSandbox } from '../../../core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from '../../../core/admin/vendor/pages/seller/seller.service';
import { VendorProductSandbox } from '../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { ProductService } from '../../../core/admin/catalog/product/product.service';
import { TaxService } from '../../../core/admin/settings/localizations/tax/tax.service';
import { TaxSandbox } from '../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxEffect } from '../../../core/admin/settings/localizations/tax/tax-effect/tax.effects';

import { NgbDateCustomParserFormatter } from './shared/components/interface/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
import { SetPasswordComponent } from './authentication/set-password/set-password.component';
import { TokenExpireComponent } from './authentication/token-expire/token-expire.component';
import { TokenInvalidComponent } from './authentication/token-invalid/token-invalid.component';
import { ToastrModule } from 'ngx-toastr';
import { PasswordShowModule } from '../../../core/admin/shared/password-show.directives/passwordShow.module';
import { DiscardChangesComponent } from './shared/model-popup/discard-changes/discard-changes.component';
import { chatConversationComponents } from '../../../../add-ons/add-ons.constant';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/','.json');
}


// ConfigService
// const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
//   suppressScrollX: true,
//   wheelSpeed: 1,
//   wheelPropagation: true,
//   minScrollbarLength: 20
// };

@NgModule({
    declarations: [
        AdminComponent,
        PagerComponent,
        ImagemanagerpopupComponent,
        DeleteConfirmationDialogComponent,
        SetPasswordComponent,
        TokenExpireComponent,
        TokenInvalidComponent,
        DiscardChangesComponent,
        ...chatConversationComponents
    
    ],
    imports: [
        BrowserModule,
        DefaultRoutingModule,
        // PerfectScrollbarModule,
        BrowserAnimationsModule,
        FormsModule,
        ContainersModule.forRoot(),
        ComponentsModule.forRoot(),
        DefaultCommonModule.forRoot(),
        MaterialModule,
        CommonModule,
      ReactiveFormsModule,
        HttpClientModule,
      ToastrModule.forRoot({
        easing: 'ease-in',
        maxOpened: 1,
        autoDismiss:true,
      }),
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false,
            },
        }),
        EffectsModule.forRoot([
            MediaEffects,
            EditprofileEffect,
            OrderstatusEffects,
            TaxEffect
        ]),
        CKEditorModule,
        NgbModule,
        NumberAcceptModule,
        PasswordShowModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        // {
        //     provide: PERFECT_SCROLLBAR_CONFIG,
        //     useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        // },
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
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        HTTPStatus,
        AppApiClient,
        AuthGuard,
        AuthService,
        AuthSandbox,
        SellerSandbox,
        SellerService,
        VendorProductSandbox,
        ProductService,
        EditprofileSandbox,
        EditprofileService,
        OrderstatusSandbox,
        OrderstatusApiClientService,
        MediaSandbox,
        MediaService, TaxService, TaxSandbox,
        CkeConfiqService
    ],
    bootstrap: [AdminComponent]
})
export class AdminModule {}
