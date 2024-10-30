"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugins = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
let Plugins = class Plugins extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)({ name: 'id' }),
    tslib_1.__metadata("design:type", Number)
], Plugins.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_name' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "pluginName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_avatar' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "pluginAvatar", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_avatar_path' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "pluginAvatarPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_type' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "pluginType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_additional_info' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "pluginAdditionalInfo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_form_info' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "pluginFormInfo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_status' }),
    tslib_1.__metadata("design:type", Number)
], Plugins.prototype, "pluginStatus", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'plugin_timestamp' }),
    tslib_1.__metadata("design:type", Number)
], Plugins.prototype, "pluginTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'slug_name' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "slugName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'is_editable' }),
    tslib_1.__metadata("design:type", Number)
], Plugins.prototype, "isEditable", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'routes' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "routes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'display_Name' }),
    tslib_1.__metadata("design:type", String)
], Plugins.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Plugins.prototype, "createDetails", null);
tslib_1.__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Plugins.prototype, "updateDetails", null);
Plugins = tslib_1.__decorate([
    (0, typeorm_1.Entity)('plugins')
], Plugins);
exports.Plugins = Plugins;
//# sourceMappingURL=Plugin.js.map