import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumDescriptionInPluginTable1762497632126 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 2. Update existing records with example data
        await queryRunner.query(`
      UPDATE plugins SET description = CASE
        WHEN plugin_name = 'CashOnDelivery' THEN 'Enable customers to pay with cash upon delivery.'
        WHEN plugin_name = 'Widget' THEN 'Promotional widgets for displaying marketing content.'
        WHEN plugin_name = 'Seo' THEN 'SEO plugin to optimize pages and content for search engines.'
        WHEN plugin_name = 'Blogs' THEN 'Blog management system for creating and organizing posts.'
        WHEN plugin_name = 'Gmap' THEN 'Integrate Google Maps for displaying store or location data.'
        WHEN plugin_name = 'Paypal' THEN 'Integrate PayPal as a payment gateway.'
        WHEN plugin_name = 'Stripe' THEN 'Enable Stripe payment processing for online purchases.'
        WHEN plugin_name = 'Razorpay' THEN 'Add Razorpay payment gateway support.'
        WHEN plugin_name = 'Facebook' THEN 'Allow login and integration via Facebook API.'
        WHEN plugin_name = 'Gmail' THEN 'Enable Gmail OAuth login for customers.'
        WHEN plugin_name = 'ProductAttribute' THEN 'Manage product attributes such as color and size.'
        WHEN plugin_name = 'ProductQuotation' THEN 'Generate and manage product quotations.'
        WHEN plugin_name = 'ProductRelated' THEN 'Display related products to improve upselling.'
        WHEN plugin_name = 'ProductVariants' THEN 'Manage product variants like size, color, etc.'
        WHEN plugin_name = 'QuestionAndAnswer' THEN 'Allow customers to ask and answer product questions.'
        WHEN plugin_name = 'RatingAndReview' THEN 'Collect and display customer ratings and reviews.'
        WHEN plugin_name = 'AbandonedCart' THEN 'Track and recover abandoned shopping carts.'
        WHEN plugin_name = 'ProductQrCode' THEN 'Generate QR codes for products.'
        WHEN plugin_name = 'CommonCatalog' THEN 'Manage shared product catalogs across stores.'
        WHEN plugin_name = 'Coupon' THEN 'Manage discount coupons and promotional offers.'
        WHEN plugin_name = 'Chat' THEN 'Real-time chat system for store support.'
        WHEN plugin_name = 'ProductPriceGroup' THEN 'Configure personalized pricing groups.'
        WHEN plugin_name = 'WebHook' THEN 'Trigger actions via webhooks on system events.'
        WHEN plugin_name = 'SupplierManagement' THEN 'Manage suppliers and vendor relationships.'
        WHEN plugin_name = 'Shopify' THEN 'Integrate your store with Shopify.'
        WHEN plugin_name = 'Magento' THEN 'Integrate your store with Magento.'
        WHEN plugin_name = 'WooCommerce' THEN 'Integrate your store with WooCommerce.'
        WHEN plugin_name = 'ShoppingCart' THEN 'Core shopping cart functionality for e-commerce.'
        WHEN plugin_name = 'RfqAndQuotes' THEN 'Handle requests for quotes and manage negotiations.'
        WHEN plugin_name = 'SupportTicket' THEN 'Provide a ticket-based customer support system.'
        ELSE 'Plugin description not available.'
      END;
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
