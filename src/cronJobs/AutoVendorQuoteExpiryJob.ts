import cron from 'node-cron';
import { In, LessThanOrEqual, Not } from 'typeorm';
import { pluginModule } from '../loaders/pluginLoader';
import moment from 'moment';
import { getDataSource } from '../../src/loaders/typeormLoader';
export const startQuotationAutoExpiryJob = () => {
    // console.log('Quotation auto-expiry cron started...');

    // cron run every day
    cron.schedule('1 0 * * *', async () => {
        console.log(`[${moment.utc().toDate()}] Running quotation expiry check...`);
        if (pluginModule.includes('RfqAndQuotes')) {
            const QuoteRepo = getDataSource().getRepository('Quote');
            const quoteStatus = getDataSource().getRepository('QuoteStatus');
            const [expiredStatus, processedStatus]: any = await Promise.all([
                quoteStatus.findOne({ where: { name: 'Expired' } }),
                quoteStatus.findOne({ where: { name: 'Processed' } }),
            ]);
            const todayDate = moment.utc().startOf('day').toDate();
            const expiredQuotes: any = await QuoteRepo.find({
                where: {
                    validUntil: LessThanOrEqual(todayDate),
                    statusId: Not(In([expiredStatus.id, processedStatus.id])),
                },
            });
            const expiredIds = expiredQuotes.map(quote => quote.id);
            if (expiredIds.length > 0) {
                await QuoteRepo.update({ id: In(expiredIds) }, { statusId: expiredStatus.id });
                console.log('Expired status updated successfully.');
            }
        }

    });
};
