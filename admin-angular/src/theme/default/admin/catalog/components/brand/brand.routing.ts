/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

// Component
import { BrandAddComponent } from './add/add.component';
import { BrandListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';


const brandRoutes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
        path: 'list', component: BrandListComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'list-brands',
            urls: [{ title: 'Catalog', url: '' },
            { title: 'Brands', url: '' },
            { title: 'List', url: '' }]
        },
    },
    {
        path: 'add', component: BrandAddComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'create-brands',
            urls: [{ title: 'Catalog', url: '' },
            { title: 'Brands', url: '' },
            { title: 'Add', url: '' }]
        },
    },
    {
        path: 'edit/:id', component: BrandAddComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-brands',
            urls: [{ title: 'Catalog', url: '' },
            { title: 'Brands', url: '' },
            { title: 'Update', url: '' }]
        }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(brandRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BrandRoutingModule {
}
