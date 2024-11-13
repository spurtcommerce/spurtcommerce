import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { couponRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';



const managePromotionRoutes: Routes = [
  {path:'',redirectTo:'coupon',pathMatch:'full'},
{
  path:'coupon',
  children:[
    ...couponRoutes
  ]
},

];

// managePromotionRoutes.push(marketingRouting.couponRoutes[0]);
// managePromotionRoutes.push(marketingRouting.couponRoutes[1]);



@NgModule({
  imports: [RouterModule.forChild(managePromotionRoutes)],
  exports: [RouterModule]
})
export class ManagePromotionsRoutingModule { }
