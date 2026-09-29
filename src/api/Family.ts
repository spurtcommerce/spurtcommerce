import { Family } from './core/models/Family';
import { getDataSource } from '../loaders/typeormLoader';

const familyService = getDataSource().getRepository(Family);

export async function findOne(obj: any): Promise<any> {
    return await familyService.findOne(obj);
}

export async function save(obj: any): Promise<any> {
    return await familyService.save(obj);
}
