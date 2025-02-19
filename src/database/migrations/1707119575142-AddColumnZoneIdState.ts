import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnZoneIdState1707119575142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('vendor', 'zone_id');

        if (!columnExist) {
            await queryRunner.addColumn('vendor', new TableColumn(
                {
                    name: 'zone_id',
                    type: 'INT',
                    isPrimary: false,
                    isNullable: true,
                }
            ));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
