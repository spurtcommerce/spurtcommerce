import { Plugins } from '../models/Plugin';
import { getManager, Like } from 'typeorm';
export async function CheckAddonMiddleware(request: any, response: any, next: any): Promise<any> {
    const pluginRepository = getManager().getRepository(Plugins);
    const routeSplit = request.route.path.split(':')[0];
    const validAddOnRoute = await pluginRepository.findOne({ where: { routes: Like('%~' + routeSplit + '~%'), pluginStatus: 1 } });
    console.log(JSON.stringify(validAddOnRoute) + 'validAddOnRouteTwo');
    if (validAddOnRoute) {
        next();
    } else {
        return response.status(200).send({ status: 0, message: 'you dont have access for it, please enable addon' });
    }
}
