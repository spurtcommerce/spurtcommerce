import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { settingsAddonRoute } from './../../../../../../../../add-ons/add-ons.constant';
import { SettingsLayoutComponents } from './layout/layout.component';


const managePromotionRoutes: Routes = [
  {path:'settingsLayout',component:SettingsLayoutComponents

  
    ,children:[
       
  { path:'',redirectTo:'attributes',pathMatch:'full'},
  ...settingsAddonRoute,
    ]
  },
  {
    path:'filter',
    loadChildren:() => import('../settings-addon.modules/filter/filter.module').then(m=>m.FilterAddonModule)
  }

  
  
];

  

@NgModule({
  imports: [RouterModule.forChild(managePromotionRoutes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
