import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class VendorLoggingMiddleware implements ExpressMiddlewareInterface {
    public async use(request: any, response: any, next: any): Promise<void> {
        next();
    }
}
