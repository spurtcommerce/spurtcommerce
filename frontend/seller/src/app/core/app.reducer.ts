import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppState as State } from "./app.state.interface";
import * as fromAuth from "./auth/reducer/auth.reducer";
import * as fromProduct from "./product/product-reducer/product.reducer";
import * as fromDelivery from "./delivery/delivery-reducer/delivery.reducer";
import * as fromPayment from "./payment/payment-reducer/payment.reducer";
import * as fromOrder from "./order/order-reducer/order.reducer";
import * as fromMedia from "./media/reducer/media.reducer";
import * as fromCommon from "./common/reducer/common.reducer";
import * as fromDashboard from "./dashboard/reducer/dashboard.reducer";
import * as fromCustomer from "./customers/reducer/customers.reducer";
import * as fromSellerOnBoarding from "./seller-onBoarding/reducer/sellerOnBoarding.reducer";
import * as fromMyProfile from "./myProfile/reducer/myProfile.reducer";
import * as fromstoreFront from "./storeFront/reducer/storeFront.reducer";
import * as fromProducts from "./catalog/product/product-reducer/product.reducer";
import * as fromCrmGroups from "./crmGroups/crmGroups-reducer/crmGroups.reducer"
import * as fromMyShop from './myShop/reducer/myShop.reducer'
import { environment } from "../../environments/environment";

import * as fromEarning from "./earning/reducer/earning.reducer";
import * as fromProducLocalization from "./catalog/product-localization/reducer/product-localization.reducer";
import { AddOnReducers } from "../../../add-ons/add-ons.constant";

export const CoreReducers = {
  auth: fromAuth.reducer,
  product: fromProduct.reducer,
  payment: fromPayment.reducer,
  delivery: fromDelivery.reducer,
  order: fromOrder.reducer,
  media: fromMedia.reducer,
  common: fromCommon.reducer,
  dashboard: fromDashboard.reducer,
  customers: fromCustomer.reducer,
  sellerOnBoarding: fromSellerOnBoarding.reducer,
  myProfile: fromMyProfile.reducer,
  storeFront: fromstoreFront.reducer,
  products:fromProducts.reducer,

  crmGroups:fromCrmGroups.reducer,
  myShop:fromMyShop.reducer,
  earning:fromEarning.reducer,
  productLocalization: fromProducLocalization.reducer,

};

export const reducers: ActionReducerMap<State> = {
  ...CoreReducers,
  ...AddOnReducers,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return function (state: State, action: any): State {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
