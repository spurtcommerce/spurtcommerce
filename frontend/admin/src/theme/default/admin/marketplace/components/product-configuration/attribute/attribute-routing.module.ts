import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
const managePromotionRoutes: Routes = [
  {path:'',redirectTo:'product-list',pathMatch:'full'},
 ];

  

@NgModule({
  imports: [RouterModule.forChild(managePromotionRoutes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
