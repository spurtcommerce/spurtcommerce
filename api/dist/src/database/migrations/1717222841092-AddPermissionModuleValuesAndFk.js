"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPermissionModuleValuesAndFk1717222841092 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddPermissionModuleValuesAndFk1717222841092 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_permissionModule_tbl_permissionModuleGroup_foreignKey',
            columnNames: ['module_group_id'],
            referencedColumnNames: ['module_group_id'],
            referencedTableName: 'permission_module_group',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getTable = yield queryRunner.getTable('permission_module');
            const ifDataExsist = getTable.foreignKeys.find(fk => fk.columnNames.indexOf('module_group_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(getTable, this.tableForeignKey);
            }
            yield queryRunner.query(`INSERT INTO permission_module (module_id, name, slug_name, sort_order, module_group_id, created_by, created_date, modified_by, modified_date) VALUES
                                (1, 'List Order', 'list-order', 1, 1, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (2, 'Delete Order', 'delete-order', 2, 1, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (3, 'View Order', 'view-order', 3, 1, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (4, 'Export Order', 'export-order', 4, 1, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (5, 'Create Product', 'create-product', 5, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (6, 'Edit Product', 'edit-product', 6, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (7, 'View Product', 'view-product', 7, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (8, 'Delete Product', 'delete-product', 8, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (9, 'Make Feature', 'make-feature', 9, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (10, 'Make Today Deal', 'make-today-deal', 10, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (11, 'Export Product', 'export-product', 11, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (12, 'Create Category', 'create-category', 12, 3, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (13, 'Edit Category', 'edit-category', 13, 3, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (14, 'Delete Category', 'delete-category', 14, 3, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (19, 'Create Customer', 'create-customer', 19, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (20, 'Edit Customer', 'edit-customer', 20, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (21, 'Delete Customer', 'delete-customer', 21, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (22, 'Export Customer', 'export-customer', 22, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (23, 'Export All Customer', 'export-all-customer', 23, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (24, 'View Customer', 'view-customer', 24, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (25, 'Create Customer Group', 'create-customer-group', 25, 7, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (26, 'Edit Customer Group', 'edit-customer-group', 26, 7, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (27, 'Delete Customer Group', 'delete-customer-group', 27, 7, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (28, 'Create Pages', 'create-pages', 28, 8, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (29, 'Edit Pages', 'edit-pages', 29, 8, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (30, 'Delete Pages', 'delete-pages', 30, 8, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (31, 'Create Banners', 'create-banners', 31, 9, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (32, 'Edit Banners', 'edit-banners', 32, 9, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (33, 'Delete Banners', 'delete-banners', 33, 9, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (46, 'Create Role', 'create-role', 46, 14, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (47, 'Edit Role', 'edit-role', 47, 14, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (48, 'Delete Role', 'delete-role', 48, 14, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (49, 'Create User', 'create-user', 49, 15, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (50, 'Edit User', 'edit-user', 50, 15, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (51, 'Delete User', 'delete-user', 51, 15, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (52, 'Edit General Settings', 'edit-general-settings', 52, 16, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (53, 'Edit Personalize Product', 'edit-personalize-product', 53, 17, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (54, 'Edit Personalize Order', 'edit-personalize-order', 54, 17, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (55, 'Edit SEO Url', 'edit-seo-url', 55, 18, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (56, 'Edit Social Url', 'edit-social-url', 56, 18, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (57, 'List Country', 'list-country', 57, 27, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (58, 'Create Country', 'create-country', 58, 27, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (59, 'Edit Country', 'edit-country', 59, 27, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (60, 'Delete Country', 'delete-country', 60, 27, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (61, 'List Zone', 'list-zone', 61, 19, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (62, 'Create Zone', 'create-zone', 62, 19, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (63, 'Edit Zone', 'edit-zone', 63, 19, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (64, 'Delete Zone', 'delete-zone', 64, 19, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (65, 'List Language', 'list-language', 65, 28, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (66, 'Create Language', 'create-language', 66, 28, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (67, 'Edit Language', 'edit-language', 67, 28, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (68, 'Delete Language', 'delete-language', 68, 28, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (69, 'List Currency', 'list-currency', 69, 25, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (70, 'Create Currency', 'create-currency', 70, 25, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (71, 'Edit Currency', 'edit-currency', 71, 25, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (72, 'Delete Currency', 'delete-currency', 72, 25, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (73, 'List Tax', 'list-tax', 73, 26, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (74, 'Create Tax', 'create-tax', 74, 26, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (75, 'Edit Tax', 'edit-tax', 75, 26, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (76, 'Delete Tax', 'delete-tax', 76, 26, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (77, 'List Order Status', 'list-order-status', 77, 29, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (78, 'Create Order Status', 'create-order-status', 78, 29, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (79, 'Edit Order Status', 'edit-order-status', 79, 29, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (80, 'Delete Order Status', 'delete-order-status', 80, 29, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (81, 'List Stock Status', 'list-stock-status', 81, 30, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (82, 'Create Stock Status', 'create-stock-status', 82, 30, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (83, 'Edit Stock Status', 'edit-stock-status', 83, 30, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (84, 'Delete Stock Status', 'delete-stock-status', 84, 30, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (85, 'List Email Template', 'list-email-template', 85, 31, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (86, 'Edit Email Template', 'edit-email-template', 86, 31, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (87, 'Delete Email Template', 'delete-email-template', 87, 31, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (88, 'Create Vendor', 'create-vendor', 88, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (89, 'Edit Vendor', 'edit-vendor', 89, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (90, 'Delete Vendor', 'delete-vendor', 90, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (91, 'Approve Vendor', 'approve-vendor', 91, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (92, 'View Vendor', 'view-vendor', 92, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (93, 'Export Vendor', 'export-vendor', 93, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (94, 'Export All Vendor', 'export-all-vendor', 94, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (95, 'Create Market Place Product', 'create-market-place-product', 95, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (96, 'Edit Market Place Product', 'edit-market-place-product', 96, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (97, 'Approve Market Place Product', 'approve-market-place-product', 97, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (98, 'Delete Market Place Product', 'delete-market-place-product', 98, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (99, 'Export Market Place Product', 'export-market-place-product', 99, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (100, 'Export All Market Place Product', 'export-all-market-place-product', 100, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (101, 'Assign Category', 'assign-category', 101, 22, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (102, 'Set Commission', 'set-commission', 102, 22, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (103, 'Set Vendor Commission', 'set-vendor-commission', 103, 22, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (104, 'List Sales', 'list-sales', 104, 23, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (105, 'List Payment', 'list-payment', 105, 24, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (106, 'Export All Payment', 'export-all-payment', 106, 24, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (107, 'List Product', 'list-product', 107, 2, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (108, 'List Category', 'list-category', 108, 3, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (111, 'List Customer', 'list-customer', 111, 6, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (112, 'List Customer Group', 'list-customer-group', 112, 7, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (113, 'List Pages', 'list-pages', 113, 8, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (114, 'List Banners', 'list-banners', 114, 9, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (117, 'List Role', 'list-role', 117, 14, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (118, 'List User', 'list-user', 118, 15, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (119, 'List Vendor', 'list-vendor', 119, 20, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (120, 'List Market Place Product', 'list-market-place-product', 120, 21, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (121, 'Update Order Status', 'update-order-status', 5, 1, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (122, 'List Sales Payments', 'list-sales-payments', 122, 32, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (123, 'Export All Sales Payments', 'export-all-sales-payments', 123, 32, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (129, 'List Coupon', 'list-coupon', 129, 34, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (130, 'Create Coupon', 'create-coupon', 130, 34, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (131, 'Edit Coupon', 'edit-coupon', 131, 34, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (132, 'Delete Coupon', 'delete-coupon', 132, 34, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (137, 'Add Widget', 'add-widget', 208, 36, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (138, 'Edit Widget', 'edit-widget', 209, 36, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (139, 'Widget list', 'widget-list', 300, 36, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (140, 'Widget Delete', 'widget-delete', 301, 36, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (141, 'List Blogs', 'list-blogs', 133, 37, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (142, 'Create Blogs', 'create-blogs', 134, 37, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (143, 'Edit Blogs', 'edit-blogs', 135, 37, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (144, 'Delete Blogs', 'delete-blogs', 136, 37, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (145, 'Edit Rating Review', 'edit-rating-review', 18, 38, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (146, 'List Rating Review', 'list-rating-review', 110, 38, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (147, 'Create Product Question', 'create-product-question', 212, 39, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (148, 'Update Product Question', 'update-product-question', 213, 39, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (149, 'Product Question List', 'product-question-list', 214, 39, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (150, 'Delete Product Question', 'delete-product-question', 215, 39, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (151, 'Update Question Status', 'update-question-status', 216, 39, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (152, 'Create Product Answer', 'create-product-answer', 217, 40, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (153, 'Update Product Answer', 'update-product-answer', 218, 40, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (154, 'Update Answer Status', 'update-answer-status', 219, 40, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (155, 'Delete Product Answer', 'delete-product-answer', 220, 40, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (156, 'Product Answer List', 'product-answer-list', 221, 40, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (157, 'Product Attribute List', 'product-attribute-list', 235, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (158, 'Add Product Attribute', 'update-product-attribute', 236, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (159, 'Add Attribute', 'add-attribute', 237, 41, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (160, 'Attribute List', 'attribute-list', 238, 41, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (161, 'Edit Attribute', 'edit-attribute', 239, 41, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (162, 'Delete Attribute', 'delete-attribute', 240, 41, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (163, 'Add Attribute Group', 'attribute-group-add', 241, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (164, 'Attribute List', 'attribute-list', 242, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (165, 'Delete Attribute Group', 'attribute-group-delete', 243, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (166, 'Add Variants', 'variant-add', 244, 42, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (167, 'Edit Variant', 'variant-edit', 245, 42, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (168, 'Delete Variant', 'varient-delete', 246, 42, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (169, 'Variant Detail', 'variant-detail', 247, 42, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (170, 'Product Variant List', 'variant-product-list', 251, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (171, 'Edit Product Variant', 'product-variant-update', 252, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (172, 'Add Product Variant', 'product-variant-update', 253, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (173, 'Product Variants Product Detail', 'product-variant-detail', 254, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (174, 'Product Variant Inventory List', 'product-variant-inventory-list', 255, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (175, 'Update Stock', 'stock-update', 256, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (176, 'Delete Product Variant', 'delete-product-variant', 257, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (177, 'Inventory Product List', 'inventory-product-list', 258, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (178, 'Common Catalog Product List ', 'common-catalog-product-list', 259, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (179, 'Set Common Product', 'set-common-product', 260, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (180, 'Set Common Products', 'set-common-products', 261, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (181, 'Common Product Detail', 'common-product-detail', 262, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (182, 'Edit Common Product Status', 'update-common-product-status', 263, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (183, 'Product Quotation List', 'product-quotation-list', 264, 43, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (184, 'Update Quotation Available Status', 'update-quotation-status', 265, 43, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (185, 'Product Quotation Detail', 'update-quotation-status', 266, 43, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (186, 'List Related Products', 'list-related-product', 247, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (187, 'Add Related Products', 'update-related-product', 248, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (188, 'Update Related Products', 'update-related-product', 249, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (189, 'Related Products Detail', 'related-product-detail', 250, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (190, 'Product Attribute List', 'product-attribute-list', 235, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (191, 'Add Product Attribute', 'update-product-attribute', 236, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (192, 'Add Attribute', 'add-attribute', 237, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (193, 'Attribute List', 'attribute-list', 238, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (194, 'Edit Attribute', 'edit-attribute', 239, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (195, 'Delete Attribute', 'delete-attribute', 240, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (196, 'Add Attribute Group', 'attribute-group-add', 241, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (197, 'Attribute List', 'attribute-list', 242, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (198, 'Delete Attribute Group', 'attribute-group-delete', 243, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (199, 'Add Variants', 'variant-add', 244, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (200, 'Edit Variant', 'variant-edit', 245, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (201, 'Delete Variant', 'varient-delete', 246, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (202, 'Variant Detail', 'variant-detail', 247, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (203, 'Product Variant List', 'variant-product-list', 251, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (204, 'Edit Product Variant', 'product-variant-update', 252, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (205, 'Add Product Variant', 'product-variant-update', 253, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (206, 'Product Variants Product Detail', 'product-variant-detail', 254, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (207, 'Product Variant Inventory List', 'product-variant-inventory-list', 255, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (208, 'Update Stock', 'stock-update', 256, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (209, 'Delete Product Variant', 'delete-product-variant', 257, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (210, 'Inventory Product List', 'inventory-product-list', 258, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (211, 'Common Catalog Product List ', 'common-catalog-product-list', 259, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (212, 'Set Common Product', 'set-common-product', 260, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (213, 'Set Common Products', 'set-common-products', 261, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (214, 'Common Product Detail', 'common-product-detail', 262, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (215, 'Edit Common Product Status', 'update-common-product-status', 263, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (216, 'Product Quotation List', 'product-quotation-list', 264, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (217, 'Update Quotation Available Status', 'update-quotation-status', 265, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (218, 'Product Quotation Detail', 'update-quotation-status', 266, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (219, 'List Related Products', 'list-related-product', 247, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (220, 'Add Related Products', 'update-related-product', 248, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (221, 'Update Related Products', 'update-related-product', 249, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31'),
                                (222, 'Related Products Detail', 'related-product-detail', 250, NULL, NULL, '2023-11-23 13:36:31', NULL, '2023-11-23 13:36:31')`);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddPermissionModuleValuesAndFk1717222841092 = AddPermissionModuleValuesAndFk1717222841092;
//# sourceMappingURL=1717222841092-AddPermissionModuleValuesAndFk.js.map