
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";

import { Routes } from "@angular/router";
import { AssignPriceStaticComponent } from "./assign-price-static/assign-price-static.component";
import { LayoutComponent } from '../../src/app/default/pages/component/new-catalog/layout/layout.component';
// components paths
export const componentLists = [AssignPriceStaticComponent];

// route paths
export const routePath: Routes = [
    {
    path: '',
    component: LayoutComponent,
children:[
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', component: AssignPriceStaticComponent,
        canActivate: [AuthGuard]
    },
]

 
}   

];