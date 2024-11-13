import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { relatedProductsRoutes } from '../../../../../../../add-ons/add-ons.constant';


const manageCrossSelling: Routes = [
  {path:'',redirectTo:'related-products',pathMatch:'full'},
  {
    path:'related-products',
    children:[
      ...relatedProductsRoutes
    ]
  },
];
// manageCrossSelling.forEach(data => {
  // if (data && data.children) {
    // manageCrossSelling.push(marketingRouting.RelatedProductsRoutes[0]);
  // }
// }); 


@NgModule({
  imports: [RouterModule.forChild(manageCrossSelling)],
  exports: [RouterModule]
})
export class ManageCrossSellingRoutingModule { }
