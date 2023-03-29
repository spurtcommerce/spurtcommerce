/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { EntityRepository, Repository } from 'typeorm';
import { LoginAttemptsModel } from '../models/LoginAttemptsModel';

@EntityRepository(LoginAttemptsModel)
export class LoginAttemptsRepository extends Repository<LoginAttemptsModel>  {

}
