import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { SupplierManagerRoutes } from '../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [{
path:'',
component:LayoutComponent,
children:[
  {path:'',redirectTo:'list',pathMatch:"full"},
  // {
  //   path:'list',
  //   component:ListComponent
  // },
  // {
  //   path:'add',
  //   component:ContactComponent,
  // }

  ...SupplierManagerRoutes
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
