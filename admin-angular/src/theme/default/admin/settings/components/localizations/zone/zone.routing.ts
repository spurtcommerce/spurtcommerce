/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

// Component
import {ZoneAddComponent} from './add/add.component';
import {ZoneListComponent} from './list/list.component';
import { AuthGuard } from '../../../../../../../core/admin/providers/auth.guard';
const zoneRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: ZoneListComponent, canActivate: [AuthGuard],
    data: { permission: 'list-zone' }},
    {path: 'add', component: ZoneAddComponent, canActivate: [AuthGuard],
    data: { permission: 'create-zone' }},
    {
        path: 'edit/:id',
        component: ZoneAddComponent, canActivate: [AuthGuard],
        data: { permission: 'edit-zone' }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(zoneRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ZoneRoutingModule {
}
