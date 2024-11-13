// angular common imports 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// constant 
import { filterAddonRoute } from 'add-ons/add-ons.constant';
// components 
import { SettingsLayoutComponents } from '../layout/layout.component';


const managePromotionRoutes: Routes = [
    {path:'settingsLayout',component:SettingsLayoutComponents,
    children:[
             
  {path:'',redirectTo:'filter',pathMatch:'full'},
  ...filterAddonRoute,
    ]
    }
  
];

  

@NgModule({
  imports: [RouterModule.forChild(managePromotionRoutes)],
  exports: [RouterModule]
})
export class filterRoutingModule { }
