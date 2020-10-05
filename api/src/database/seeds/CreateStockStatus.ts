import { Connection } from 'typeorm';
import { Factory, Seed } from 'typeorm-seeding';
import { StockStatus } from '../../api/models/stockStatus';
export class CreateStockStatus implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<StockStatus> {
        const em = connection.createEntityManager();
        const statusData: any = [
            {
                stockStatusId: 1,
                name: 'In Stock',
                isActive: 1,
            },
            {
                stockStatusId: 2,
                name: 'Out of the stock',
                isActive: 1,
            },
        ];
        let i = 0;
            for (i ; i < statusData.length; i++) {
                    const stockStatus = new StockStatus();
                    stockStatus.stockStatusId = statusData[i].stockStatusId;
                    stockStatus.name = statusData[i].name;
                    stockStatus.isActive = statusData[i].isActive;
                    await em.save(stockStatus);
                }
        return statusData;
    }
}
