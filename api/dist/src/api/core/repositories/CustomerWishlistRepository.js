"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerWishlistRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CustomerWishlist_1 = require("../models/CustomerWishlist");
let CustomerWishlistRepository = class CustomerWishlistRepository extends typeorm_1.Repository {
};
CustomerWishlistRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(CustomerWishlist_1.CustomerWishlist)
], CustomerWishlistRepository);
exports.CustomerWishlistRepository = CustomerWishlistRepository;
//# sourceMappingURL=CustomerWishlistRepository.js.map