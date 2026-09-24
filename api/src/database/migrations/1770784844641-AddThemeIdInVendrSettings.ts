import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddThemeIdInVendrSettings1770784844641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // column add
        await queryRunner.addColumn('vendor_settings', new TableColumn({
          name: 'theme_id',
          type: 'int',
          isNullable: true,
        }));

        // foreign key add
        await queryRunner.createForeignKey('vendor_settings', new TableForeignKey({
          columnNames: ['theme_id'],
          referencedTableName: 'vendor_themes',
          referencedColumnNames: ['theme_id'],
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }));
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
