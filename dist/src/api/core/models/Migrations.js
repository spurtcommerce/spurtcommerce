"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Migrations = class Migrations {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Migrations.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'timestamp' }),
    tslib_1.__metadata("design:type", Number)
], Migrations.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Migrations.prototype, "name", void 0);
Migrations = tslib_1.__decorate([
    (0, typeorm_1.Entity)('migrations')
], Migrations);
exports.Migrations = Migrations;
//# sourceMappingURL=Migrations.js.map