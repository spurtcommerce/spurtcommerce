"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegistrationOtpTable1715758772087 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateRegistrationOtpTable1715758772087 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'registration_user_otp',
                columns: [
                    {
                        name: 'otp_id',
                        type: 'integer',
                        length: '11',
                        isPrimary: true,
                        isNullable: false,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    }, {
                        name: 'email_id',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'otp',
                        type: 'integer',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'user_type',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'tinyint',
                        isPrimary: false,
                        isNullable: true,
                        default: 1,
                    }, {
                        name: 'is_delete',
                        type: 'tinyint',
                        isPrimary: false,
                        isNullable: true,
                        default: 0,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_date',
                        type: 'datetime',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('registration_user_otp');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateRegistrationOtpTable1715758772087 = CreateRegistrationOtpTable1715758772087;
//# sourceMappingURL=1715758772087-CreateRegistrationOtpTable.js.map