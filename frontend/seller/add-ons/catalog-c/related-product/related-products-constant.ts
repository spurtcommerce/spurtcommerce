// import { AuthGuard } from "src/core/admin/providers/auth.guard";

import { Routes } from "@angular/router";
import { RelatedProductStaticComponent } from "./related-product-static/related-product-static.component";



// components paths
export const componentLists = [RelatedProductStaticComponent]
// route paths
export const routePath: Routes = [ 
    {path:'',redirectTo:'list',pathMatch:'full'},
    {
      path:'list',
      component:RelatedProductStaticComponent
    },

];
