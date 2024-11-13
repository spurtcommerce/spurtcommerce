/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalizeLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { TranslateModule } from '@ngx-translate/core';


const Routers: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  {
    path: '',
    component: PersonalizeLayoutComponent,
    children: [
      {
        path: 'product',
        loadChildren: () => import('./product/personalize-product.module').then(m => m.PersonalizeProductModule),
        canActivate: [AuthGuard],
        data: { permission: 'edit-personalize-product' }
      },
      {
        path: 'order',
        loadChildren: () => import('./order/personalize-order.module').then(m => m.PersonalizeOrderModule),
        canActivate: [AuthGuard],
        data: { permission: 'edit-personalize-order' }
      },
      {
        path: 'email-template',
        loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailTemplateModule),
        canActivate: [AuthGuard],
        data: { permission: 'list-email-template' }
      },
      {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
        canActivate: [AuthGuard],
        data: { permission: 'edit-social-url' }
      }
    ]
  }
];
@NgModule({
  declarations: [PersonalizeLayoutComponent],
  imports: [RouterModule.forChild(Routers), ComponentsModule, NgbModule,TranslateModule.forChild()],
  providers: [],
  exports: [RouterModule]
})
export class PersonalizeModule { }
