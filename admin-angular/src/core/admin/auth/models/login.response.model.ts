/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class LoginResponseModel {
  // Declare Default Params

  public accessToken: string;
  public userdetails: any;
  public permissions: any;

  constructor(loginFormResponse: any) {
    if (loginFormResponse.data) {
      this.accessToken = loginFormResponse.data.token || '';
      this.userdetails = loginFormResponse.data.user || {};
      if (loginFormResponse.data.permission) {
        const permissions = JSON.parse(JSON.stringify(loginFormResponse.data.permission));
        const permissionKeys = loginFormResponse.data.permission ? Object.keys(loginFormResponse.data.permission).filter(function (el) {
          return loginFormResponse.data.permission[el] === true;
        }) : [];

        // SALES
        permissions['sales'] = false;
        permissions['sales-payments'] = false;
        permissions['sales-back-order'] = false;
        permissions['sales-failed-order'] = false;
        permissions['sales-archive-paments'] = false;
        permissions['sales-inventory'] = false;
        permissions['sales-cancel-request'] = false;
        permissions['sales-quotation-request'] = false;
        permissions['sales-orders'] = false;

        // CATALOG
        permissions['catalog'] = false;
        permissions['catalog-product'] = false;
        permissions['catalog-brand'] = false;
        permissions['catalog-category'] = false;
        permissions['catalog-product-option'] = false;
        permissions['catalog-rating-review'] = false;
        permissions['catalog-coupon'] = false;
        permissions['catalog-import'] = false;
        // CUSTOMERS
        permissions['customers'] = false;
        permissions['customers-customer'] = false;
        permissions['customer-groups'] = false;
        // CMS
        permissions['cms'] = false;
        permissions['cms-pages'] = false;
        permissions['cms-page-group'] = false;
        permissions['cms-widgets'] = false;
        permissions['cms-banners'] = false;
        permissions['cms-blogs'] = false;
        // MARKET PLACE
        permissions['marketplace'] = false;
        permissions['marketplace-vendor'] = false;
        permissions['vendor-list'] = false;
        permissions['vendor-product'] = false;
        permissions['vendor-settings'] = false;
        permissions['marketplace-sales'] = false;
        permissions['marketplace-payments'] = false;
        permissions['marketplace-reports'] = false;
        permissions['marketplace-settlement'] = false;
        permissions['marketplace-settlement-order'] = false;
        permissions['marketplace-settlement-history'] = false;
        // SETTINGS
        permissions['settings'] = false;
        permissions['settings-role'] = false;
        permissions['settings-user'] = false;
        permissions['settings-general-setting'] = false;
        permissions['settings-site'] = false;
        permissions['settings-local'] = false;
        permissions['settings-personalize'] = false;
        permissions['settings-site-variant'] = false;
        permissions['settings-site-filter'] = false;
        permissions['settings-site-attribute'] = false;
        permissions['settings-site-attribute-groups'] = false;
        permissions['settings-site-social'] = false;
        permissions['settings-site-seo'] = false;
        // REPORTS
        permissions['reports'] = false;
        permissions['audit-logs'] = false;
        permissions['sales-report'] = false;


        // SALES - ORDERS

        if ((permissionKeys.indexOf('list-order') > -1 && permissions['list-order'])) {
          permissions['sales'] = true;
          permissions['sales-orders'] = true;
        }

        // SALES - PAYMENTS

        if (
          (permissionKeys.indexOf('list-sales-payments') > -1 &&
            permissions['list-sales-payments'])
        ) {
          permissions['sales-payments'] = true;
          permissions['sales'] = true;
        }

        // SALES - BACK ORDER

        if (
          (permissionKeys.indexOf('back-order-list') > -1 &&
            permissions['back-order-list'])
        ) {
          permissions['sales-back-order'] = true;
          permissions['sales'] = true;
        }

        // SALES - FAILED ORDER

        if (
          (permissionKeys.indexOf('failed-order-list') > -1 &&
            permissions['failed-order-list'])
        ) {
          permissions['sales-failed-order'] = true;
          permissions['sales'] = true;
        }

        // SALES - ARCHIVE PAYMENTS

        if (
          (permissionKeys.indexOf('archive-payment-list') > -1 &&
            permissions['archive-payment-list'])
        ) {
          permissions['sales-archive-paments'] = true;
          permissions['sales'] = true;
        }

        // SALES - INVENTORY PRODUTS

        if (
          (permissionKeys.indexOf('inventory-list') > -1 &&
            permissions['inventory-list'])
        ) {
          permissions['sales-inventory'] = true;
          permissions['sales'] = true;
        }

        // SALES - CANCEL REQUESTS

        if (
          (permissionKeys.indexOf('cancel-request-list') > -1 &&
            permissions['cancel-request-list'])
        ) {
          permissions['sales-cancel-request'] = true;
          permissions['sales'] = true;
        }

        // SALES - QUOTATION REQUESTS

        if (
          (permissionKeys.indexOf('quotation-request-list') > -1 &&
            permissions['quotation-request-list'])
        ) {
          permissions['sales-quotation-request'] = true;
          permissions['sales'] = true;
        }

        // CATALOG - PRODUCTS

        if (
          (permissionKeys.indexOf('list-product') > -1 &&
            permissions['list-product'])
        ) {
          permissions['catalog-product'] = true;
          permissions['catalog'] = true;
        }

        // CATALOG - CATEGORY

        if (
          (permissionKeys.indexOf('list-category') > -1 &&
            permissions['list-category'])
        ) {
          permissions['catalog-category'] = true;
          permissions['catalog'] = true;
        }

        // CATALOG - OPTIONS

        if (
          (permissionKeys.indexOf('list-product-option') > -1 &&
            permissions['list-category'])
        ) {
          permissions['catalog-product-option'] = true;
          permissions['catalog'] = true;
        }

        // CATALOG - RATINGS & RIVIEWS

        if (
          permissionKeys.indexOf('list-rating-review') > -1 &&
          permissions['list-rating-review']
        ) {
          permissions['catalog-rating-review'] = true;
          permissions['catalog'] = true;
        }

        // CATALOG - COUPON

        if (
          (permissionKeys.indexOf('list-coupon') > -1 &&
            permissions['list-coupon'])
        ) {
          permissions['catalog-coupon'] = true;
          permissions['catalog'] = true;
        }

        // CATALOG - BRANDS

        if (
          (permissionKeys.indexOf('list-brands') > -1 &&
            permissions['list-brands'])
        ) {
          permissions['catalog-brand'] = true;
          permissions['catalog'] = true;
        }

        // CATALOG - IMPORT

        if (
          (permissionKeys.indexOf('import-product') > -1 &&
            permissions['import-product'])
        ) {
          permissions['catalog-import'] = true;
          permissions['catalog'] = true;
        }

        // CUSTOMERS - CUSTOMER

        if (
          (permissionKeys.indexOf('list-customer') > -1 &&
            permissions['list-customer'])
        ) {
          permissions['customers-customer'] = true;
          permissions['customers'] = true;
        }

        // CUSTOMERS - CUSTOMER GROUP

        if (
          (permissionKeys.indexOf('list-customer-group') > -1 &&
            permissions['list-customer-group'])
        ) {
          permissions['customer-groups'] = true;
          permissions['customers'] = true;
        }

        // CMS - PAGES

        if (
          (permissionKeys.indexOf('list-pages') > -1 &&
            permissions['list-pages'])
        ) {
          permissions['cms-pages'] = true;
          permissions['cms'] = true;
        }

        // CMS - BANNERS

        if (
          (permissionKeys.indexOf('list-banners') > -1 &&
            permissions['list-banners'])
        ) {
          permissions['cms-banners'] = true;
          permissions['cms'] = true;
        }

        // CMS - BLOGS

        if (
          (permissionKeys.indexOf('list-blogs') > -1 &&
            permissions['list-blogs'])
        ) {
          permissions['cms-blogs'] = true;
          permissions['cms'] = true;
        }

        // CMS - PAGE GROUP

        if (
          (permissionKeys.indexOf('page-group-list') > -1 &&
            permissions['page-group-list'])
        ) {
          permissions['cms-page-group'] = true;
          permissions['cms'] = true;
        }

        // CMS - WIDGETS

        if (
          (permissionKeys.indexOf('widget-list') > -1 &&
            permissions['widget-list'])
        ) {
          permissions['cms-widgets'] = true;
          permissions['cms'] = true;
        }

        // MARKETPLACE - VENDOR

        if (
          (permissionKeys.indexOf('list-vendor') > -1 &&
            permissions['list-vendor'])
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-vendor'] = true;
          permissions['vendor-list'] = true;
        }

        // MARKETPLACE - PRODUCT

        if (
          (permissionKeys.indexOf('list-market-place-product') > -1 &&
            permissions['list-market-place-product'])
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-vendor'] = true;
          permissions['vendor-product'] = true;
        }

        // MARKETPLACE - VENDOR SETTINGS

        if (
          (permissionKeys.indexOf('assign-category') > -1 &&
            permissions['assign-category']) ||
          (permissionKeys.indexOf('set-vendor-commission') > -1 &&
            permissions['set-vendor-commission'])
        ) {
          permissions['vendor-settings'] = true;
          permissions['marketplace-vendor'] = true;
          permissions['marketplace'] = true;
        }

        // MARKETPLACE - SALES

        if (
          permissionKeys.indexOf('list-sales') > -1 &&
          permissions['list-sales']
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-sales'] = true;
        }

        // MARKETPLACE - PAYMENTS

        if (
          (permissionKeys.indexOf('list-payment') > -1 &&
            permissions['list-payment'])
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-payments'] = true;
        }

        // MARKETPLACE - REPORTS

        if (
          (permissionKeys.indexOf('sales-by-vendor-report') > -1 &&
            permissions['sales-by-vendor-report']) || (permissionKeys.indexOf('total-sales-report') > -1 &&
              permissions['total-sales-report']) || (permissionKeys.indexOf('settlement-report') > -1 &&
                permissions['settlement-report'])
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-reports'] = true;
        }

        // MARKETPLACE - SETTLEMNTS

        if (
          (permissionKeys.indexOf('settlement order list') > -1 &&
            permissions['settlement order list'])
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-settlement'] = true;
          permissions['marketplace-settlement-order'] = true;
        }

        if (
          (permissionKeys.indexOf('settlement-history-list') > -1 &&
            permissions['settlement-history-list'])
        ) {
          permissions['marketplace'] = true;
          permissions['marketplace-settlement'] = true;
          permissions['marketplace-settlement-history'] = true;
        }

        // SETTINGS - ROLE

        if (
          (permissionKeys.indexOf('list-role') > -1 &&
            permissions['list-role'])
        ) {
          permissions['settings'] = true;
          permissions['settings-role'] = true;
        }

        // SETTINGS - USER

        if (
          (permissionKeys.indexOf('list-user') > -1 &&
            permissions['list-user'])
        ) {
          permissions['settings'] = true;
          permissions['settings-user'] = true;
        }

        // SETTINGS - LOCALIZATIONS - COUNTRY

        if (
          (permissionKeys.indexOf('list-country') > -1 &&
            permissions['list-country'])
        ) {
          permissions['settings-local'] = true;
          permissions['settings'] = true;
        }

        // SETTINGS - LOCALIZATIONS - DELIVERY LOCATION

        if (
          (permissionKeys.indexOf('delivery-location-list') > -1 &&
            permissions['delivery-location-list'])
        ) {
          permissions['settings-local'] = true;
          permissions['settings'] = true;
        }

        // SETTINGS - LOCALIZATIONS - LANGUAGE


        if (
          (permissionKeys.indexOf('list-language') > -1 &&
            permissions['list-language'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - LOCALIZATIONS - CURRENCY

        if (
          (permissionKeys.indexOf('list-currency') > -1 &&
            permissions['list-currency'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - LOCALIZATIONS - TAX

        if (
          (permissionKeys.indexOf('list-tax') > -1 &&
            permissions['list-tax'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - LOCALIZATIONS - ORDER STATUS

        if (
          (permissionKeys.indexOf('list-order-status') > -1 &&
            permissions['list-order-status'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - LOCALIZATIONS - STOCK STATUS

        if (
          (permissionKeys.indexOf('list-stock-status') > -1 &&
            permissions['list-stock-status'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - LOCALIZATIONS - EMAIL TEMPLATE

        if (
          (permissionKeys.indexOf('list-email-template') > -1 &&
            permissions['list-email-template'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - GENERAL SETTINGS

        if (
          (permissionKeys.indexOf('edit-general-settings') > -1 &&
            permissions['edit-general-settings'])
        ) {
          permissions['settings'] = true;
          permissions['settings-general-setting'] = true;
        }

        // SETTINGS - PERSONALIZE

        if (
          (permissionKeys.indexOf('edit-personalize-order') > -1 &&
            permissions['edit-personalize-order'])
        ) {
          permissions['settings'] = true;
          permissions['settings-personalize'] = true;
        }

        if (
          (permissionKeys.indexOf('edit-personalize-product') > -1 &&
            permissions['edit-personalize-product'])
        ) {
          permissions['settings'] = true;
          permissions['settings-personalize'] = true;
        }

        // SETTINGS - SITE SETTINGS - SEO

        if (
          (permissionKeys.indexOf('edit-seo-url') > -1 &&
            permissions['edit-seo-url'])
        ) {
          permissions['settings'] = true;
          permissions['settings-site-seo'] = true;
          permissions['settings-site'] = true;

        }

        // SETTINGS - SITE SETTINGS - SOCIAL

        if (
          (permissionKeys.indexOf('edit-social-url') > -1 &&
            permissions['edit-social-url'])
        ) {
          permissions['settings'] = true;
          permissions['settings-site-social'] = true;
          permissions['settings-site'] = true;

        }

        // SETTINGS - LOCALIZATIONS - ZONE

        if (
          (permissionKeys.indexOf('list-zone') > -1 &&
            permissions['list-zone'])
        ) {
          permissions['settings'] = true;
          permissions['settings-local'] = true;
        }

        // SETTINGS - SITE SETTINGS - VARINAT

        if (
          (permissionKeys.indexOf('variant-list') > -1 &&
            permissions['variant-list'])
        ) {
          permissions['settings-site'] = true;
          permissions['settings'] = true;
          permissions['settings-site-variant'] = true;
        }

        // SETTINGS - SITE SETTINGS - ATTRIBUTE GROUPS

        if (
          (permissionKeys.indexOf('attribute-group-list') > -1 &&
            permissions['attribute-group-list'])
        ) {
          permissions['settings-site'] = true;
          permissions['settings'] = true;
          permissions['settings-site-attribute-group'] = true;
        }

        // SETTINGS - SITE SETTINGS - ATTRIBUTE

        if (
          (permissionKeys.indexOf('list-attribute') > -1 &&
            permissions['list-attribute'])
        ) {
          permissions['settings-site'] = true;
          permissions['settings'] = true;
          permissions['settings-site-attribute'] = true;
        }

        // SETTINGS - SITE SETTINGS - FILTER

        if (
          (permissionKeys.indexOf('filter-list') > -1 &&
            permissions['filter-list'])
        ) {
          permissions['settings-site'] = true;
          permissions['settings'] = true;
          permissions['settings-site-filter'] = true;
        }

        // REPORTS - AUDIT LOGS

        if (
          (permissionKeys.indexOf('audit-log') > -1 &&
            permissions['audit-log'])
        ) {
          permissions['audit-logs'] = true;
          permissions['reports'] = true;
        }

        // REPORTS - SALES REPORT

        if (
          (permissionKeys.indexOf('sales-report-list') > -1 &&
            permissions['sales-report-list'])
        ) {
          permissions['sales-report'] = true;
          permissions['reports'] = true;
        }


        this.permissions = permissions;
        sessionStorage.setItem(
          'permissions',
          JSON.stringify(this.permissions)
        );
      } else {
        this.permissions = {};
      }
    }
  }
  /**
   * Saves user into local storage
   */
  public save(): void {
    sessionStorage.setItem('adminUserdetail', JSON.stringify(this));
    sessionStorage.setItem('adminUser', JSON.stringify(this.userdetails));
  }

  /**
   * Saves user into local storage
   */
  public remove(): void {
    sessionStorage.removeItem('defaultlanguage');
    sessionStorage.removeItem('adminUserdetail');
    sessionStorage.removeItem('adminUser');
    sessionStorage.removeItem('itemsPerPage');
    sessionStorage.removeItem('permissions');
  }
}
