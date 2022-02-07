/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// components
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CONTAINERS } from './common/index';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { AuthGuard } from '../core/service/auth.guard';
import { LayoutAuthGuard } from '../core/service/layout_auth.guard';
import { UnderDevelopingComponent } from './pages/layout/under-developing/under-developing.component';
import { GetDirectionsComponent } from './shared/get-directions/get-directions.component';

export const routes: Routes = [
  {
    path: '',
    component: CONTAINERS.LayoutContainerComponent,
    canActivate: [LayoutAuthGuard],
    children: [
      {
        path: '',
        loadChildren: './pages/home/home.module#HomeModule'
      },
      {
        path: 'home',
        loadChildren: './pages/home/home.module#HomeModule'
      },

      {
        path: 'underdeveloping',
        component: UnderDevelopingComponent,
        data: {
          urls: [{ title: 'UNDER DEVELOPING', url: '' }]
        }
      },
      {
        path: 'getdirections',
        component: GetDirectionsComponent,
        data: {
          urls: [{ title: 'Get Directions', url: '' }]
        }
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: './pages/account/account.module#AccountModule',
        data: {
          urls: [{ title: 'Account Settings', url: '' }]
        }
      },
      {
        path: 'cart',
        loadChildren: './pages/cart/cart.module#CartModule',
        data: {
          urls: [{ title: 'Cart', url: '' }]
        }
      },
      {
        path: 'checkout',
        // canActivate: [AuthGuard],
        loadChildren: './pages/checkout/checkout.module#CheckoutModule',
        data: {
          urls: [{ title: 'Checkout', url: '' }]
        }
      },
      {
        path: 'contact',
        loadChildren: './pages/contact/contact.module#ContactModule',
        // canActivate: [AuthGuard],
        data: {
          urls: [{ title: 'Contact', url: '' }]
        }
      },
      {
        path: 'auth',
        canActivate: [AuthGuard],
        loadChildren:
          './pages/Authentication/authentication.module#AuthenticationModule',
        data: {
          urls: [{ title: 'Sign In', url: '' }]
        }
      },
      {
        path: 'page-detail/:id',
        component: DetailPageComponent
      },
      {
        path: 'products',
        loadChildren: './pages/products/products.module#ProductsModule'
      },
      {
        path: 'products/:id',
        loadChildren: './pages/products/products.module#ProductsModule',
        data: {
          urls: [{ title: 'Product Detail ', url: '' }]
        }
      },
      {
        path: 'wishlist',
        canActivate: [AuthGuard],
        loadChildren: './pages/wishlist/wishlist.module#WishlistModule',
        data: {
          urls: [{ title: 'Wishlist', url: '' }]
        }
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule {}
