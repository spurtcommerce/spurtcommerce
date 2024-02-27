"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStockStatus = void 0;
const tslib_1 = require("tslib");
const stockStatus_1 = require("../../api/core/models/stockStatus");
class CreateStockStatus {
    run(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const em = connection.createEntityManager();
            const statusData = [
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
            for (i; i < statusData.length; i++) {
                const stockStatus = new stockStatus_1.StockStatus();
                stockStatus.stockStatusId = statusData[i].stockStatusId;
                stockStatus.name = statusData[i].name;
                stockStatus.isActive = statusData[i].isActive;
                yield em.save(stockStatus);
            }
            return statusData;
        });
    }
}
exports.CreateStockStatus = CreateStockStatus;
//# sourceMappingURL=CreateStockStatus.js.map