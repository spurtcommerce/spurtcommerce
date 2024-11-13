/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../default/default.material.module';
// components 
import { PaymentListComponent } from './list/list.component';
import { PaymentAddComponent } from './add/add.component';
import { ComponentsModule } from '../../../shared/components';
// third party modules 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../../admin.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// custom modules 
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { DefaultCommonModule } from '../../../../../default/default.common.module';
import { AddonLayoutComponent } from './layout/layout.component';


const Routers: Routes = [
  {
    path: '',
    component: PaymentListComponent,
    canActivate: [AuthGuard],
    data: { root: 'settingsLocal' }
  },
  {
    path:'settings',
    loadChildren:() => import('../addon/settings-addon.modules/settings.module').then(m=>m.SettingsAddonModule)
  },
  
];
@NgModule({
  declarations: [PaymentListComponent,AddonLayoutComponent, PaymentAddComponent],
  imports: [
    RouterModule.forChild(Routers),
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    CommonModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  exports: [RouterModule]
})
export class AddonModule { }
