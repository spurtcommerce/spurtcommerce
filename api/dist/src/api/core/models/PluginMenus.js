"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginMenu = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const class_validator_1 = require("class-validator");
let PluginMenu = class PluginMenu extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], PluginMenu.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id' }),
    tslib_1.__metadata("design:type", Number)
], PluginMenu.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'menu_name' }),
    tslib_1.__metadata("design:type", String)
], PluginMenu.prototype, "menuName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'path' }),
    tslib_1.__metadata("design:type", String)
], PluginMenu.prototype, "path", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'menu_module' }),
    tslib_1.__metadata("design:type", String)
], PluginMenu.prototype, "menuModule", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'icon' }),
    tslib_1.__metadata("design:type", String)
], PluginMenu.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'status' }),
    tslib_1.__metadata("design:type", Number)
], PluginMenu.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PluginMenu.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PluginMenu.prototype, "updateDetails", null);
PluginMenu = tslib_1.__decorate([
    (0, typeorm_1.Entity)('plugin_menu')
], PluginMenu);
exports.PluginMenu = PluginMenu;
//# sourceMappingURL=PluginMenus.js.map