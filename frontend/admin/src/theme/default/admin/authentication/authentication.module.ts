/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
// import { ToastrModule } from 'ng6-toastr-notifications';
import { AuthService } from '../../../../core/admin/auth/auth.service';
import { AuthSandbox } from '../../../../core/admin/auth/auth.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../../../core/admin/auth/effects/auth.effect';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// import { PasswordShowModule } from 'src/core/admin/shared/password-show.directives/passwordShow.module';
import { PasswordShowModule } from '../../../../core/admin/shared/password-show.directives/passwordShow.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgbModule,
    PasswordShowModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(
      {
        easing: 'ease-in',
        maxOpened: 1,
        autoDismiss: true
      }
    ),
    EffectsModule.forFeature([AuthEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  declarations: [LoginComponent, ForgotPasswordComponent],
  providers: [AuthService, AuthSandbox]
})
export class AuthenticationModule { }
