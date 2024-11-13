import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerSignupRequestListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  // {
  //   path: 'list', component: SellerSignupRequestListComponent,
  //   data: {
  //     permission: 'list',
  //     urls: [{ title: "Sellers", url: '' },{ title: "Manage Seller", url: '' },{ title: "Seller Signup Request", url: '' },{ title:"List", url: '' }]
  //   }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerSignupRequestsRoutingModule { }
