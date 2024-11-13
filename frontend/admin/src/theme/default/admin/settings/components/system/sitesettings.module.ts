/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { SideSettingLayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../../../shared/components';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { TranslateModule } from '@ngx-translate/core';



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
                path: 'audit-log',
                loadChildren: () => import('./audit-log/audit-log.module').then(m => m.AuditLogModule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
            },
            // {
            //     path: 'email',
            //     loadChildren: () => import('../personalize/emailtemplate/emailtemplate.module').then(m => m.EmailTemplateModule),
            //     canActivate: [AuthGuard],
            //     data: { permissionForHeader: 'list-email-template', root: 'settingsSite' }
            // },
            { 
                path: 'data-export',
                loadChildren: () => import('./data-export/data-export.module').then(m => m.DataExportModule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
            },
            {
                path: 'data-import',
                loadChildren: () => import('./data-import/data-import.module').then(m => m.DataImportodule),
                canActivate: [AuthGuard],
                // data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
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
        ComponentsModule,
       TranslateModule.forChild()


    ],
    providers: [],
    exports: [RouterModule]
})
export class SiteSettingsModule {


}
