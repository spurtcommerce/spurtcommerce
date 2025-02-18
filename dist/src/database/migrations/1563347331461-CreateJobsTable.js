"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobsTable1563347331461 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateJobsTable1563347331461 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'jobs',
                columns: [
                    {
                        name: 'job_id',
                        type: 'int',
                        length: '11',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    }, {
                        name: 'job_title',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'job_description',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'salary_type',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'job_location',
                        type: 'TEXT',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'contact_person_name',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'contact_person_email',
                        type: 'varchar',
                        length: '255',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'contact_person_mobile',
                        type: 'bigint',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'is_active',
                        type: 'int',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'modified_by',
                        type: 'integer',
                        length: '11',
                        isPrimary: false,
                        isNullable: true,
                    }, {
                        name: 'created_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    }, {
                        name: 'modified_date',
                        type: 'DATETIME',
                        isPrimary: false,
                        isNullable: true,
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            });
            const ifExsist = yield queryRunner.hasTable('jobs');
            if (!ifExsist) {
                yield queryRunner.createTable(table);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('jobs', true);
        });
    }
}
exports.CreateJobsTable1563347331461 = CreateJobsTable1563347331461;
//# sourceMappingURL=1563347331461-CreateJobsTable.js.map