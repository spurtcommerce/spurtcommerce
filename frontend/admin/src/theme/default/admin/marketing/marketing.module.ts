import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketingRoutingModule } from './marketing.routing';
import { MarketingLayoutComponent } from './components/layout/layout.component';
import { MarketingHeaderComponent } from './components/header/header.component';
import { ComponentsModule } from '../shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutsSandbox } from 'src/core/admin/sales/layout/layout.sandbox';
import { LayoutsService } from 'src/core/admin/layout/layout.service';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from 'src/core/admin/catalog/layout/effects/layout.effect';
import { LayoutSandbox } from 'src/core/admin/layout/layout.sandbox';
import { LayoutService } from 'src/core/admin/catalog/layout/layout.service';


@NgModule({
  declarations: [
    MarketingLayoutComponent,
    MarketingHeaderComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
  ],
  providers: [
  ]
})
export class MarketingModule { }


