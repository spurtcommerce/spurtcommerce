/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorHeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { VendorModule } from './marketplace.routing';
import { ComponentsModule } from '../shared/components';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { HeaderLayoutComponent } from './components/header-layout/header-layout.component';

@NgModule({
    declarations: [
        VendorHeaderComponent,HeaderLayoutComponent
    ],
    exports: [
        VendorHeaderComponent,HeaderLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule, ComponentsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: []
})


export class VendorSharedModule {
    static forRoot(): ModuleWithProviders<VendorModule> {
        return {
            ngModule: VendorModule,
            providers: []
        };
    }
 }
