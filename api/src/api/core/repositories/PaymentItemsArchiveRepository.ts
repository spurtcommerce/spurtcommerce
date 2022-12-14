/*
 * spurtcommerce API
 * version 4.8.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { PaymentItemsArchive } from '../models/PaymentItemsArchive';

@EntityRepository(PaymentItemsArchive)
export class PaymentItemsArchiveRepository extends Repository<PaymentItemsArchive>  {

}
