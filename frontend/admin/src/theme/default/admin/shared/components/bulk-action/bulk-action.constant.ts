import { IBulkConfig } from "./bulk-action.model";

export const actionConfigs = [
    {
        id: 'itemSelected',
        name: 'marketplace.common.itemsSelected',
        image: ''
    },
    {
        id: 'exportExcel',
        name: 'marketplace.common.Export',
        image: 'assets/img/export-white.svg'
    },
    {
        id: 'exportExcelAll',
        name: 'Sales.Orders.ExportAll',
        image: 'assets/img/export-white.svg'
    },
    {
        id: 'delete',
        name: 'marketplace.common.Delete',
        image: 'assets/img/trash-white.svg'
    },
    {
        id: 'resetCheckbox',
        name: 'marketplace.common.DeselectAll',
        image: ''
    }
];
export function getBulkConfig(configs = []): IBulkConfig[] {
    return actionConfigs.length > 0 ? actionConfigs.filter((action) => configs.includes(action.id)) : actionConfigs;
}