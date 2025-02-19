import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInOrderTable1565606134069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const ifExist = await queryRunner.hasColumn('order', 'currency_symbol_left');
        if (!ifExist) {
            await queryRunner.addColumn('order', new TableColumn({
                name: 'currency_symbol_left',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
                collation: 'utf8mb4_unicode_ci',
            }));
        }
        const ifExistColumn = await queryRunner.hasColumn('order', 'currency_symbol_right');
        if (!ifExistColumn) {
        await queryRunner.addColumn('order', new TableColumn({
            name: 'currency_symbol_right',
            type: 'varchar',
            length: '255',
            isPrimary: false,
            isNullable: true,
            collation: 'utf8mb4_unicode_ci',
        }));
      }
       await queryRunner.query('ALTER TABLE `product` CHANGE `price` `price` decimal(10,2) DEFAULT NULL');
       await queryRunner.query('ALTER TABLE `country` CHANGE `country_id` `country_id` INT(11)AUTO_INCREMENT ');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'currency_symbol_left');
        await queryRunner.dropColumn('order', 'currency_symbol_right');
    }

}
