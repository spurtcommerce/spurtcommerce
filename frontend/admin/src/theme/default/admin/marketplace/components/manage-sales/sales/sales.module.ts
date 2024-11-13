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
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SalesLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../../shared/components';
import { VendorSharedModule } from '../../../marketplace.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
import { Title } from '@angular/platform-browser';
const salesRoutes: Routes = [
    {
        path: '', component: SalesLayoutComponent,
        children: [
            // { path: '', redirectTo: 'order', pathMatch: 'full'},
            { path: 'order',
            loadChildren: () => import('./pages/order/order.module').then(m => m.SalesOrderModule),
            canActivate: [AuthGuard],
            data: {root: 'marketplace-new', permissionForHeader: 'product-order'}
            },
        ]
    },
];
@NgModule({
    declarations: [SalesLayoutComponent
    
    ],
    imports: [
        RouterModule.forChild(salesRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    providers: [Title],
    bootstrap: []
})
export class VendorSalesModule {}
