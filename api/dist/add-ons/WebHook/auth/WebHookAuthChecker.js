"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookAuthChecker = void 0;
function WebHookAuthChecker(request, response, next) {
    if (!request.headers.authorization) {
        return response.status(401).send({});
    }
    const credential = Buffer.from(request.headers.authorization.split(' ')[1], 'base64').toString().split(':');
    const whCredential = Buffer.from('c3B1cnRjb21tZXJjZTpzcHVydDEyM0A=', 'base64').toString().split(':');
    if (credential[0] !== whCredential[0]) {
        return response.status(401).send('INVALID TOKEN');
    }
    if (credential[1] !== whCredential[1]) {
        return response.status(401).send('INVALID TOKEN');
    }
    next();
}
exports.WebHookAuthChecker = WebHookAuthChecker;
//# sourceMappingURL=WebHookAuthChecker.js.map