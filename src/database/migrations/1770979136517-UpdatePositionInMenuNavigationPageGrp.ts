import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePositionInMenuNavigationPageGrp1770979136517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // get distinct tenantIds
        const tenants = await queryRunner.query(`
          SELECT DISTINCT tenant_id AS tenantId
          FROM page_group
        `);

        for (const tenant of tenants) {

          // get groups for this tenant ordered by groupId
          const groups = await queryRunner.query(`
            SELECT group_id AS groupId
            FROM page_group
            WHERE tenant_id = ?
            ORDER BY group_id ASC
          `, [tenant.tenantId]);

          let position = 1;

          for (const group of groups) {
            await queryRunner.query(`
              UPDATE page_group
              SET position = ?
              WHERE group_id = ?
            `, [position, group.groupId]);

            position++;
          }
        }
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
