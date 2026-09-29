import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { startQuotationAutoExpiryJob } from '../cronJobs/AutoVendorQuoteExpiryJob';

export const cronLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    // console.log('Initializing cron job...');
    startQuotationAutoExpiryJob();
};
