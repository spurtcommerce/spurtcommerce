import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payments/payments.component';
import { EarningsComponent } from './earnings/earnings.component';
import { ArchivePaymentsComponent } from './archive-payments/archive-payments.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from  '../../../../../default/shared/shared.module';
export const routes: Routes = [

  {
    path: 'list',
    component: PaymentComponent,
    data: {
      title: 'Payments',
      urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' },{ title: 'breadcrumbs.sales', url: '/sales/manage-orders' }, { title: 'breadcrumbs.Manageaccounts', url: '/sales/manage-accounts/list' }, { title: 'breadcrumbs.Payments' }]
    }
  },
 
  {
    path: 'archive',
    component: ArchivePaymentsComponent,
    data: {
      title: 'Archived Payments',
      urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' },{ title: 'breadcrumbs.sales', url: '/sales/manage-orders' }, { title: 'breadcrumbs.Manageaccounts', url: '/sales/manage-accounts/list' }, { title: 'breadcrumbs.ArchivedPayments' }]
    }
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageAccountsModule { }
