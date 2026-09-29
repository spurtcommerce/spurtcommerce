import moment from 'moment';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddonSettingPermission1732621428711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const query = `
            INSERT INTO \`permission_module\` (\`created_by\`, \`created_date\`, \`modified_by\`, \`modified_date\`, \`module_id\`, \`name\`, \`slug_name\`, \`sort_order\`, \`module_group_id\`)
            VALUES (DEFAULT, ?, DEFAULT, DEFAULT, DEFAULT, ?, ?, ?, ?)
        `;

        // Run the query with parameters
        await queryRunner.query(query, [
            currentDate,         // created_date
            'Addons',            // name
            'edit-addons',       // slug_name
            319,                 // sort_order
            16,                   // module_group_id
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
