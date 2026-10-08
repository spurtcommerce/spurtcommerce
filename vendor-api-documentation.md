# Vendor API Documentation

## Dashboard

| Module | Component | API |
| ------ | --------- | --- |
| Dashboard | Customer Analytics | `GET /api/product/dashboard/admin-customers-count?duration=1` |
| Dashboard | Customer Analytics | `GET /api/product/top-five-repeatedly-purchased-customers` |
| Dashboard | Order Analytics | `GET /api/vendor/order-graph?duration=1` |
| Dashboard | Overview & Metrics | `GET /api/product/average-conversion-ratio?duration=1` |
| Dashboard | Overview & Metrics | `GET /api/product/dashboard-admin-totalvendor-totalproduct-count` |
| Dashboard | Overview & Metrics | `GET /api/product/dashboard-count` |
| Dashboard | Overview & Metrics | `GET /api/product/recent-selling-product` |
| Dashboard | Overview & Metrics | `GET /api/vendor/total-dashboard-counts` |
| Dashboard | Product Performance | `GET /api/product/top-performing-products?limit=10&offset=0&duration=1&count=false` |
| Dashboard | Product Performance | `GET /api/product/top-selling-productlist` |
| Dashboard | Revenue Overview | `GET /api/vendor-order/revenue-overview?duration=1` |
| Dashboard | Sales & Revenue Analytics | `GET /api/product/average-order-value?duration=1` |
| Dashboard | Sales & Revenue Analytics | `GET /api/product/dashboard/graph-weekly-saleslist?productId=1` |
| Dashboard | Sales & Revenue Analytics | `GET /api/product/orders-count?duration=1` |
| Dashboard | Sales & Revenue Analytics | `GET /api/product/total-revenue?duration=1` |
| Dashboard | Top Selling Products | `GET /api/vendor-order/top-selling-productlist?duration=1` |

## Sales

| Module | Component | API |
| ------ | --------- | --- |
| Sales | Order Details | `GET /api/order/:orderId` |
| Sales | Order Details | `GET /api/order/order-product-log-list?orderProductId=1` |
| Sales | Order Details | `GET /api/order/orderLoglist?orderId=1` |
| Sales | Order Payment | `POST /api/order/update-payment-status` |
| Sales | Order Status | `POST /api/order/order-change-status` |
| Sales | Orders | `DELETE /api/order/delete-order/:id` |
| Sales | Orders | `GET /api/order/export-log-download/:id` |
| Sales | Orders | `GET /api/order/order-excel-list?dateFrom=2026-01-01&dateTo=2026-12-31` |
| Sales | Orders | `GET /api/order/order-export-pdf?orderId=1` |
| Sales | Orders | `GET /api/order?limit=10&offset=0&sortBy=orderDate&sortOrder=DESC&count=false` |
| Sales | Orders | `POST /api/order/create-order` |

## Catalog

