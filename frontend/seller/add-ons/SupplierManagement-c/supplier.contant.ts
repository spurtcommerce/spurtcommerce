
import { BulkUpdateComponent } from "../../src/app/default/common/bulk-update/bulk-update.component";
import { AuthGuard } from "../../src/app/core/providers/guards/auth-guard";
import { SupplierStaticComponent } from "./supplier-static/supplier-static.component";






// components paths
export const componentSupplier = [SupplierStaticComponent];
// route paths
export const routePathSupplier = [
  {
    path: 'list',
    component: SupplierStaticComponent,
  },


  // {
  //   path: 'edit',
  //   component: AddComponent,
  //   data: {
  //     ActiveStatus: 'edit',
  //   }
  // }
];
