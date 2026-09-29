import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevertTenantIdForLocalizations1740566672371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const country = await queryRunner.getTable('country');
        if (country) {
            const column = country.columns.find(col => col.name === 'tenant_id');
            if (column) {
                const foreignKey = country.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
                if (foreignKey) {
                    await queryRunner.dropForeignKey('country', foreignKey);
                }
                await queryRunner.dropColumn('country', 'tenant_id');
            }
        }

        const language = await queryRunner.getTable('language');
        if (language) {
            const column = language.columns.find(col => col.name === 'tenant_id');
            if (column) {
                const foreignKey = language.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
                if (foreignKey) {
                    await queryRunner.dropForeignKey('language', foreignKey);
                }
                await queryRunner.dropColumn('language', 'tenant_id');
            }
        }

        const zone = await queryRunner.getTable('zone');
        if (zone) {
            const column = zone.columns.find(col => col.name === 'tenant_id');
            if (column) {
                const foreignKey = zone.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
                if (foreignKey) {
                    await queryRunner.dropForeignKey('zone', foreignKey);
                }
                await queryRunner.dropColumn('zone', 'tenant_id');
            }
        }

        const currency = await queryRunner.getTable('currency');
        if (currency) {
            const column = currency.columns.find(col => col.name === 'tenant_id');
            if (column) {
                const foreignKey = currency.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
                if (foreignKey) {
                    await queryRunner.dropForeignKey('currency', foreignKey);
                }
                await queryRunner.dropColumn('currency', 'tenant_id');
            }
        }

        const tax = await queryRunner.getTable('tax');
        if (tax) {
            const column = tax.columns.find(col => col.name === 'tenant_id');
            if (column) {
                const foreignKey = tax.foreignKeys.find(fk => fk.columnNames.indexOf('tenant_id') !== -1);
                if (foreignKey) {
                    await queryRunner.dropForeignKey('tax', foreignKey);
                }
                await queryRunner.dropColumn('tax', 'tenant_id');
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }
}
