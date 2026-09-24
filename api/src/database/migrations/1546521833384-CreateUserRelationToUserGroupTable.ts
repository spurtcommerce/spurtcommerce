import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateUserRelationToUserGroupTable1546521833384 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_users_usergroup',
        columnNames: ['user_group_id'],
        referencedColumnNames: ['group_id'],
        referencedTableName: 'user_group',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('users');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_group_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('users');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_group_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }

}
