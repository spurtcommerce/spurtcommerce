import { MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnInVendorSettingForPallete1770450445296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('vendor_settings', [

          new TableColumn({
            name: 'default_palette',
            type: 'varchar',
            length: '50',
            isNullable: true,
          }),

          new TableColumn({
            name: 'primary_color',
            type: 'varchar',
            length: '10',
            isNullable: true,
          }),

          new TableColumn({
            name: 'secondary_color',
            type: 'varchar',
            length: '10',
            isNullable: true,
          }),
        ]);

        await queryRunner.query(`
          UPDATE vendor_settings
          SET
            default_palette = 'forest green',
            primary_color = '#2ECC71',
            secondary_color = '#145A32'
          WHERE default_palette IS NULL
        `);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
