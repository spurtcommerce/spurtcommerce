import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'seller', pathMatch: 'full' },
  {
    path: 'seller',
    loadChildren: () => import('./vendors/vendors.module').then(m => m.VendorsModule),
    data: { permissionForHeader: 'sellers-data', root: 'sellers' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVendorsRoutingModule { }
