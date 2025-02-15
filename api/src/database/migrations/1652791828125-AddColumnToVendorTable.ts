import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToVendorTable1652791828125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const displayName = new TableColumn({
            name: 'display_name_url',
            type: 'VARCHAR',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });
        const twitter = new TableColumn({
            name: 'twitter',
            type: 'VARCHAR',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });
        const insta = new TableColumn({
            name: 'instagram',
            type: 'VARCHAR',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });
        const youtube = new TableColumn({
            name: 'youtube',
            type: 'VARCHAR',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });
        const facebook = new TableColumn({
            name: 'facebook',
            type: 'VARCHAR',
            length: '255',
            isPrimary: false,
            isNullable: true,
        });

        const table = await queryRunner.getTable('vendor');
        if (table) {
            await queryRunner.addColumns(table, [displayName, insta, facebook, youtube, twitter]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return;
    }

}