| Module | Component | API |
| ------ | --------- | --- |
| Catalog | Bulk Import | `GET /api/vendor-import-datas/error-bulk-import?fileName=error.xlsx` |
| Catalog | Bulk Import | `POST /api/vendor-import-datas` |
| Catalog | Bulk Import | `POST /api/vendor-import-datas/category` |
| Catalog | Bulk Import | `POST /api/vendor-import-datas/import-image` |
| Catalog | Categories | `DELETE /api/category` |
| Catalog | Categories | `GET /api/category/category-detail?categoryId=1` |
| Catalog | Categories | `GET /api/category?limit=10&offset=0&keyword=&status=1&count=false` |
| Catalog | Categories | `GET /api/vendor-product/vendor-category-list?limit=10&offset=0&keyword=&count=false` |
| Catalog | Categories | `POST /api/category` |
| Catalog | Categories | `PUT /api/category/:id` |
| Catalog | Inventory | `GET /api/product/inventory-product-list?limit=10&offset=0&keyword=&sku=&status=1&count=false` |
| Catalog | Inventory | `GET /api/vendor-product/inventory-vendor-product-list?limit=10&offset=0&keyword=&sku=&status=1&count=false` |
| Catalog | Inventory | `GET /api/vendor-product/sku/:skuId` |
| Catalog | Inventory | `POST /api/product/update-stock` |
| Catalog | Inventory | `POST /api/vendor-product/update-stock` |
| Catalog | Product Export | `GET /api/product/allproduct-excel-list` |
| Catalog | Product Export | `GET /api/product/product-excel-list?productId=&keyword=&sku=&status=&count=false` |
| Catalog | Product Export | `GET /api/vendor-product/allproduct-excel-list?dateFrom=2026-01-01&dateTo=2026-12-31&productType=1&title=Export&count=false` |
| Catalog | Product Export | `GET /api/vendor-product/product-excel-list/:logId` |
| Catalog | Product Families & Attributes | `DELETE /api/family/:id` |
| Catalog | Product Families & Attributes | `GET /api/family/:id` |
| Catalog | Product Families & Attributes | `GET /api/family/category?limit=10&offset=0&status=1&keyword=&familyId=1&sortOrder=1&count=0` |
| Catalog | Product Families & Attributes | `GET /api/family?limit=10&offset=0&keyword=&count=0` |
| Catalog | Product Families & Attributes | `POST /api/family` |
| Catalog | Product Families & Attributes | `PUT /api/family/:id` |
| Catalog | Product Import | `GET /api/product/download-product-sample` |
| Catalog | Product Import | `GET /api/vendor-product/download-product-sample` |
| Catalog | Product Import | `POST /api/product/import-product-data` |
| Catalog | Product Tire Price | `DELETE /api/product/delete-tire-price/:id` |
| Catalog | Product Tire Price | `GET /api/product/get-product-tire-price-list?productId=1&limit=10&offset=0&count=false` |
| Catalog | Product Tire Price | `POST /api/product/add-tire-price` |
| Catalog | Products | `DELETE /api/product/:id` |
| Catalog | Products | `DELETE /api/vendor-product/:id` |
| Catalog | Products | `GET /api/product/product-count` |
| Catalog | Products | `GET /api/product/product-detail/:id` |
| Catalog | Products | `GET /api/product/update-owner-product-list?limit=10&offset=0&count=false` |
| Catalog | Products | `GET /api/product/update-vendor-sku-list?limit=10&offset=0` |
| Catalog | Products | `GET /api/product?limit=10&offset=0&keyword=&sku=&status=1&price=100&count=false` |
| Catalog | Products | `GET /api/vendor-product/:id` |
| Catalog | Products | `GET /api/vendor-product?limit=10&offset=0&keyword=&status=1&count=false` |
| Catalog | Products | `POST /api/product` |
| Catalog | Products | `POST /api/product/delete-product` |
| Catalog | Products | `POST /api/product/update-product/:id` |
| Catalog | Products | `POST /api/product/update-sku` |
| Catalog | Products | `POST /api/vendor-product` |
| Catalog | Products | `PUT /api/product/update-product-slug` |
| Catalog | Products | `PUT /api/vendor-product/:id` |
| Catalog | Products | `PUT /api/vendor-product/product-status/:id` |

## Customers

| Module | Component | API |
| ------ | --------- | --- |
| Customers | Customer Addresses | `DELETE /api/address/:id` |
| Customers | Customer Addresses | `GET /api/address/:id?limit=10&offset=0&count=false` |
| Customers | Customer Addresses | `GET /api/address?limit=10&offset=0&count=false` |
| Customers | Customer Addresses | `POST /api/address` |
| Customers | Customer Addresses | `PUT /api/address/:id` |
| Customers | Customer Contacts | `DELETE /api/customer-contact/:id` |
| Customers | Customer Contacts | `GET /api/customer-contact/:id` |
| Customers | Customer Contacts | `GET /api/customer-contact?limit=10&offset=0&keyword=&status=1&email=&count=false` |
| Customers | Customer Contacts | `POST /api/customer-contact` |
| Customers | Customer Contacts | `PUT /api/customer-contact/:id` |
| Customers | Customer Groups | `DELETE /api/vendor-customer-group/:id` |
| Customers | Customer Groups | `GET /api/vendor-customer-group/:id` |
| Customers | Customer Groups | `GET /api/vendor-customer-group/:id/customer?limit=10&offset=0&keyword=&status=1&count=0` |
| Customers | Customer Groups | `GET /api/vendor-customer-group/customer/list` |
| Customers | Customer Groups | `GET /api/vendor-customer-group?limit=10&offset=0&keyword=&groupName=&status=1&count=0` |
| Customers | Customer Groups | `POST /api/vendor-customer-group` |
| Customers | Customer Groups | `PUT /api/vendor-customer-group/:id` |
| Customers | Customer Groups | `PUT /api/vendor-customer-group/:id/customer` |
| Customers | Customer Groups | `PUT /api/vendor-customer-group/status/:id` |
| Customers | Customers | `DELETE /api/vendor-customer/:id` |
| Customers | Customers | `GET /api/vendor-customer/customer-detail/:id` |
| Customers | Customers | `GET /api/vendor-customer/customer-excel-download/:logId` |
| Customers | Customers | `GET /api/vendor-customer/customer-excel-list?dateFrom=2026-01-01&dateTo=2026-12-31&title=Customers&customerId=1` |
| Customers | Customers | `GET /api/vendor-customer/user-list?customerId=1` |
| Customers | Customers | `GET /api/vendor-customer?limit=10&offset=0&keyword=&status=1&email=&count=false` |
| Customers | Customers | `POST /api/vendor-customer` |
| Customers | Customers | `PUT /api/vendor-customer/:id` |

