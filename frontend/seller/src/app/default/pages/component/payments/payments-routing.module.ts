import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { ArchivedPaymentsComponent } from './archived-payments/archived-payments.component';
import { EarningComponent } from './earning/earning.component';
import { AuthGuard } from '../../../../../../src/app/core/providers/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', redirectTo: 'settlements', pathMatch: 'full'
      },
      {
        path: 'settlements',
        component: SettlementsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'archived-payments',
        component: ArchivedPaymentsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'earning',
        component: EarningComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
