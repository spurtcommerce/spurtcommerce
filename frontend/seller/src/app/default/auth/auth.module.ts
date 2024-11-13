import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VendorRegComponent } from './vendor-reg/vendor-reg.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../core/auth/effects/auth.effect';
import { AuthSandbox } from '../../core/auth/auth.sandbox';
import { AuthApiService } from '../../core/auth/auth.service';
import { RequestInterceptor } from '../../core/providers/interceptor/request.interceptor';
import { SharedModule } from '../shared/shared.module';
import { RecoverpasswordComponent } from './recover-password/recover-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { AuthGuard } from '../../core/providers/guards/auth-guard';
import { TokenExpireComponent } from './token-expire/token-expire.component';
import { TokenInvalidComponent } from './token-invalid/token-invalid.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerficationComponent } from './verfication/verfication.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

// const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// };

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: VendorRegComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  // {
  //   path:'verification',
  //   component:VerficationComponent,
  //   // pathMatch:'full',
  //   canActivate:[AuthGuard]
  // },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login/:id',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'recover-password',
    component: RecoverpasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
  },
  {
    path: 'token-expired',
    component: TokenExpireComponent
  },
  {
    path: 'invalid-token',
    component: TokenInvalidComponent
  },
  {
    path: 'terms-conditions',
    component: TermsAndConditionComponent,
    canActivate: [AuthGuard]

  }
 

];
@NgModule({
  declarations: [
    LoginComponent,
    VendorRegComponent,
    RecoverpasswordComponent,
    SetPasswordComponent,
    TokenExpireComponent,
    TokenInvalidComponent,
    VerficationComponent,
    TermsAndConditionComponent,
    
  ],
  imports: [
    NgbModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    // SwiperModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthSandbox,
    AuthApiService,
    AuthEffects,
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: DEFAULT_SWIPER_CONFIG
    // },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },

  ],
  bootstrap: []
})
export class AuthModule { }
