/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {ErrorRoutingModule} from './error-routing.module';
import {NotfoundComponent} from './404/not-found.component';
import {ServerErrorComponent} from './500/server.error.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NotfoundComponent,
    ServerErrorComponent
  ],
  providers: []
})
export class ErrorModule {
}
