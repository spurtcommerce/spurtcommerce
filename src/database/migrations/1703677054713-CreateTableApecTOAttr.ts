import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableApecTOAttr1703677054713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable('spec_attr_grp_to_attribute');

        if (!tableExist) {
            const query = `CREATE TABLE spec_attr_grp_to_attribute (
                id int NOT NULL AUTO_INCREMENT,
                spec_attr_grp_id int NOT NULL,
                attribute_id int NOT NULL,
                PRIMARY KEY (id),
                KEY fk_spec_attr_grp_to_attr_spec_attr_grp_id_idx (spec_attr_grp_id),
                KEY fk_spec_attr_grp_to_attr_attribute_id_idx (attribute_id),
                CONSTRAINT fk_spec_attr_grp_to_attr_spec_attr_grp_id FOREIGN KEY (spec_attr_grp_id) REFERENCES specification_to_attribute_group (id) ON DELETE CASCADE,
                CONSTRAINT fk_spec_attr_grp_to_attr_attr_id FOREIGN KEY (attribute_id) REFERENCES attribute (id) ON DELETE CASCADE
              )`;

            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
