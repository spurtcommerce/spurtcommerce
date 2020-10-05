import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class CreateZoneCountryRelationToZoneGeoTable1546586351105 implements MigrationInterface {
    private tableForeignKey = new TableForeignKey({
        name: 'fk_Zone_ZoneGeo',
        columnNames: ['zone_id'],
        referencedColumnNames: ['zone_id'],
        referencedTableName: 'zone',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('zone_to_geo_zone');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('zone_id') !== -1);
        if (!ifDataExsist) {
            await queryRunner.createForeignKey(table, this.tableForeignKey);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('zone_to_geo_zone');
        const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('zone_id') !== -1);
        if (ifDataExsist) {
            await queryRunner.dropForeignKey(table, this.tableForeignKey);
        }
    }
}
