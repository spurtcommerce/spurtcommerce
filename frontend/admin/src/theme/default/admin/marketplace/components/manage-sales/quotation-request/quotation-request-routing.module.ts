import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { quotationRequestComponentRoutes } from '../../../../../../../../add-ons/add-ons.constant';

const routes: Routes = [
 
    ...quotationRequestComponentRoutes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRequestRoutingModule { }
