/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AuthState } from './auth/reducer/auth.state';
import { AccountState } from './account/reducer/account.state';
import { ProductControlState } from './product-control/reducer/product-control.state';
import { CommonState } from './common/reducer/common.state';
import { ListsState } from './lists/reducer/lists.state';
import { WishlistState } from './wishlist/reducer/wishlist.state';

export interface AppState {
  auth: AuthState;
  account: AccountState;
  productControl: ProductControlState;
  common: CommonState;
  list: ListsState;
  wishlist: WishlistState;

}
