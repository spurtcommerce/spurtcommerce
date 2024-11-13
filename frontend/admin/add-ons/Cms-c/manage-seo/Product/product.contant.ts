import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { ProductSeoStaticComponent } from "./product-seo-static/product-seo-static.component";

// components paths
export const componentLists = [ProductSeoStaticComponent];

// route paths
export const routePath: Routes = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', component: ProductSeoStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Product', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
           }
    }
];