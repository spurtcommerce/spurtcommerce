/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { StockStatusAddComponent } from './add/add.component';
import { StockStatusListComponent } from './list/list.component';

// Routing Module
import { StockStatusRoutingModule } from './stockstatus.routing';

// Shared Module
import { MaterialModule } from '../../../../../default.material.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [StockStatusAddComponent, StockStatusListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StockStatusRoutingModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: []
})
export class StockStatusModule {}
