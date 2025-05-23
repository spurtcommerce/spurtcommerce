import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { startVendorOrderAutoCancelJob } from '../cronJobs/AutoVendorOrderCancelStatus';

export const cronLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    console.log('Initializing cron job...');
    startVendorOrderAutoCancelJob();
};
