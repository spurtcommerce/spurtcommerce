
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";

import { Routes } from "@angular/router";
import { QuotationStaticComponent } from "./quotation-static/quotation-static.component";


// components paths
export const componentLists = [QuotationStaticComponent];

// route paths
export const routePath: Routes = [
    {
        path: '', redirectTo: 'quotation-list', pathMatch: 'full'
    },
    {
        path: 'quotation-list', component: QuotationStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'View Order',
            urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Product', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
           }
    },
    
];