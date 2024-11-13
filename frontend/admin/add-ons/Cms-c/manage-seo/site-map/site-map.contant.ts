import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { SiteMapStaticComponent } from "./site-map-static/site-map-static.component";



// components paths
export const componentLists = [SiteMapStaticComponent];

// route paths
export const routePath: Routes = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', component: SiteMapStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Site Map', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    }
];