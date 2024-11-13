import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";
import { SpecificationStaticComponent } from "./specification-static/specification-static.component";







export const service = [];

// components paths
export const componentLists = [SpecificationStaticComponent];

// route paths
export const routePath = [
    {
        path: '', redirectTo: 'specification', pathMatch: 'full'
    },
    {
        path: 'specification', component: SpecificationStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Site Map', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    },

    {
        path: 'specification/:id/:name', component: SpecificationStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Site Map', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    },
    {
        path: 'simple-specification', component: SpecificationStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'edit-seo-url',
            urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage SEO', url: '' },
            { title: 'breadcrumbs.Site Map', url: '' },
            { title: 'breadcrumbs.List', url: '' }]
        }
    }
];