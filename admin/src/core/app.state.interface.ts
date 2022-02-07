/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// This should hold the AppState interface
// Ideally importing all the substate for the application
import { AuthState } from './admin/auth/reducer/auth.state';
import { CommonState } from './admin/logout/reducer/common.state';
import { Media } from './admin/catalog/media/reducer/media.state';
import { CategoriesState } from './admin/catalog/category/reducer/categories.state';
import { ChangePasswordState } from './admin/profile/changepassword/changepassword-store/changepassword.state';
import { CustomerState } from './admin/Customers/customers/customer-reducer/customer.state';
import { OrderStatusState } from './admin/settings/localizations/orderstatus/orderstatus-reducer/orderstatus.state';
import { CountryState } from './admin/settings/localizations/country/country-reducer/country.state';
import { ZoneState } from './admin/settings/localizations/zone/zone-reducer/zone.state';
import { RoleState } from './admin/settings/role/role-reducer/role.state';
import { PageState } from './admin/cms/pages/pages-reducer/page.state';
import { UserState } from './admin/settings/user/user-reducer/user.state';
import { BannerState } from './admin/cms/banners/banner-store/banner.state';
import { BrandState } from './admin/catalog/brand/reducer/brand.state';
import { EmailTempState } from './admin/settings/localizations/emailtemplate/emailtemp-reducer/emailtemp.state';
import { StockState } from './admin/settings/localizations/stockStatus/stock-reducer/stock.state';
import { SalesOrderState } from './admin/sales/orders/orders-reducer/orders.state';
import { EditprofileState } from './admin/profile/editprofile/store/editprofile.state';
import { ProductState } from './admin/catalog/product/product-reducer/product.state';
import { DashboardState } from './admin/dashboard/reducer/dashboard.state';
import { GeneralsettingState } from './admin/settings/generalsetting/generalsetting-reducer/generalsetting.state';
import { SocialState } from './admin/settings/siteSettings/social/social-reducer/social.state';
import { SeosettingState } from './admin/settings/siteSettings/seo/seo-reducer/seo-state';
import { CatalogLayoutState } from './admin/catalog/layout/reducer/layout.state';
import { CustomerLayoutState } from './admin/Customers/layout/reducer/layout.state';
import { SalesLayoutState } from './admin/sales/layout/reducer/layout.state';
import { PersonalizeProductState } from './admin/settings/personalize/product/product-reducer/product-state';
import { PersonalizeOrderState } from './admin/settings/personalize/order/order-reducer/order-state';
import { LayoutState } from './admin/layout/reducer/layout.state';
import { CustomersGroupState } from './admin/Customers/customers-group/customers-group-reducer/customers-group.state';

/**
 *
 *
 * @export
 * @ interface AppState
 */
export interface AppState {
  auth: AuthState;
  common: CommonState;
  media: Media;
  categories: CategoriesState;
  product: ProductState;
  changepassword: ChangePasswordState;
  customer: CustomerState;
  orderStatus: OrderStatusState;
  country: CountryState;
  zone: ZoneState;
  role: RoleState;
  pages: PageState;
  user: UserState;
  banner: BannerState;
  brand: BrandState;
  emailtemp: EmailTempState;
  stockstatus: StockState;
  salesorder: SalesOrderState;
  editprofile: EditprofileState;
  dashboard: DashboardState;
  generalsetting: GeneralsettingState;
  social: SocialState;
  seosetting: SeosettingState;
  catalogLayout: CatalogLayoutState;
  customerLayout: CustomerLayoutState;
  salesLayout: SalesLayoutState;
  personalizeProduct: PersonalizeProductState;
  personalizeOrder: PersonalizeOrderState;
  layout: LayoutState;
  customersGroup: CustomersGroupState;

}
