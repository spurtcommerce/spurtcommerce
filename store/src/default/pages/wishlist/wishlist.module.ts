/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WishlistComponent } from './wishlist.component';
import {ComponentsModule} from '../../shared/components/index';
import { PipesModule } from '../../shared/pipes/pipes.module';

// store
import {EffectsModule} from '@ngrx/effects';
import {WishlistEffect} from '../../../core/wishlist/effects/wishlist.effect';
import {WishlistSandbox} from '../../../core/wishlist/wishlist.sandbox';
import {WishlistService} from '../../../core/wishlist/wishlist.service';


export const routes = [
  { path: '', component: WishlistComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
      ComponentsModule,
      PipesModule
  ],
  declarations: [
    WishlistComponent
  ],
    providers: []
})
export class WishlistModule { }
