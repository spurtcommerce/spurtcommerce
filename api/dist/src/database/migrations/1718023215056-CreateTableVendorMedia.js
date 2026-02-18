"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableVendorMedia1718023215056 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTableVendorMedia1718023215056 {
    constructor() {
        this.tableForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_vendor_media',
            columnNames: ['vendor_id'],
            referencedColumnNames: ['vendor_id'],
            referencedTableName: 'vendor',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ifExsist = yield queryRunner.hasTable('vendor_media');
            if (!ifExsist) {
                const table = new typeorm_1.Table({
                    name: 'vendor_media',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isPrimary: true,
                            isNullable: false,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'vendor_id',
                            type: 'int',
                            length: '11',
                            isPrimary: false,
                            isNullable: false,
                        },
                        {
                            name: 'fileName',
                            type: 'varchar',
                            length: '255',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'filePath',
                            type: 'varchar',
                            length: '255',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'media_type',
                            type: 'int',
                            length: '1',
                            comment: '1 - IMAGE 2 - VIDEO',
                            isPrimary: false,
                            isNullable: false,
                        },
                        {
                            name: 'default_image',
                            type: 'int',
                            length: '1',
                            default: 0,
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'video_type',
                            type: 'int',
                            length: '1',
                            default: 0,
                            comment: '1 - UPLOAD 2 - EMBEDDED URL',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'sort_order',
                            type: 'int',
                            length: '11',
                            default: 0,
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'show_home_page_widget',
                            type: 'int',
                            length: '1',
                            default: 0,
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'is_active',
                            type: 'tinyint',
                            default: 1,
                            comment: '0-IN-ACTIVE, 1-ACTIVE',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'is_delete',
                            type: 'tinyint',
                            default: 0,
                            comment: '0-NOT DELETE, 1-DELETED',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'created_by',
                            type: 'integer',
                            length: '11',
                            comment: 'CREATED USER ID',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'created_date',
                            type: 'datetime',
                            comment: 'CREATED SYSTEM DATE',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'modified_by',
                            type: 'integer',
                            length: '11',
                            comment: 'MODIFIED USER ID',
                            isPrimary: false,
                            isNullable: true,
                        },
                        {
                            name: 'modified_date',
                            type: 'datetime',
                            comment: 'LAST MODIFIED DATE',
                            isPrimary: false,
                            isNullable: true,
                        },
                    ],
                });
                yield queryRunner.createTable(table);
                const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('vendor_id') !== -1);
                if (!ifDataExsist) {
                    yield queryRunner.createForeignKey(table, this.tableForeignKeys);
                }
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableVendorMedia1718023215056 = CreateTableVendorMedia1718023215056;
//# sourceMappingURL=1718023215056-CreateTableVendorMedia.js.map