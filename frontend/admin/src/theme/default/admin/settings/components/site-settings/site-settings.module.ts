import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteSettingsRoutingModule } from './site-settings.routing';
import { LayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SiteSettingsRoutingModule,
    ComponentsModule,
    TranslateModule.forChild()
  ]
})
export class SiteSettingsModule { }
