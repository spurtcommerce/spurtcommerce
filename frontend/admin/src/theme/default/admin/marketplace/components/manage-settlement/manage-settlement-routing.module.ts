import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [


  {path:'', redirectTo:'settlement',pathMatch:'full'},
 
  {
      path: 'settlement',
      loadChildren: () => import('./settlement/settlement.module').then(m => m.SettlementModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageSettlementRoutingModule { }
