import { Routes } from "@angular/router";
import { AbandonedCartStaticComponent } from "./abandoned-cart-static/abandoned-cart-static.component";


// Compoenets
export const components = [
  AbandonedCartStaticComponent
];

// Routes
export const routes: Routes = [
    {
        path: '', component: AbandonedCartStaticComponent,
        // data: {
        //   // permission: 'list-live-cart' || 'list-abandoned-cart',
        //   urls: [{ title: 'breadcrumbs.Marketplace', url: '' },{title:'breadcrumbs.Manage Sales',url:''},
        //   { title: 'breadcrumbs.Live Carts', url: '' },
        //   ]
        // }
      }
]