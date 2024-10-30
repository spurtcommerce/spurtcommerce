import { MigrationInterface, QueryRunner, TableColumn, getRepository } from 'typeorm';

export class AddColumnIsGuestCheckoutInSettings1718003184646 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!await queryRunner.hasColumn('settings', 'is_guest_allowed')) {
            await queryRunner.addColumn('settings', new TableColumn(
                {
                    name: 'is_guest_allowed',
                    type: 'int',
                    length: '11',
                    comment: 'IS GUEST OPERATION ALLOWED IN APPLICATION FLAG',
                    isPrimary: false,
                    isNullable: true,
                }
            ));

            const repo = getRepository('Settings');
            const settings: any = await repo.findOne({});

            if (settings) {
                settings.isGuestAllowed = 1;
                await repo.save(settings);
            }
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
