import { MigrationInterface, QueryRunner } from 'typeorm';
import { getDataSource } from '../../../src/loaders/typeormLoader';

export class AddDataDocumentTable1718169933346 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable('document');
        if (tableExist) {
            const data = {
                id: undefined,
                name: 'Certificate',
                documentType: 'pdf',
                isMandatory: 0,
                maxUploadSize: 4096,
                isActive: 1,
                isDelete: 0,
            };
            await getDataSource().getRepository('document').save(data);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
