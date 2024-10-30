import { EntityRepository, Repository } from 'typeorm';
import { WebHook } from '../models/WebHook';

@EntityRepository(WebHook)
export class WebHookRepository extends Repository<WebHook> {
    // --
}
