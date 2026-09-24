import { MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddColumnsForHeroSectionInVendorSettings1770962038596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('vendor_settings', [
          new TableColumn({
            name: 'hero_image_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          }),
          new TableColumn({
            name: 'hero_image_path',
            type: 'varchar',
            length: '255',
            isNullable: true,
          }),
          new TableColumn({
            name: 'hero_headline',
            type: 'varchar',
            length: '255',
            isNullable: true,
          }),
          new TableColumn({
            name: 'hero_sub_headline',
            type: 'varchar',
            length: '255',
            isNullable: true,
          }),
          new TableColumn({
            name: 'hero_cta_text',
            type: 'varchar',
            length: '100',
            isNullable: true,
          }),
          new TableColumn({
            name: 'hero_cta_link',
            type: 'varchar',
            length: '255',
            isNullable: true,
          }),
        ]);
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
