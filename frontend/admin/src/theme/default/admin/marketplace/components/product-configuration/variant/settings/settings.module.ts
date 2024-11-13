import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { VariantFilterLayoutComponent } from './layout/layout.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/theme/default/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
import { FilterModule } from './filter/filter.module';


@NgModule({
  declarations: [
    VariantFilterLayoutComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    SettingsRoutingModule,
    ComponentsModule,
    FilterModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
  ]
})
export class SettingsModule { }
