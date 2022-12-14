/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { SideSettingLayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../shared/components';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';



const Routers: Routes = [
    { path: '', redirectTo: 'maintenance', pathMatch: 'full' },
    {
        path: '',
        component: SideSettingLayoutComponent,
        children: [
            // {
            //     path: 'maintenance',
            //     loadChildren: () => import('../site-settings/seo/seo.module').then(m => m.SeoModule),
            //     canActivate: [AuthGuard],
            //     data: { permissionForHeader: 'settings-site-seo', root: 'settingsSite' }
            // },
            // {
            //     path: 'payments',
            //     loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
            //     canActivate: [AuthGuard],
            //     // data: { permissionForHeader: 'settings-site-payments', root: 'settingsSite' }
            // },
            {
                path: 'maintenance',
                loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule),
                canActivate: [AuthGuard],
                data: { permissionForHeader: 'edit-general-settings'}
            },

            {
                path: 'email',
                loadChildren: () => import('./emailtemplate/emailtemplate.module').then(m => m.EmailTemplateModule),
                canActivate: [AuthGuard],
                data: { permissionForHeader: 'list-email-template', root: 'settingsSite' }
            },
            // {
            //     path: 'filter',
            //     loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule),
            //     canActivate: [AuthGuard],
            //     data: { permissionForHeader: 'settings-site-filter', root: 'settingsSite' }
            // },
            // {
            //     path: '',
            //     redirectTo: 'maintenance',
            //     pathMatch: 'full'
            // },
        ]
    }


];
@NgModule({
    declarations: [SideSettingLayoutComponent],
    imports: [
        RouterModule.forChild(Routers),
        ComponentsModule
    ],
    providers: [],
    exports: [RouterModule]
})
export class SiteSettingsModule {

}