## Marketing

| Module | Component | API |
| ------ | --------- | --- |
| Marketing | Banners | `DELETE /api/banner/:id` |
| Marketing | Banners | `GET /api/banner/banner-detail?bannerId=1` |
| Marketing | Banners | `GET /api/banner?limit=10&offset=0&keyword=&status=1&count=false` |
| Marketing | Banners | `POST /api/banner` |
| Marketing | Banners | `PUT /api/banner/:id` |
| Marketing | Widgets | `DELETE /api/vendor-widget/:id` |
| Marketing | Widgets | `GET /api/vendor-widget/widget-detail?widgetId=1` |
| Marketing | Widgets | `GET /api/vendor-widget?limit=10&offset=0&keyword=&status=1&count=false` |
| Marketing | Widgets | `POST /api/vendor-widget` |
| Marketing | Widgets | `PUT /api/vendor-widget/:id` |

## CMS

| Module | Component | API |
| ------ | --------- | --- |
| CMS | Blog Categories | `DELETE /api/vendor-blog-category/:id` |
| CMS | Blog Categories | `GET /api/vendor-blog-category/blog-category-detail?blogCategoryId=1` |
| CMS | Blog Categories | `GET /api/vendor-blog-category?limit=10&offset=0&keyword=&status=1&count=false` |
| CMS | Blog Categories | `POST /api/vendor-blog-category` |
| CMS | Blog Categories | `PUT /api/vendor-blog-category/:id` |
| CMS | Blogs | `DELETE /api/vendor-blog/:id` |
| CMS | Blogs | `GET /api/vendor-blog/blog-detail?blogId=1` |
| CMS | Blogs | `GET /api/vendor-blog?limit=10&offset=0&keyword=&status=1&count=false` |
| CMS | Blogs | `POST /api/vendor-blog` |
| CMS | Blogs | `PUT /api/vendor-blog/:id` |
| CMS | Page Groups | `DELETE /api/page-group/:id` |
| CMS | Page Groups | `GET /api/page-group/get-page-group/:id` |
| CMS | Page Groups | `GET /api/page-group?limit=10&offset=0&status=1&count=false` |
| CMS | Page Groups | `POST /api/page-group` |
| CMS | Page Groups | `PUT /api/page-group/:id` |
| CMS | Pages | `DELETE /api/page/:id` |
| CMS | Pages | `GET /api/page/:pageId` |
| CMS | Pages | `GET /api/page?limit=10&offset=0&keyword=&status=1&count=false` |
| CMS | Pages | `POST /api/page` |
| CMS | Pages | `PUT /api/page/:id` |

## SEO

