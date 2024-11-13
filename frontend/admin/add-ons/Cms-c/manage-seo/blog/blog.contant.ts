import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { BlogStaticComponent } from "./blog-static/blog-static.component";




// components paths
export const componentLists = [BlogStaticComponent];

// route paths
export const routePath: Routes = [
    {
        path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
        path: 'list', component: BlogStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' },{ title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Blog', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
           }
    }
];