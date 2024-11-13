import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { PageSeoStaticComponent } from "./page-seo-static/page-seo-static.component";

// components paths
export const componentLists = [PageSeoStaticComponent];

// route paths
export const routePath: Routes = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', component: PageSeoStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Pages', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    }
];