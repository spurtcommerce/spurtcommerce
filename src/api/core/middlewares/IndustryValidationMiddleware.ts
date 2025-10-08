import { Industry } from '../models/Industry';
import { getDataSource } from '../../../../src/loaders/typeormLoader';

export async function IndustryValidationMiddleware(req: any, res: any, next: any): Promise<any> {
    const settingService = getDataSource().getRepository(Industry);
    const industryName = req.get('industry');
    const industryExist = await settingService.findOne({
        where: {
            slug: industryName ?? 'none',
        },
    });
    if (!industryExist && industryName) {
        return res.status(400).send({
            status: 0,
            message: `Couldn't Able to Find Industry Or Invalid Industry for the site -- Contact Your Admin..!`,
        });
    }
    req.store = {
        industryId: industryExist?.id ?? 0,
    };
    next();
}
