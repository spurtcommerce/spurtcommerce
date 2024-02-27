"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumndynamicRefEmailTemplateTable1700039888469 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumndynamicRefEmailTemplateTable1700039888469 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const columnExist = yield queryRunner.hasColumn('email_template', 'dynamic_fields_ref');
            if (!columnExist) {
                yield queryRunner.addColumn('email_template', new typeorm_1.TableColumn({
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
                yield (0, typeorm_1.getConnection)().getRepository('EmailTemplate').update(template.emailTemplateId, { dynamicFieldsRef: template.dynamicFieldsRef });
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddColumndynamicRefEmailTemplateTable1700039888469 = AddColumndynamicRefEmailTemplateTable1700039888469;
//# sourceMappingURL=1700039888469-AddColumndynamicRefEmailTemplateTable.js.map