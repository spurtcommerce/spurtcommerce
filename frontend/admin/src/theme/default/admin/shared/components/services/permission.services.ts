/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';

import { Api } from '../../../../../../core/admin/providers/api/api';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class PermissionServices extends Api {
  private URL = environment.baseUrl;
  permissions: any = []; // Store the actions for which this user has permission
  currentUser: any;
  public permissionConfig: any;



  getPermissionConfig() {
    return this.permissionConfig;
  }


  initializePermissionConfig() {
    this.permissionConfig = {
      buyer: [
        { id: 1, slug: 'buyers-data', url: '/customers/customer', permission: this.hasPermission('buyers-data') ? true : false },
      ],

      seller: [
        { id: 1, slug: 'sellers-data', url: '/seller/seller', permission: this.hasPermission('sellers-data') ? true : false },
        { id: 2, slug: 'seller-group', url: '/seller/seller-group', permission: this.hasPermission('seller-group') ? true : false },
        { id: 3, slug: 'seller-signup-request', url: '/seller/seller-signup', permission: this.hasPermission('seller-signup-request') ? true : false },
        { id: 4, slug: 'seller-onboarding', url: '/seller/seller-onboarding', permission: this.hasPermission('seller-onboarding') ? true : false },

      ],
      support: [
        { id: 1, slug: 'manage-ticket', url: '/support/Manage-ticket-list', permission: this.hasPermission('manage-ticket') ? true : false },
        { id: 2, slug: 'converastion', url: '/support/conversation', permission: this.hasPermission('converastion') ? true : false },
      ],

      chat: [
        { id: 1, slug: 'chat-data', url: '/chatconversation', permission: this.hasPermission('chat-data') ? true : false },
      ],

      marketplaceNew: [
        { id: 1, slug: 'approved-product', url: '/vendors/approval', permission: this.hasPermission('approved-product') ? true : false },
        { id: 2, slug: 'rejected-product', url: '/vendors/reject', permission: this.hasPermission('rejected-product') ? true : false },
        { id: 3, slug: 'waiting-approval-product', url: '/vendors/Waiting', permission: this.hasPermission('waiting-approval-product') ? true : false },
        { id: 4, slug: 'common-product', url: '/vendors/common-vendor-products', permission: this.hasPermission('common-product') ? true : false },
        { id: 5, slug: 'product-categories', url: '/vendors/categories', permission: this.hasPermission('product-categories') ? true : false },
        { id: 6, slug: 'product-data-export', url: '/vendors/export', permission: this.hasPermission('product-data-export') ? true : false },
        { id: 7, slug: 'product-qr', url: '/vendors/product-qr', permission: this.hasPermission('product-qr') ? true : false },
        { id: 8, slug: 'product-order', url: '/vendors/sales', permission: this.hasPermission('product-order') ? true : false },
        { id: 9, slug: 'product-payment', url: '/vendors/payment', permission: this.hasPermission('product-payment') ? true : false },
        { id: 10, slug: 'product-abondoned-carts', url: '/vendors/abandoned', permission: this.hasPermission('product-abondoned-carts') ? true : false },
        { id: 11, slug: 'settlement-product', url: '/vendors/settlement', permission: this.hasPermission('settlement-product') ? true : false },
        { id: 12, slug: 'settlement-product-history', url: '/vendors/settlement', permission: this.hasPermission('settlement-product-history') ? true : false },
        { id: 13, slug: 'product-sales-report', url: '/vendors/reports', permission: this.hasPermission('product-sales-report') ? true : false },
        { id: 14, slug: 'product-total-report', url: '/vendors/sales-report', permission: this.hasPermission('product-total-report') ? true : false },
        { id: 15, slug: 'product-sales-by-seller-report', url: '/vendors/vendor-report', permission: this.hasPermission('product-sales-by-seller-report') ? true : false },
        { id: 16, slug: 'settlement-report', url: '/vendors/settlement-report', permission: this.hasPermission('settlement-report') ? true : false },
      ],



      catalog: [
        { id: 1, slug: 'catalog-product', url: '/catalog/product', permission: this.hasPermission('catalog-product') ? true : false },

        { id: 2, slug: 'catalog-category', url: '/catalog/categories', permission: this.hasPermission('catalog-category') ? true : false },
        { id: 3, slug: 'catalog-brand', url: '/catalog/brand', permission: this.hasPermission('catalog-brand') ? true : false },
        { id: 4, slug: 'catalog-rating-review', url: '/catalog/rating_review', permission: this.hasPermission('catalog-rating-review') ? true : false },
        { id: 5, slug: 'product-varient', url: 'catalog/product_variant/product-list', permission: this.hasPermission('product-varient') ? true : false },
        { id: 6, slug: 'product-attribute', url: '/catalog/product_attribute/product-list', permission: this.hasPermission('product-attribute') ? true : false },
        { id: 6, slug: 'product-qr', url: '/catalog/product-qr/product-qr-list', permission: this.hasPermission('product-qr') ? true : false },
        { id: 6, slug: 'bulk-import-mapping', url: '/catalog/import/data-import', permission: this.hasPermission('bulk-import-mapping') ? true : false },
        { id: 7, slug: 'catalog-import', url: '/catalog/import', permission: this.hasPermission('catalog-import') ? true : false },
        { id: 8, slug: 'catalog-coupon', url: '/marketing/coupon', permission: this.hasPermission('catalog-coupon') ? true : false },
        { id: 9, slug: 'catalog-related-products', url: 'marketing/related_product', permission: this.hasPermission('catalog-related-products') ? true : false },],
      sales: [
        { id: 1, slug: 'sales-orders', url: '/sales/orders', permission: this.hasPermission('sales-orders') ? true : false },
        { id: 2, slug: 'sales-back-order', url: '/sales/backorder', permission: this.hasPermission('sales-back-order') ? true : false },
        { id: 3, slug: 'sales-failed-order', url: '/sales/failed-order', permission: this.hasPermission('sales-failed-order') ? true : false },
        { id: 4, slug: 'sales-payments', url: '/sales/payments', permission: this.hasPermission('sales-payments') ? true : false },
        { id: 5, slug: 'sales-archive-paments', url: '/sales/archive-payments', permission: this.hasPermission('sales-archive-paments') ? true : false },
        { id: 6, slug: 'sales-inventory', url: '/sales/inventory-products', permission: this.hasPermission('sales-inventory') ? true : false },
        { id: 7, slug: 'sales-cancel-request', url: '/sales/cancel-orders', permission: this.hasPermission('sales-cancel-request') ? true : false },
        { id: 8, slug: 'sales-quotation-request', url: '/sales/quotation_requests', permission: this.hasPermission('sales-quotation-request') ? true : false },
        { id: 9, slug: 'sales-abandoned-cart', url: '/sales/abandoned', permission: this.hasPermission('sales-abandoned-cart') ? true : false },
        { id: 6, slug: 'sales-variant-inventory', url: '/sales/varient_inventory', permission: this.hasPermission('sales-variant-inventory') ? true : false },],
      customer: [
        { id: 1, slug: 'customers-customer', url: '/customers/customer', permission: this.hasPermission('customers-customer') ? true : false },
        { id: 2, slug: 'customer-groups', url: '/customers/groups', permission: this.hasPermission('customer-groups') ? true : false },
      ],
      cms: [
        { id: 1, slug: 'cms-pages', url: '/cms/pages', permission: this.hasPermission('cms-pages') ? true : false },
        { id: 2, slug: 'cms-question-answer', url: '/cms/question_answer', permission: this.hasPermission('cms-question-answer') ? true : false },
        { id: 3, slug: 'cms-page-group', url: '/cms/page-group', permission: this.hasPermission('cms-page-group') ? true : false },
        { id: 4, slug: 'cms-banners', url: '/cms/banners', permission: this.hasPermission('cms-banners') ? true : false },
        { id: 5, slug: 'cms-blogs', url: '/cms/blogs', permission: this.hasPermission('cms-blogs') ? true : false },
        { id: 6, slug: 'cms-widgets', url: '/cms/widgets', permission: this.hasPermission('cms-widgets') ? true : false }],
      reports: [
        { id: 1, slug: 'sales-report', url: '/reports/sales-report', permission: this.hasPermission('sales-reports') ? true : false },
        { id: 2, slug: 'audit-logs', url: '/reports/audit-logs', permission: this.hasPermission('audit-logs') ? true : false }],
      marketplace: [
        { id: 1, slug: 'vendor-list', url: '/vendors/vendor/seller', permission: this.hasPermission('vendor-list') ? true : false },
        { id: 2, slug: 'vendor-product', url: '/vendors/vendor/product', permission: this.hasPermission('vendor-product') ? true : false },
        { id: 3, slug: 'vendor-settings', url: '/vendors/vendor/settings', permission: this.hasPermission('vendor-settings') ? true : false },
        { id: 4, slug: 'marketplace-sales', url: '/vendors/sales', permission: this.hasPermission('marketplace-sales') ? true : false },
        { id: 5, slug: 'marketplace-payments', url: '/vendors/payments', permission: this.hasPermission('marketplace-payments') ? true : false },
        { id: 6, slug: 'marketplace-reports', url: '/vendors/reports', permission: this.hasPermission('marketplace-reports') ? true : false },
        { id: 7, slug: 'marketplace-settlement', url: '/vendors/settlement', permission: this.hasPermission('marketplace-settlement') ? true : false },
        { id: 8, slug: 'marketplace-settlement-order', url: '/vendors/settlement/settlement-order', permission: this.hasPermission('marketplace-settlement-order') ? true : false },
        { id: 9, slug: 'marketplace-settlement-history', url: '/vendors/settlement/settlement-history', permission: this.hasPermission('marketplace-settlement-history') ? true : false },
        { id: 10, slug: 'common-product', url: '/vendors/common_catalog', permission: this.hasPermission('common-product') ? true : false },],
      settingsSite: [
        { id: 1, slug: 'settings-site-seo', url: '/settings/site-settings/seo', permission: this.hasPermission('settings-site-seo') ? true : false },
        { id: 2, slug: 'settings-site-social', url: '/settings/site-settings/social', permission: this.hasPermission('settings-site-social') ? true : false },
        { id: 3, slug: 'settings-site-filter', url: '/settings/site-settings/filter', permission: this.hasPermission('settings-site-filter') ? true : false },
        { id: 4, slug: 'settings-site-variant', url: '/settings/site-settings/variants', permission: this.hasPermission('settings-site-variant') ? true : false },
        { id: 5, slug: 'settings-site-attribute', url: '/settings/site-settings/attributes', permission: this.hasPermission('settings-site-attribute') ? true : false },
        { id: 6, slug: 'settings-site-attribute-groups', url: '/settings/site-settings/attributes-group', permission: this.hasPermission('settings-site-attribute-groups') ? true : false },
        { id: 7, slug: 'list-email-template', url: '/settings/site-settings/email', permission: this.hasPermission('list-email-template') ? true : false },
      ],
      settingsLocal: [
        { id: 1, slug: 'list-country', url: '/settings/local/countries', permission: this.hasPermission('list-country') ? true : false },
        { id: 2, slug: 'list-zone', url: '/settings/local/zone', permission: this.hasPermission('list-zone') ? true : false },
        { id: 3, slug: 'delivery-location-list', url: '/settings/local/delivery-location', permission: this.hasPermission('delivery-location-list') ? true : false },
        { id: 4, slug: 'list-language', url: '/settings/local/language', permission: this.hasPermission('list-language') ? true : false },
        { id: 5, slug: 'list-currency', url: '/settings/local/currency', permission: this.hasPermission('list-currency') ? true : false },
        { id: 6, slug: 'list-tax', url: '/settings/local/tax', permission: this.hasPermission('list-tax') ? true : false },
        { id: 7, slug: 'list-order-status', url: '/settings/local/order-status', permission: this.hasPermission('list-order-status') ? true : false },
        { id: 8, slug: 'list-stock-status', url: '/settings/local/stock-status', permission: this.hasPermission('list-stock-status') ? true : false },
        { id: 1, slug: 'settings-user', url: 'settings/access-and-permission/user', permission: this.hasPermission('settings-user') ? true : false },
        { id: 1, slug: 'settings-role', url: 'settings/access-and-permission/role', permission: this.hasPermission('settings-role') ? true : false },
        // { id: 9, slug: 'list-email-template', url: '/settings/sitesettings/email', permission: this.hasPermission('list-email-template') ? true : false },
      ]
    };
  }

  hasPermission(authGroup: string): Promise<boolean> | boolean {

    this.permissions = localStorage.getItem('permissions')? JSON.parse(localStorage.getItem('permissions')):JSON.parse(sessionStorage.getItem('permissions'));
    const role: number = localStorage.getItem('adminUser')?JSON.parse(localStorage.getItem('adminUser')) :JSON.parse(sessionStorage.getItem('adminUser'));
    const permissionKeys = this.permissions
      ? Object.keys(this.permissions)
      : [];



    if (role['usergroup']?.groupId === 1) {
      return true;
    } else if (
      permissionKeys.length > 0 &&
      permissionKeys.indexOf(authGroup) > -1 &&
      this.permissions[authGroup]
    ) {
      return true;
    }
  }

  // This method is called once and a list of permissions is stored in the permissions property
  initializePermissions() {
    return new Promise((resolve, reject) => {
      // Call API to retrieve the list of actions this user is permitted to perform.
      // In this case, the method returns a Promise, but it could have been implemented as an Observable
      this.http
        .get<any>(this.URL + '/permission-module/permission-me')
        .subscribe(
          response => {
            const permissions = response.data;
            const permissionKeys = response.data
              ? Object.keys(response.data).filter(function (el) {
                return response.data[el] === true;
              })
              : [];

            // BUYERS 
            permissions['buyers-data'] = false;


            // SELLER
            permissions['sellers-data'] = false;
            permissions['seller-group'] = false;
            permissions['seller-signup-request'] = false;
            permissions['seller-onboarding'] = false;

            // CHAT
            permissions['chat-data'] = false;


            // SUPPORT
            permissions['manage-ticket'] = false;
            permissions['converastion'] = false;


            // MARKETPLACE NEW
            permissions['approved-product'] = false;
            permissions['rejected-product'] = false;
            permissions['waiting-approval-product'] = false;
            permissions['common-product'] = false;
            permissions['product-categories'] = false;
            permissions['product-data-export'] = false;
            permissions['product-qr'] = false;
            permissions['product-order'] = false;
            permissions['product-payment'] = false;
            permissions['product-abondoned-carts'] = false;
            permissions['settlement-product'] = false;
            permissions['settlement-product-history'] = false;
            permissions['product-sales-report'] = false;
            permissions['product-total-report'] = false;
            permissions['product-sales-by-seller-report'] = false;
            permissions['settlement-report'] = false;




            // SALES
            permissions['sales'] = false;
            permissions['sales-payments'] = false;
            permissions['sales-back-order'] = false;
            permissions['sales-abandoned-cart'] = false;
            permissions['sales-failed-order'] = false;
            permissions['sales-archive-paments'] = false;
            permissions['sales-inventory'] = false;
            permissions['sales-variant-inventory'] = false;
            permissions['sales-cancel-request'] = false;
            permissions['sales-quotation-request'] = false;
            permissions['sales-orders'] = false;
            // CATALOG
            permissions['catalog'] = false;
            permissions['Marketing'] = false;
            permissions['catalog-product'] = false;
            permissions['catalog-coupon'] = false;
            permissions['catalog-related-products'] = false;
            permissions['catalog-brand'] = false;
            permissions['catalog-category'] = false;
            permissions['product-varient'] = false;
            permissions['product-attribute'] = false;
            permissions['product-qr'] = false;
            permissions['bulk-import-mapping'] = false;
            permissions['catalog-product-option'] = false;
            permissions['catalog-rating-review'] = false;
            permissions['catalog-import'] = false;
            // CUSTOMERS
            permissions['customers'] = false;
            permissions['customers-customer'] = false;
            permissions['customer-groups'] = false;
            // CMS
            permissions['cms'] = false;
            permissions['cms-pages'] = false;
            permissions['cms-question-answer'] = false;

            permissions['cms-page-group'] = false;
            permissions['cms-widgets'] = false;
            permissions['cms-banners'] = false;
            permissions['cms-blogs'] = false;
            // MARKET PLACE
            permissions['marketplace'] = false;
            permissions['marketplace-vendor'] = false;
            permissions['vendor-list'] = false;
            permissions['vendor-product'] = false;
            permissions['common-product'] = false;
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


            // BUYERS


            if ((permissionKeys.indexOf('list-buyer') > -1 && permissions['list-buyer'])) {
              permissions['buyers-data'] = true;
              permissions['buyers'] = true;
            }

            // SELLER

            if ((permissionKeys.indexOf('list-seller') > -1 && permissions['list-seller'])) {
              permissions['sellers-data'] = true;
              permissions['sellers'] = true;
            }


            // SELLER GROUP
            if ((permissionKeys.indexOf('list-seller-group') > -1 && permissions['list-seller-group'])) {
              permissions['seller-group'] = true;
              permissions['sellers'] = true;
            }

            // SELLER SIGNUP REQUEST
            if ((permissionKeys.indexOf('list-seller-signup-request') > -1 && permissions['list-seller-signup-request'])) {
              permissions['seller-signup-request'] = true;
              permissions['sellers'] = true;
            }


            // SELLER ON BOARDING
            if ((permissionKeys.indexOf('approval-pending-list') > -1 && permissions['approval-pending-list'])) {
              permissions['seller-onboarding'] = true;
              permissions['sellers'] = true;
            }

            if ((permissionKeys.indexOf('approved-list') > -1 && permissions['approved-list'])) {
              permissions['seller-onboarding'] = true;
              permissions['sellers'] = true;
            }

            if ((permissionKeys.indexOf('rejected-list') > -1 && permissions['rejected-list'])) {
              permissions['seller-onboarding'] = true;
              permissions['sellers'] = true;
            }

            // SUPPORT

            if ((permissionKeys.indexOf('ticket-list') > -1 && permissions['ticket-list'])) {
              permissions['manage-ticket'] = true;
              permissions['support'] = true;
            }

            if ((permissionKeys.indexOf('converastion-list') > -1 && permissions['converastion-list'])) {
              permissions['converastion'] = true;
              permissions['support'] = true;
            }

            // CHAT
            if ((permissionKeys.indexOf('chat-list') > -1 && permissions['chat-list'])) {
              permissions['chat-data'] = true;
              permissions['chat'] = true;
            }


            // MARKETPLACE NEW

            // Manage Product
            if ((permissionKeys.indexOf('list-approved-products') > -1 && permissions['list-approved-products'])) {
              permissions['approved-product'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('list-rejected-products') > -1 && permissions['list-rejected-products'])) {
              permissions['rejected-product'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('list-waiting-for-approval') > -1 && permissions['list-waiting-for-approval'])) {
              permissions['waiting-approval-product'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('list-common-products') > -1 && permissions['list-common-products'])) {
              permissions['common-product'] = true;
              permissions['marketplace-new'] = true;
            }


            // Product Configuration

            if ((permissionKeys.indexOf('list-category') > -1 && permissions['list-category'])) {
              permissions['product-categories'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('export-list') > -1 && permissions['export-list'])) {
              permissions['product-data-export'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('list-product-qr') > -1 && permissions['list-product-qr'])) {
              permissions['product-qr'] = true;
              permissions['marketplace-new'] = true;
            }


            // Manage Sales

            if ((permissionKeys.indexOf('list-order') > -1 && permissions['list-order'])) {
              permissions['product-order'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('list-payment') > -1 && permissions['list-payment'])) {
              permissions['product-payment'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('list-abandoned-cart') > -1 && permissions['list-abandoned-cart'])) {
              permissions['product-abondoned-carts'] = true;
              permissions['marketplace-new'] = true;
            }

            // Manage Settlements

            if ((permissionKeys.indexOf('settlement order list') > -1 && permissions['settlement order list'])) {
              permissions['settlement-product'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('history-settlement') > -1 && permissions['history-settlement'])) {
              permissions['settlement-product-history'] = true;
              permissions['marketplace-new'] = true;
            }



            // MARKETPLACE REPORTS
            if ((permissionKeys.indexOf('list-sales-report') > -1 && permissions['list-sales-report'])) {
              permissions['product-sales-report'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('total-sales-report') > -1 && permissions['total-sales-report'])) {
              permissions['product-total-report'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('sales-by-vendor-report') > -1 && permissions['sales-by-vendor-report'])) {
              permissions['product-sales-by-seller-report'] = true;
              permissions['marketplace-new'] = true;
            }
            if ((permissionKeys.indexOf('settlement-report-list') > -1 && permissions['settlement-report-list'])) {
              permissions['list-settlement-report'] = true;
              permissions['marketplace-new'] = true;
            }




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


            if (
              ((permissionKeys.indexOf('list-abandoned-cart') > -1 &&
                permissions['list-abandoned-cart']) || (permissionKeys.indexOf('list-live-cart') > -1 &&
                  permissions['list-live-cart']))
            ) {
              permissions['sales-abandoned-cart'] = true;
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


            if (
              (permissionKeys.indexOf('product-variant-inventory-list') > -1 &&
                permissions['product-variant-inventory-list'])
            ) {
              permissions['sales-variant-inventory'] = true;
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
              (permissionKeys.indexOf('product-quotation-list') > -1 &&
                permissions['product-quotation-list'])
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



            if (
              (permissionKeys.indexOf('variant-product-list') > -1 &&
                permissions['variant-product-list'])
            ) {
              permissions['product-varient'] = true;
              permissions['catalog'] = true;
            }


            if (
              (permissionKeys.indexOf('product-attribute-list') > -1 &&
                permissions['product-attribute-list'])
            ) {
              permissions['product-attribute'] = true;
              permissions['catalog'] = true;
            }

            if (
              (permissionKeys.indexOf('list') > -1 &&
                permissions['list'])
            ) {
              permissions['bulk-import-mapping'] = true;
              permissions['catalog'] = true;
            }


            if (
              (permissionKeys.indexOf('list-product-qr') > -1 &&
                permissions['list-product-qr'])
            ) {
              permissions['product-qr'] = true;
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
              permissions['cms'] = true;
            }

            // CATALOG - COUPON

            if (
              (permissionKeys.indexOf('list-coupon') > -1 &&
                permissions['list-coupon'])
            ) {
              permissions['catalog-coupon'] = true;
              permissions['Marketing'] = true;
            }


            if (
              (permissionKeys.indexOf('list-related-product') > -1 &&
                permissions['list-related-product'])
            ) {
              permissions['catalog-related-products'] = true;
              permissions['Marketing'] = true;
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


            if (
              (permissionKeys.indexOf('product-question-list') > -1 &&
                permissions['product-question-list'])
            ) {
              permissions['cms-question-answer'] = true;
              permissions['cms'] = true;
            }

            if (
              (permissionKeys.indexOf('product-answer-list') > -1 &&
                permissions['product-answer-list'])
            ) {
              permissions['cms-question-answer'] = true;
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


            if (
              (permissionKeys.indexOf('common-catalog-product-list') > -1 &&
                permissions['common-catalog-product-list'])
            ) {
              permissions['marketplace'] = true;
              permissions['marketplace-vendor'] = true;
              permissions['common-product'] = true;
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

            // SETTINGS - LOCALIZATIONS - DELIVERY LOCATION LIST

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
              permissions['settings-site-attribute-groups'] = true;
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
            sessionStorage.setItem('permissions',JSON.stringify(this.permissions));
            localStorage.setItem('permissions',JSON.stringify(this.permissions));
            resolve(true);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
