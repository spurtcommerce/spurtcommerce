import { MigrationInterface, QueryRunner, TableColumn, getConnection } from 'typeorm';

export class AddColumndynamicRefEmailTemplateTable1700039888469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const columnExist = await queryRunner.hasColumn('email_template', 'dynamic_fields_ref');
        if (!columnExist) {
            await queryRunner.addColumn('email_template', new TableColumn({
                name: 'dynamic_fields_ref',
                type: 'varchar',
                length: '255',
                isPrimary: false,
                isNullable: true,
            }));
        }

        const emailTemplateSeed = JSON.parse(`[
            {"emailTemplateId":"1","dynamicFieldsRef":"{name}"},
            {"emailTemplateId":"2","dynamicFieldsRef":"{name},{xxxxxx}"},
            {"emailTemplateId":"3","dynamicFieldsRef":"{name},{email},{phoneNumber},{message}"},
            {"emailTemplateId":"4","dynamicFieldsRef":"{name},{username},{password}"},
            {"emailTemplateId":"5","dynamicFieldsRef":"{name}"},
            {"emailTemplateId":"6","dynamicFieldsRef":"{adminname},{orderId},{name}"},
            {"emailTemplateId":"7","dynamicFieldsRef":"{name},{username},{password}"},
            {"emailTemplateId":"9","dynamicFieldsRef":"{name}.{xxxxxx}"},
            {"emailTemplateId":"11","dynamicFieldsRef":"{name}"},
            {"emailTemplateId":"12","dynamicFieldsRef":"{vendorName}"},
            {"emailTemplateId":"13","dynamicFieldsRef":"{name},{username},{password}"},
            {"emailTemplateId":"15","dynamicFieldsRef":"{name}"},
            {"emailTemplateId":"16","dynamicFieldsRef":"{name},{productname}"},
            {"emailTemplateId":"17","dynamicFieldsRef":"{name},{title},{question},{username}"},
            {"emailTemplateId":"18","dynamicFieldsRef":"{name},{title},{question},{answer},{username}"},
            {"emailTemplateId":"19","dynamicFieldsRef":"{name},{username},{title},{question},{answer}"},
            {"emailTemplateId":"20","dynamicFieldsRef":"{name},{productname},{status}"},
            {"emailTemplateId":"21","dynamicFieldsRef":"{name},{title},{order},{status}"},
            {"emailTemplateId":"22","dynamicFieldsRef":"{name},{title},{customername}"},
            {"emailTemplateId":"23","dynamicFieldsRef":"{name},{link}"},
            {"emailTemplateId":"24","dynamicFieldsRef":"{name},{orderPrefixId}"},
            {"emailTemplateId":"25","dynamicFieldsRef":"{name},{message}"},
            {"emailTemplateId":"30","dynamicFieldsRef":"{name}"}]`);

        for (const template of emailTemplateSeed) {
            await getConnection().getRepository('EmailTemplate').update(template.emailTemplateId, { dynamicFieldsRef: template.dynamicFieldsRef });
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
