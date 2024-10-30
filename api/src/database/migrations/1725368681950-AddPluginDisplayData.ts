import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddPluginDisplayData1725368681950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('plugins', 'display_name');
        if (columnExist) {
            const data = [
                {
                    id: 1,
                    displayName: 'Cash On Delivery',
                },
                {
                    id: 2,
                    displayName: 'Promotional Widgets',
                },
                {
                    id: 3,
                    displayName: 'SEO',
                },
                {
                    id: 4,
                    displayName: 'Blogs',
                },
                {
                    id: 19,
                    displayName: 'Gmap',
                },
                {
                    id: 23,
                    displayName: 'Paypal',
                },
                {
                    id: 24,
                    displayName: 'Stripe',
                },
                {
                    id: 25,
                    displayName: 'Razorpay',
                },
                {
                    id: 26,
                    displayName: 'Facebook',
                },
                {
                    id: 27,
                    displayName: 'Gmail',
                },
                {
                    id: 29,
                    displayName: 'Product Attributes',
                },
                {
                    id: 30,
                    displayName: 'Product Quotation',
                },
                {
                    id: 31,
                    displayName: 'Related Products',
                },
                {
                    id: 32,
                    displayName: 'Product Variants',
                },
                {
                    id: 33,
                    displayName: 'Question And Answer',
                },
                {
                    id: 34,
                    displayName: 'Rating And Review',
                },
                {
                    id: 35,
                    displayName: 'Abandoned Cart',
                },
                {
                    id: 40,
                    displayName: 'Product QR',
                },
                {
                    id: 41,
                    displayName: 'Common Products',
                },
                {
                    id: 42,
                    displayName: 'Coupon',
                },
                {
                    id: 43,
                    displayName: 'Chat',
                },
                {
                    id: 42,
                    displayName: 'Coupon',
                },
                {
                    id: 44,
                    displayName: 'personalized pricing',
                },
                {
                    id: 45,
                    displayName: 'Web Hook (Tech Addon)',
                },
            ];
            await getRepository('plugins').save(data);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
