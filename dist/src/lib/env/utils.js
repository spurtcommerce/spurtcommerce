"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePort = exports.toBool = exports.toNumber = exports.getOsEnvArray = exports.getOsPaths = exports.getOsPath = exports.getPaths = exports.getPath = exports.getOsEnvOptional = exports.getOsEnv = void 0;
const path_1 = require("path");
function getOsEnv(key) {
    if (typeof process.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return process.env[key];
}
exports.getOsEnv = getOsEnv;
function getOsEnvOptional(key) {
    return process.env[key];
}
exports.getOsEnvOptional = getOsEnvOptional;
function getPath(path) {
    return (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa' || process.env.NODE_ENV === 'development')
        ? (0, path_1.join)(process.cwd(), path.replace('src/', 'dist/').slice(0, -3) + '.js')
        : (0, path_1.join)(process.cwd(), path);
}
exports.getPath = getPath;
function getPaths(paths) {
    return paths.map(p => getPath(p));
}
exports.getPaths = getPaths;
function getOsPath(key) {
    return getPath(getOsEnv(key));
}
exports.getOsPath = getOsPath;
function getOsPaths(key) {
    return getPaths(getOsEnvArray(key));
}
exports.getOsPaths = getOsPaths;
function getOsEnvArray(key, delimiter = ',') {
    return process.env[key] && process.env[key].split(delimiter) || [];
}
exports.getOsEnvArray = getOsEnvArray;
function toNumber(value) {
    return parseInt(value, 10);
}
exports.toNumber = toNumber;
function toBool(value) {
    return value === 'true';
}
exports.toBool = toBool;
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
exports.normalizePort = normalizePort;
//# sourceMappingURL=utils.js.map