"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOsEnv = getOsEnv;
exports.getOsEnvOptional = getOsEnvOptional;
exports.getPath = getPath;
exports.getPaths = getPaths;
exports.getOsPath = getOsPath;
exports.getOsPaths = getOsPaths;
exports.getOsEnvArray = getOsEnvArray;
exports.toNumber = toNumber;
exports.toBool = toBool;
exports.normalizePort = normalizePort;
const path_1 = require("path");
function getOsEnv(key) {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return process.env[key];
}
function getOsEnvOptional(key) {
    return process.env[key];
}
function getPath(path) {
    return (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'development')
        ? (0, path_1.join)(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : (0, path_1.join)(process.cwd(), path);
}
function getPaths(paths) {
    return paths.map(p => getPath(p));
}
function getOsPath(key) {
    return getPath(getOsEnv(key));
}
function getOsPaths(key) {
    return getPaths(getOsEnvArray(key));
}
function getOsEnvArray(key, delimiter = ',') {
    return process.env[key] && process.env[key].split(delimiter) || [];
}
function toNumber(value) {
    return parseInt(value, 10);
}
function toBool(value) {
    return value === 'true';
}
function normalizePort(port) {
    const parsedPort = parseInt(port, 10);
    if (isNaN(parsedPort)) { // named pipe
        return port;
    }
    if (parsedPort >= 0) { // port number
        return parsedPort;
    }
    return false;
}
//# sourceMappingURL=utils.js.map