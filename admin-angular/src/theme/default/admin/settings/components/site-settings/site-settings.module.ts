import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteSettingsRoutingModule } from './site-settings.routing';
import { LayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SiteSettingsRoutingModule,
    ComponentsModule
  ]
})
export class SiteSettingsModule { }
