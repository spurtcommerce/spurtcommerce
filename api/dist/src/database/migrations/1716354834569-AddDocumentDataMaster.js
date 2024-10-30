"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDocumentDataMaster1716354834569 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddDocumentDataMaster1716354834569 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const documentRepo = yield (0, typeorm_1.getRepository)('Document');
            yield documentRepo.save([
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
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.AddDocumentDataMaster1716354834569 = AddDocumentDataMaster1716354834569;
//# sourceMappingURL=1716354834569-AddDocumentDataMaster.js.map