"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDataDocumentTable1718169933346 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddDataDocumentTable1718169933346 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('document');
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
                yield (0, typeorm_1.getRepository)('document').save(data);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddDataDocumentTable1718169933346 = AddDataDocumentTable1718169933346;
//# sourceMappingURL=1718169933346-AddDataDocumentTable.js.map