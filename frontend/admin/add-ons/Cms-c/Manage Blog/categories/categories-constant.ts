import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { CategoriesStaticComponent } from "./categories-static/categories-static.component";


// components paths
export const componentLists = [CategoriesStaticComponent]; 

// route paths
export const routePath: Routes = [ 
    { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CategoriesStaticComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-blogs',
      urls: [{ title: 'breadcrumbs.CMS', url: '' }, { title: 'breadcrumbs.Manage Blogs', url: '' },{ title: 'breadcrumbs.Blog Category', url: '' }, { title: 'breadcrumbs.List', url: '' }]
    }
  }
];
