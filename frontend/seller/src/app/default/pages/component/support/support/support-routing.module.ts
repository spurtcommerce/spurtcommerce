import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminSupportTicketsComponent } from '../admin-support-tickets/admin-support-tickets.component';

export const routes: Routes = [
 

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path:'',redirectTo:'admin-support-tickets',pathMatch:'full'},
        {
            path: 'admin-support-tickets',
            component: AdminSupportTicketsComponent,
            data: {
                title: 'Products',
                urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.Catalog', url: '/catalog/manage-products/' },{ title: 'breadcrumbs.ManageProducts', url: '/catalog/manage-products/list' }, { title: 'breadcrumbs.ProductList' }]
            }
        },
       
    ]

}

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
