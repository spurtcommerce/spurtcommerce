import { UserEffect } from './../../../../core/admin/settings/user/user-effect/user.effect';
import { RoleEffects } from './../../../../core/admin/settings/role/role-effects/role.effects';
import { UserService } from './../../../../core/admin/settings/user/user.service';
import { UserSandbox } from './../../../../core/admin/settings/user/user.sandbox';
import { RoleApiClientService } from './../../../../core/admin/settings/role/role.ApiClientService';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { SettingsLayoutComponent } from './components/layout/layout.component';
// Routing Module
import { SettingsRoutingModule } from './settings.routing';

// Services and Sandbox
import { CountryService } from '../../../../core/admin/settings/localizations/country/country.service';
import { CurrencySandbox } from '../../../../core/admin/settings/localizations/currency/currency.sandbox';
import { CurrencyService } from '../../../../core/admin/settings/localizations/currency/currency.service';
import { ZoneService } from '../../../../core/admin/settings/localizations/zone/zone.service';
import { ZoneSandbox } from '../../../../core/admin/settings/localizations/zone/zone.sandbox';
import { LanguagesSandbox } from '../../../../core/admin/settings/localizations/languages/languages.sandbox';
import { LanguagesService } from '../../../../core/admin/settings/localizations/languages/languages.service';
// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffect } from '../../../../core/admin/settings/localizations/country/country-effect/country.effect';
import { ZoneEffect } from '../../../../core/admin/settings/localizations/zone/zone-effect/zone.effect';
import { LanguagesEffect } from '../../../../core/admin/settings/localizations/languages/languages-effect/languages.effect';
import { CurrencyEffect } from '../../../../core/admin/settings/localizations/currency/currency-effect/currency.effects';
import { CountrySandbox } from '../../../../core/admin/settings/localizations/country/country.sandbox';
import { PermissionComponent } from './components/access-permission/components/permission/permission.component';
import { PermissionSandbox } from '../../../../core/admin/settings/permission/permission.sandbox';
import { PermissionApiClientService } from '../../../../core/admin/settings/permission/permission.ApiClientService';
import { PermissionEffects } from '../../../../core/admin/settings/permission/permission-effects/permission.effects';
import { ComponentsModule } from '../shared/components';
import { SettingsComponent } from './components/settings/settings/settings.component';
import { RoleAddComponent } from './components/access-permission/components/role/add/add.component';
import { RoleSandbox } from 'src/core/admin/settings/role/role.sandbox';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { NumberAcceptModule } from '../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { SettingsAddonModule } from './components/addon/settings-addon.modules/settings.module';
import { FilterAddonModule } from './components/addon/settings-addon.modules/filter/filter.module';



@NgModule({
    declarations: [SettingsLayoutComponent, PermissionComponent, SettingsComponent],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        FormsModule,
        FilterAddonModule,
        SettingsAddonModule,
        ReactiveFormsModule,
        NumberAcceptModule,
        ComponentsModule,
        EffectsModule.forFeature([
            RoleEffects,
            UserEffect,
            CountryEffect,
            CurrencyEffect,
            LanguagesEffect,
            ZoneEffect, PermissionEffects
        ]),
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [
        UserService,
        UserSandbox,
        RoleApiClientService,
        RoleSandbox,
        CountryService,
        CountrySandbox,
        CurrencySandbox,
        CurrencyService,
        ZoneService,
        ZoneSandbox,
        LanguagesSandbox,
        LanguagesService, PermissionSandbox, PermissionApiClientService,
        DatePipe
    ],
    bootstrap: []
})
export class SettingsModule { }
