import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth/auth.component';
import { CommonLayoutComponent } from './common/common.component';
import { LayoutSandbox } from '../../../../core/admin/layout/layout.sandbox';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../shared/components';
import { LayoutEffect } from '../../../../core/admin/layout/effects/layout.effects';
import { EffectsModule } from '@ngrx/effects';
import { LayoutsService } from '../../../../core/admin/layout/layout.service';
import { CountrySandbox } from '../../../../core/admin/settings/localizations/country/country.sandbox';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ComponentsModule,
    EffectsModule.forFeature([LayoutEffect]),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,NumberAcceptModule
  ],
  declarations: [
    AuthLayoutComponent,
    CommonLayoutComponent,
    EditprofileComponent
  ],
  providers: [LayoutSandbox, LayoutsService, CountrySandbox]
})
export class ContainersModule {
  static forRoot(): ModuleWithProviders<ContainersModule> {
    return {
      ngModule: ContainersModule
    };
  }
}
