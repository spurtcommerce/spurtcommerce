import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderProductArchive1759747354122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order_product_archive',
            columns: [
                { name: 'order_product_archive_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment', isNullable: false },
                { name: 'order_archive_id', type: 'int', isNullable: true },
                { name: 'order_product_id', type: 'int', isNullable: true },
                { name: 'order_id', type: 'int', isNullable: true },
                { name: 'product_id', type: 'int', isNullable: true },
                { name: 'order_product_prefix_id', type: 'varchar', length: '255', isNullable: true },
                { name: 'name', type: 'varchar', length: '255', isNullable: true },
                { name: 'model', type: 'varchar', length: '255', isNullable: true },
                { name: 'quantity', type: 'int', isNullable: true },
                { name: 'product_price', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'discount_amount', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'base_price', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'tax_type', type: 'int', isNullable: true },
                { name: 'tax_value', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'total', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'discounted_amount', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'order_status_id', type: 'int', isNullable: true },
                { name: 'fullfillment_status_id', type: 'int', isNullable: true },
                { name: 'tags', type: 'varchar', length: '255', isNullable: true },
                { name: 'tracking_url', type: 'varchar', length: '255', isNullable: true },
                { name: 'tracking_no', type: 'varchar', length: '255', isNullable: true },
                { name: 'trace', type: 'int', isNullable: true },
                { name: 'tax', type: 'decimal', precision: 10, scale: 2, isNullable: true },
                { name: 'cancel_request', type: 'int', isNullable: true },
                { name: 'cancel_request_status', type: 'int', isNullable: true },
                { name: 'cancel_reason', type: 'varchar', length: '255', isNullable: true },
                { name: 'cancel_reason_description', type: 'text', isNullable: true },
                { name: 'is_active', type: 'int', isNullable: true },
                { name: 'sku_name', type: 'varchar', length: '255', isNullable: true },
                { name: 'coupon_discount_amount', type: 'varchar', length: '255', isNullable: true },
                { name: 'price_group_detail_id', type: 'int', isNullable: true },
                // BaseModel columns
                { name: 'created_by', type: 'int', isNullable: true },
                { name: 'created_date', type: 'timestamp', isNullable: true },
                { name: 'modified_by', type: 'int', isNullable: true },
                { name: 'modified_date', type: 'timestamp', isNullable: true },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
