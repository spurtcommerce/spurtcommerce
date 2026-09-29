import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionVendorPermissionModuleGroup1762931956434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`UPDATE vendor_permission_module_group
        SET description = CASE
        WHEN slug_name = 'orders' THEN 'Manage and track customer orders.'
        WHEN slug_name = 'back-orders' THEN 'Handle back-ordered items awaiting stock replenishment.'
        WHEN slug_name = 'archive-orders' THEN 'Access and manage archived order history.'
        WHEN slug_name = 'product-list' THEN 'View and manage all products in the catalog.'
        WHEN slug_name = 'stock-update' THEN 'Update stock levels for individual or bulk products.'
        WHEN slug_name = 'categories' THEN 'Manage product categories and hierarchy.'
        WHEN slug_name = 'bulk-product-import' THEN 'Import multiple products at once using CSV or Excel files.'
        WHEN slug_name = 'product-localization' THEN 'Manage product translations and localization settings.'
        WHEN slug_name = 'customer' THEN 'View and manage registered customers.'
        WHEN slug_name = 'customer-users' THEN 'Manage sub-users or contacts for each customer account.'
        WHEN slug_name = 'customer-user-role' THEN 'Define roles and permissions for customer users.'
        WHEN slug_name = 'customer-group' THEN 'Create and manage groups of customers for pricing or promotions.'
        WHEN slug_name = 'banners' THEN 'Manage website banners and promotional sliders.'
        WHEN slug_name = 'website-settings' THEN 'Configure overall website display and functionality settings.'
        WHEN slug_name = 'localization-setting' THEN 'Set languages, currencies, and region-based preferences.'
        WHEN slug_name = 'user-and-permission' THEN 'Control system user accounts and permission access.'
        WHEN slug_name = 'system-settings' THEN 'Adjust global system configurations and parameters.'
        WHEN slug_name = 'personalize-settings' THEN 'Customize store appearance and branding preferences.'
        WHEN slug_name = 'order-status-settings' THEN 'Configure order statuses and workflows.'
        WHEN slug_name = 'add-ons-settings' THEN 'Manage installed add-ons and extensions.'
        WHEN slug_name = 'blogs' THEN 'Create and manage blog articles and posts.'
        WHEN slug_name = 'product-attribute' THEN 'Define and manage product attributes like size and color.'
        WHEN slug_name = 'pricing-list' THEN 'Manage pricing rules and customer-specific price lists.'
        WHEN slug_name = 'product-qr' THEN 'Generate and manage product QR codes.'
        WHEN slug_name = 'product-variant' THEN 'Manage product variants such as different sizes or colors.'
        WHEN slug_name = 'variant-stock-update' THEN 'Update stock quantities for specific product variants.'
        WHEN slug_name = 'question-and-answer' THEN 'Allow customers to ask and answer product-related questions.'
        WHEN slug_name = 'rating-and-review' THEN 'Collect and display customer reviews and ratings.'
        WHEN slug_name = 'seo' THEN 'Optimize product and page SEO for better search rankings.'
        WHEN slug_name = 'widgets' THEN 'Manage widgets for website layout and marketing display.'
        WHEN slug_name = 'support-tickets' THEN 'Handle customer support requests through a ticket system.'
        WHEN slug_name = 'shopping-list' THEN 'Enable customers to create and manage shopping lists.'
        WHEN slug_name = 'request-for-quotation' THEN 'Allow customers to submit requests for price quotations.'
        WHEN slug_name = 'quote' THEN 'Manage and send quotations for customer requests.'
        WHEN slug_name = 'contacts' THEN 'View and manage contact or inquiry messages.'
        WHEN slug_name = 'sales-report' THEN 'View and analyze sales reports and performance data.'
        WHEN slug_name = 'export-data' THEN 'Export reports or data for external analysis.'
        WHEN slug_name = 'pages' THEN 'Manage static pages like About Us, Privacy Policy, etc.'
        WHEN slug_name = 'page-group' THEN 'Group and organize CMS pages together.'
        WHEN slug_name = 'integrations' THEN 'Configure integrations with third-party services.'
        ELSE 'Description not available.'
      END;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('vendor_permission_module_group');
        const hasDescription = table?.findColumnByName('description');
        if (hasDescription) {
            await queryRunner.dropColumn('vendor_permission_module_group', 'description');
        }
    }
}
