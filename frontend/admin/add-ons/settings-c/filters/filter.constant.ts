
import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { Routes } from "@angular/router";
import { AttributeFilterStaticComponent } from "./attribute-filter-static/attribute-filter-static.component";



// components paths
export const filterAddonComponent = [
  AttributeFilterStaticComponent
]; 

// route paths
export const filterAddonRoute: Routes = [ 
       {
      path:'filter',
      children:[
        { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: AttributeFilterStaticComponent, canActivate: [AuthGuard], data: {
      permission: 'list-attribute',
      urls: [{ title: 'breadcrumbs.Marketplace', url: '' },
      { title: 'Product Configuration', url: '' },
      { title: 'breadcrumbs.Attribute', url: '' },
      { title: 'settings', url: '' },
      { title: 'breadcrumbs.filters', url: '' }]
    }
  },
 
      ]
    },
  ]




                                    