import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { PostsStaticComponent } from "./posts-static/posts-static.component";

// components paths
export const componentLists = [PostsStaticComponent]; 

// route paths
export const routePath: Routes = [ 
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
        path: 'list', component: PostsStaticComponent,
        canActivate: [AuthGuard],
        data: {
            permission: 'list-blogs',
            urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage Blogs', url: '' },
            { title: 'CMS.Pages.Posts', url: '' },{ title: 'breadcrumbs.List', url: '' }]
        }
    },
   
];
