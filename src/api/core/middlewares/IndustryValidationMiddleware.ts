import { getManager } from 'typeorm';
import { Industry } from '../models/Industry';

export async function IndustryValidationMiddleware(req: any, res: any, next: any): Promise<any> {
    const settingService = getManager().getRepository(Industry);
    const industryName = req.get('industry');
    const industryExist = await settingService.findOne({
        slug: industryName ?? 'none',
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
