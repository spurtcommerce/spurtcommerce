import { IBulkConfig } from "./bulk-action.models";

export const actionConfigs: IBulkConfig[] = [
    {
        id: 'resetCheckbox',
        name: 'common.Selected',
        image: 'assets/imgs/close-white.svg'
    },
    {
        id: 'fullFillNow',
        name: 'newReq.Fulfill',
        image: ''
    },
    {
        id: 'exportExcel',
        name: 'common.Export',
        image: 'assets/imgs/export-white.svg'
    },
    {
        id: 'exportExcelAll',
        name: 'common.ExportAll',
        image: 'assets/imgs/export-white.svg'
    },
    {
        id: 'bulkUpload',
        name: 'common.Update_bulk',
        image: 'assets/imgs/update-white.svg'
    },
    {
        id: 'bulkDelete',
        name: 'SupplierManagement.Supplier.Delete',
        image: 'assets/imgs/delete-white.svg'
    }

];


export function getBukConfig(configs = []): IBulkConfig[] {  // [resetCheckbox, exportExcel,exportExcelAll,bulkUpload,bulkDelete]
    return actionConfigs.length > 0 ? actionConfigs.filter((action) => configs.includes(action.id)) : actionConfigs;
};