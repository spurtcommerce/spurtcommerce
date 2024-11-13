import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { CategorySeoStaticComponent } from "./category-seo-static/category-seo-static.component";

// components paths
export const componentLists = [CategorySeoStaticComponent];

// route paths
export const routePath: Routes = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', component: CategorySeoStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Category', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
           }
    }
];