| Module | Component | API |
| ------ | --------- | --- |
| SEO | Blog SEO | `GET /api/vendor-blog-seo/:blogId` |
| SEO | Blog SEO | `GET /api/vendor-blog-seo?limit=10&offset=0&keyword=&status=1&count=false` |
| SEO | Blog SEO | `POST /api/vendor-blog-seo/:blogId` |
| SEO | Category SEO | `GET /api/vendor-category-seo/:categoryId` |
| SEO | Category SEO | `GET /api/vendor-category-seo?limit=10&offset=0&keyword=&status=1&count=false` |
| SEO | Category SEO | `POST /api/vendor-category-seo/:categoryId` |
| SEO | Page SEO | `GET /api/vendor-page-seo/:groupId?limit=10&offset=0&keyword=&status=1&count=false` |
| SEO | Page SEO | `GET /api/vendor-page-seo?limit=10&offset=0&keyword=&status=1&count=false` |
| SEO | Page SEO | `POST /api/vendor-page-seo/:pageId` |
| SEO | Product SEO | `GET /api/vendor-product-seo/:productId` |
| SEO | Product SEO | `GET /api/vendor-product-seo?limit=10&offset=0&keyword=&status=1&count=false` |
| SEO | Product SEO | `POST /api/vendor-product-seo/:productId` |
| SEO | Sitemap | `DELETE /api/vendor-site-map/:id` |
| SEO | Sitemap | `GET /api/vendor-site-map/get-sitemap?pathName=sitemap.xml` |
| SEO | Sitemap | `GET /api/vendor-site-map?limit=10&offset=0&count=false` |
| SEO | Sitemap | `POST /api/vendor-site-map` |

## Media

| Module | Component | API |
| ------ | --------- | --- |
| Media | Folder Management | `GET /api/media/vendor-search-folder?folderName=products` |
| Media | Folder Management | `POST /api/media/delete-folder` |
| Media | Folder Management | `POST /api/media/vendor-create-folder` |
| Media | Media Deletion | `GET /api/media/delete-file?fileName=image.jpg` |
| Media | Media Deletion | `POST /api/media/multiple-delete` |
| Media | Media Delivery & Preview | `GET /api/media/document?key=documents/file.pdf` |
| Media | Media Delivery & Preview | `GET /api/media/image-resize?width=100&height=100&name=image.jpg&path=documents/` |
| Media | Media Delivery & Preview | `GET /api/media/image-resizes?name=image.jpg&path=documents/` |
| Media | Media Delivery & Preview | `GET /api/media/plugin?width=100&height=100&name=plugin.jpg&path=plugins/` |
| Media | Media Delivery & Preview | `GET /api/media/video-preview-s3?name=video.mp4&path=video` |
| Media | Media Storage | `GET /api/media/bucket-object-count?folderName=products&limit=10&marker=` |
| Media | Media Storage | `GET /api/media/bucket-object-list?folderName=products&limit=10&marker=` |
| Media | Media Storage | `GET /api/media/vendor-bucket-object-list?folderName=products&limit=10&marker=` |
| Media | Media Upload | `POST /api/media/upload-file` |
| Media | Media Upload | `POST /api/media/upload-multi-image` |
| Media | Media Upload | `POST /api/media/upload-video` |

## Reports

| Module | Component | API |
| ------ | --------- | --- |
| Reports | Export Logs | `GET /api/vendor-export-log?limit=10&offset=0&moduleName=Product&count=false` |
| Reports | Product View Logs | `GET /api/product/customerProductView-list/:id?limit=10&offset=0&count=false` |
| Reports | Product View Logs | `GET /api/product/viewLog-list?limit=10&offset=0&count=false` |
| Reports | Sales Reports | `GET /api/vendor-order/sales-report-export-list?limit=10&offset=0&startDate=2026-01-01&endDate=2026-12-31&count=false` |
| Reports | Sales Reports | `GET /api/vendor-order/sales-report-list?limit=10&offset=0&startDate=2026-01-01&endDate=2026-12-31&count=false` |

## Settings

