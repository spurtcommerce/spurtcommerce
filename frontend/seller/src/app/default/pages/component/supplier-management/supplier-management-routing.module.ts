import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../../../../../../src/app/core/providers/guards/auth-guard';

const routes: Routes = [

  { path: '', redirectTo: 'supplier', pathMatch: 'full' },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
    canActivate: [AuthGuard],
    data: { root: 'sales', permissionForHeader: 'sales-orders' }
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
    canActivate: [AuthGuard],
    data: { root: 'sales', permissionForHeader: 'sales-orders' }
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierManagementRoutingModule { }
