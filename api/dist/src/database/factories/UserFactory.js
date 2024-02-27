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
const User_1 = require("../../api/core/models/User");
(0, typeorm_seeding_1.define)(User_1.User, (faker, settings) => {
    const user = new User_1.User();
    return user;
});
//# sourceMappingURL=UserFactory.js.map