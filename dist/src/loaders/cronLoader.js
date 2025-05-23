"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronLoader = void 0;
const AutoVendorOrderCancelStatus_1 = require("../cronJobs/AutoVendorOrderCancelStatus");
const cronLoader = (settings) => {
    console.log('Initializing cron job...');
    (0, AutoVendorOrderCancelStatus_1.startVendorOrderAutoCancelJob)();
};
exports.cronLoader = cronLoader;
//# sourceMappingURL=cronLoader.js.map