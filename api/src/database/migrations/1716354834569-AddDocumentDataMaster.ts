import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddDocumentDataMaster1716354834569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const documentRepo = await getRepository('Document');
        await documentRepo.save([
            {
                id: 1,
                name: 'Partnership Deed',
                documentType: 'pdf',
                isMandatory: 1,
                maxUploadSize: 2000,
                isActive: 1,
                isDelete: 0,
            },
            {
                id: 2,
                name: 'Memorandum of Article of Association',
                documentType: 'pdf',
                isMandatory: 1,
                maxUploadSize: 2000,
                isActive: 1,
                isDelete: 0,
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
