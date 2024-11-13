import { AuthState } from './auth/reducer/auth.state';
import { ProductState } from './product/product-reducer/product.state';
import { OrderState } from './order/order-reducer/order.state';
import { Media } from './media/reducer/media.state';
import { CommonState } from './common/reducer/common.state';
import { DashboardState } from './dashboard/reducer/dashboard.state';
import { PaymentState } from './payment/payment-reducer/payment.state';
import { DeliveryState } from './delivery/delivery-reducer/delivery.state';
import { AddOnAppState } from '../../../add-ons/add-ons.constant';
import { customer } from './customers/reducer/customers.state';
import { sellerOnBoardingState } from './seller-onBoarding/reducer/sellerOnBoarding.state';
import { MyProfileState } from './myProfile/reducer/myProfile.state';
import { StoreFrontState } from './storeFront/reducer/storeFront.state';
import { ProductStates } from './catalog/product/product-reducer/product.state'

import {crmGroupsState} from './crmGroups/crmGroups-reducer/crmGroups.state'
import { MyShopState } from './myShop/reducer/myShop.state';
import { EarningState } from './earning/reducer/earning.state';
import { ProductLocalizationState } from './catalog/product-localization/reducer/product-localization.state';
interface CoreAppState {
  auth: AuthState;
  media: Media;
  common: CommonState;
  product: ProductState;
  payment: PaymentState;
  order: OrderState;
  delivery: DeliveryState;
  dashboard: DashboardState;
  customers: customer;
  sellerOnBoarding: sellerOnBoardingState;
  myProfile: MyProfileState;
  storeFront: StoreFrontState;
  products: ProductStates;
  crmGroups:crmGroupsState;
  myShop:MyShopState;
  earning:EarningState;
  productLocalization: ProductLocalizationState;

}

export interface AppState extends CoreAppState, AddOnAppState { }
