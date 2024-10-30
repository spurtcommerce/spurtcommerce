/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { RegistrationOtp } from '../models/RegistrationOtpModel';

@EntityRepository(RegistrationOtp)
export class RegistrationOtpRepository extends Repository<RegistrationOtp> {

}
