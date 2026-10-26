import { getDataSource } from '../../loaders/typeormLoader';

export async function save(payload: any): Promise<any> {
    return await getDataSource().getRepository('ShoppingCart').save(payload);
}

export async function find(payload: any): Promise<any> {
    return await getDataSource().getRepository('ShoppingCart').find(payload);
}

export async function findOne(payload: any): Promise<any> {
    return await getDataSource().getRepository('ShoppingCart').findOne(payload);
}

export async function update(id: number, payload: any): Promise<any> {
    return await getDataSource().getRepository('ShoppingCart').update(id, payload);
}

export async function deleteShoppingCart(ids: number[]): Promise<any> {
    return await getDataSource().getRepository('ShoppingCart').delete(ids);
}
