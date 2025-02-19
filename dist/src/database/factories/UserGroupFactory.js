"use strict";
/*
 * spurtcommerce API
 * version 2.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2020 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const UserGroup_1 = require("../../api/core/models/UserGroup");
(0, typeorm_seeding_1.define)(UserGroup_1.UserGroup, (faker, settings) => {
    const usergroup = new UserGroup_1.UserGroup();
    return usergroup;
});
//# sourceMappingURL=UserGroupFactory.js.map