| Module | Component | API |
| ------ | --------- | --- |
| Settings | Localization - Countries | `GET /api/vendor-country/:countryName` |
| Settings | Localization - Countries | `GET /api/vendor-country?limit=10&offset=0&keyword=&status=1&count=false` |
| Settings | Localization - Countries | `POST /api/vendor-country` |
| Settings | Localization - Currencies | `GET /api/vendor-currency/master-currency?limit=10&offset=0&keyword=&status=1&count=false` |
| Settings | Localization - Languages | `GET /api/vendor-language?limit=10&offset=0&keyword=&status=1&count=false` |
| Settings | Localization - Languages | `POST /api/vendor-language` |
| Settings | Master Lists | `GET /api/vendor-list/addons?limit=10&offset=0&count=false` |
| Settings | Master Lists | `GET /api/vendor-list/industry` |
| Settings | Master Lists | `GET /api/vendor-list/language?limit=10&offset=0&keyword=&status=1&defaultLanguage=` |
| Settings | Master Lists | `GET /api/vendor-list/master-country?limit=10&offset=0&keyword=&count=false` |
| Settings | Master Lists | `GET /api/vendor-list/master-language?limit=10&offset=0&keyword=&count=false` |
| Settings | Master Lists | `GET /api/vendor-list/zone?limit=10&offset=0&countryId=1&keyword=&count=false` |
| Settings | Plugins & Add-ons | `GET /api/vendor-plugins/:id` |
| Settings | Plugins & Add-ons | `GET /api/vendor-plugins?module=payment` |
| Settings | Plugins & Add-ons | `PUT /api/vendor-plugins/:id` |
| Settings | Plugins & Add-ons | `PUT /api/vendor-plugins/additional-info/:id` |
| Settings | Plugins & Add-ons | `PUT /api/vendor-plugins/logo/:id` |
| Settings | Store Settings | `GET /api/vendor-settings` |
| Settings | Store Settings | `GET /api/vendor-settings/:id` |
| Settings | Store Settings | `POST /api/vendor-settings` |

## Vendor Profile

| Module | Component | API |
| ------ | --------- | --- |
| Vendor Profile | Change Password | `PUT /api/vendor-user/change-password` |
| Vendor Profile | User Management | `GET /api/vendor-user/get-profile` |
| Vendor Profile | User Management | `POST /api/vendor-user/edit-profile` |
| Vendor Profile | Vendor Profile | `GET /api/vendor/vendor-profile` |

## Payments

| Module | Component | API |
| ------ | --------- | --- |
| Payments | Payment Terms | `GET /api/vendor-payment-term/dropdown-list` |

## Tax

| Module | Component | API |
| ------ | --------- | --- |
| Tax | Tax Management | `GET /api/vendor-tax/master-tax?limit=10&offset=0&keyword=&status=1&count=false` |
| Tax | Tax Management | `GET /api/vendor-tax?limit=10&offset=0&status=1&count=false` |
| Tax | Tax Management | `POST /api/vendor-tax` |

## Notifications

| Module | Component | API |
| ------ | --------- | --- |
| Notifications | Email Templates | `DELETE /api/vendor-email-template/:id` |
| Notifications | Email Templates | `GET /api/vendor-email-template?limit=10&offset=0&keyword=&count=false` |
| Notifications | Email Templates | `POST /api/vendor-email-template` |
| Notifications | Email Templates | `PUT /api/vendor-email-template/:id` |

## Authentication

| Module | Component | API |
| ------ | --------- | --- |
| Authentication | Vendor Access & Login | `POST /api/demo-vendor/login` |
| Authentication | Vendor Access & Login | `POST /api/demo-vendor/login-new` |
| Authentication | Vendor Access & Login | `POST /api/demo-vendor/send-otp` |

### Vendor API Summary

```text
Total Vendor APIs: 204
Dashboard: 16
Sales: 11
Catalog: 48
Customers: 27
Marketing: 10
Media: 16
Settings: 20
Reports: 5
Other: 51
```

#### Other Modules Sub-Breakdown

- **CMS (Pages, Page Groups, Blogs, Blog Categories)**: 20 APIs
- **SEO (Product SEO, Category SEO, Page SEO, Blog SEO, Sitemap)**: 16 APIs
- **Vendor Profile (Profile, User Account, Password)**: 4 APIs
- **Notifications (Email Templates)**: 4 APIs
- **Tax (Tax Mapping & Master Tax)**: 3 APIs
- **Authentication (Vendor OTP & Demo Login)**: 3 APIs
- **Payments (Payment Terms)**: 1 API

### Unclassified / Excluded APIs

All 204 Vendor endpoints exposed across the 35 Vendor controllers and Media controller have been confidently classified above. No active vendor endpoints remain unclassified.

For completeness, the following 4 endpoints located in `MediaController` are strictly **Admin-only** (or admin store configuration) and were excluded from this vendor documentation:

1. `POST /api/media/create-folder` - `@Authorized('admin')` (Vendor uses `POST /api/media/vendor-create-folder`)
2. `GET /api/media/search-folder` - `@Authorized('admin')` (Vendor uses `GET /api/media/vendor-search-folder`)
3. `GET /api/media/download-file` - `@Authorized()` / admin role
4. `GET /api/media/get-settings` - Retrieves admin global currency settings
