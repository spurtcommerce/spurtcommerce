import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCollumnsSettingsTable1743163860003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const cancelTheresholdColumnExist = await queryRunner.hasColumn('settings', 'order_cancel_status_id');
        if (!cancelTheresholdColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'order_cancel_status_id',
                type: 'int',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const cancellationTypeColumnExist = await queryRunner.hasColumn('settings', 'cancellation_type');
        if (!cancellationTypeColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'cancellation_type',
                type: 'tinyint',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const autoApproveColumnExist = await queryRunner.hasColumn('settings', 'is_auto_approve_cancellation');
        if (!autoApproveColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'is_auto_approve_cancellation',
                type: 'tinyint',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const sellerApprovalTimeframeUnitColumnExist = await queryRunner.hasColumn('settings', 'seller_approval_timeframe_unit');
        if (!sellerApprovalTimeframeUnitColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'seller_approval_timeframe_unit',
                type: 'enum',
                enum: ['hours', 'days', 'weeks'],
                isNullable: true,
            }));
        }

        const sellerApprovalTimeframeValueColumnExist = await queryRunner.hasColumn('settings', 'seller_approval_timeframe_value');
        if (!sellerApprovalTimeframeValueColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'seller_approval_timeframe_value',
                type: 'int',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const productCancellableColumnExist = await queryRunner.hasColumn('settings', 'is_product_cancellable');
        if (!productCancellableColumnExist) {
            await queryRunner.addColumn('settings', new TableColumn({
                name: 'is_product_cancellable',
                type: 'tinyint',
                isPrimary: false,
                isNullable: true,
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
