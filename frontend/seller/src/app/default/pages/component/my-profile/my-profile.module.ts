import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../../src/app/default/shared/shared.module';
import { MyProfileEffect } from '../../../../../../src/app/core/myProfile/effects/myProfile.effect';
import { MyProfileService } from '../../../../../../src/app/core/myProfile/myProfile.service';
import { MyProfileSandbox } from '../../../../../../src/app/core/myProfile/myProfile.sandbox';
import { NgOtpInputModule } from  'ng-otp-input';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCatalogModule } from '../new-catalog/new-catalog.module';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    MyProfileComponent,
    OtpVerificationComponent,
  ],
  imports: [
    NgbModalModule,
    CommonModule,
    MyProfileRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([MyProfileEffect]),
    NgSelectModule,
    TranslateModule,
    NgOtpInputModule,
    NewCatalogModule

  ],
  providers:[MyProfileService,MyProfileSandbox ,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // This sets the locale to British, which uses dd/MM/yyyy format
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },]
})
export class MyProfileModule { }
