import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { categoriesComponentRoutes, postsComponentRoutes } from 'add-ons/add-ons.constant';


const manageBlogRoutes: Routes = [
  {path:'',redirectTo:'posts',pathMatch:'full'},
  {
    path:'posts',
    children:[
      ...postsComponentRoutes
    ]
  },
  {
    path:'categories',
    children:[
      ...categoriesComponentRoutes
    ]
  },
];
   
@NgModule({
  imports: [RouterModule.forChild(manageBlogRoutes)],
  exports: [RouterModule]
})
export class ManageBlogsRoutingModule { }
