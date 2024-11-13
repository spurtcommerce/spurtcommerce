import { AuthGuard } from "../../../src/app/core/providers/guards/auth-guard";
import { SeoComponent } from "./seo.component";








// services

export const componentServices = [];

// components paths
export const componentLists = [SeoComponent];

// route paths
export const routePath = [


  {
    path: 'seo', component: SeoComponent,
    canActivate: [AuthGuard],
    data: {
        permission: 'edit-seo-url',
        urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
        { title: 'breadcrumbs.Site Map', url: '' },
        { title: 'breadcrumbs.List', url: '' }]
    }
},

{
    path: 'seo/:id', component: SeoComponent,
    canActivate: [AuthGuard],
    data: {
        permission: 'edit-seo-url',
        urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
        { title: 'breadcrumbs.Site Map', url: '' },
        { title: 'breadcrumbs.List', url: '' }]
    }
},

   

];