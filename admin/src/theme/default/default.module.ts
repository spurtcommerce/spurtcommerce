/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DefaultRoutingModule } from './default.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultComponent } from './default.component';
import { AdminSharedModule } from './admin/admin.shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DefaultRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminSharedModule.forRoot()
  ],
  bootstrap: [DefaultComponent]
})
export class DefaultModule {}
