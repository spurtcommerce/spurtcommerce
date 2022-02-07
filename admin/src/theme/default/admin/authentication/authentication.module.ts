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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AuthService } from '../../../../core/admin/auth/auth.service';
import { AuthSandbox } from '../../../../core/admin/auth/auth.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../../../core/admin/auth/effects/auth.effect';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    EffectsModule.forRoot([AuthEffects])
  ],
  declarations: [LoginComponent, ForgotPasswordComponent],
  providers: [AuthService, AuthSandbox]
})
export class AuthenticationModule {}
