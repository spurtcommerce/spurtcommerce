export function WebHookAuthChecker(request: any, response: any, next: any): any {
    const rawIp: string =
        request.ip ||
        request.socket?.remoteAddress ||
        '';

    const ip = rawIp.replace(/^::ffff:/, '');

    const isLocalhost =
        ip === '127.0.0.1' ||
        ip === '::1' ||
        ip === 'localhost' ||
        ip.startsWith('127.');

    if (!isLocalhost) {
        console.warn(`[WebHookAuthChecker] Rejected request from IP: ${rawIp}`);
        return response.status(403).send('FORBIDDEN');
    }

    return next();
}