/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { CMSLayoutComponent } from './components/layout/layout.component';
import { CMSHeaderComponent } from './components/header/header.component';
// Routing Module
import { CMSRoutingModule } from './cms.routing';

// Shared Module
import { MaterialModule } from '../../default.material.module';

@NgModule({
  declarations: [CMSLayoutComponent, CMSHeaderComponent],
  imports: [
    CommonModule,
    CMSRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [],
  entryComponents: []
})
export class CMSModule {}
