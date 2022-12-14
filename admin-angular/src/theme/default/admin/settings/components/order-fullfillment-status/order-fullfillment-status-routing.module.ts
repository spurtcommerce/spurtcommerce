import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { OrderFullfillmentComponent } from './order-status/order-fullfillment/order-fullfillment.component';

const routes: Routes = [{
  path: '', component: OrderFullfillmentComponent,
  canActivate: [AuthGuard],
  // data: { permission: 'edit-general-settings' }
  data:
  {
    permission: 'edit-general-settings',
    urls: [{ title: 'Settings', url: '' },
      { title: 'General', url: '' },
      { title: 'Basic information', url: '' },
    ]
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderFullfillmentStatusRoutingModule { }
