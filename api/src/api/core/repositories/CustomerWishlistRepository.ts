/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { EntityRepository, Repository } from 'typeorm';

import { CustomerWishlist } from '../models/CustomerWishlist';

@EntityRepository(CustomerWishlist)
export class CustomerWishlistRepository extends Repository<CustomerWishlist>  {
}
