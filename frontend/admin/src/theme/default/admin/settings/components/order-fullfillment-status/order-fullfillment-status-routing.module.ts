import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { OrderFullfillmentComponent } from './order-status/order-fullfillment/order-fullfillment.component';
import { LayoutComponent } from './layout/layout.component';
import { ManageFullfillmentStatusComponent } from './manage-fullfillment-status/manage-fullfillment-status.component';
import { FullfillmentMaapingComponent } from './fullfillment-maaping/fullfillment-maaping.component';

const Routers: Routes = [
  { path: '', redirectTo: 'LayoutComponent', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list', component: OrderFullfillmentComponent,
        canActivate: [AuthGuard],
        data:  {
          permission: 'edit-general-settings',
          urls: [{ title: 'breadcrumbs.Settings', url: '' },
            { title: 'breadcrumbs.General', url: '' },
            { title: 'breadcrumbs.Basic Information', url: '' },
          ]
        },
        
      },
      {
        path: 'manage-fullfillment', component: ManageFullfillmentStatusComponent,
        canActivate: [AuthGuard],
        data:  {
          permission: 'edit-general-settings',
          urls: [{ title: 'breadcrumbs.Settings', url: '' },
            { title: 'breadcrumbs.General', url: '' },
            { title: 'breadcrumbs.Basic Information', url: '' },
          ]
        },
        
      },
      {
        path: 'fullfillment-mapping', component: FullfillmentMaapingComponent,
        canActivate: [AuthGuard],
        data:  {
          permission: 'edit-general-settings',
          urls: [{ title: 'breadcrumbs.Settings', url: '' },
            { title: 'breadcrumbs.General', url: '' },
            { title: 'breadcrumbs.Basic Information', url: '' },
          ]
        },
        
      },

     
    ]
  }
];




@NgModule({
  imports: [RouterModule.forChild(Routers)],
  exports: [RouterModule]
})
export class OrderFullfillmentStatusRoutingModule { }
