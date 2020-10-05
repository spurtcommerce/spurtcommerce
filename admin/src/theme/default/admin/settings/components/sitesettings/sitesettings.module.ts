/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {SideSettingLayoutComponent} from './layout/layout.component';
import {RouterModule, Routes} from '@angular/router';

const Routers: Routes = [
    {path: '', redirectTo: 'appearence', pathMatch: 'full'},
    {
        path: '',
        component: SideSettingLayoutComponent,
        children: [
            {
                path: 'seo',
                loadChildren: './seo/seo.module#SeoModule'
            },
            {
                path: 'social',
                loadChildren: './social/social.module#SocialModule'
            },
            {
                path: '',
                redirectTo: 'seo',
                pathMatch: 'full'
            }
        ]
    }


];
@NgModule({
    declarations: [SideSettingLayoutComponent],
    imports: [
        RouterModule.forChild(Routers)
    ],
    providers: [],
    exports: [RouterModule]
})
export class SiteSettingsModule {

}
