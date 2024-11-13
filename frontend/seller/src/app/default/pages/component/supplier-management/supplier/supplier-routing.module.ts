import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout.component';
import { SupplierRoutes } from '../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      ...SupplierRoutes,
      // {
      //   path: 'list',
      //   component: ListComponent,
      // },
      // {
      //   path: 'add',
      //   component: AddComponent,
      //   data: {
      //     ActiveStatus: 'add-supplier',
         
      //   }
      // },
      // {
      //   path: 'edit',
      //   component: AddComponent,
      //   data: {
      //     ActiveStatus: 'edit',
      //   }
      // }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
