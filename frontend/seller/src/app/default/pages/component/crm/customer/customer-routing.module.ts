import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
// import { title } from 'process';
// import { Title } from 'chart.js';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component:ListComponent ,
        data: {
          title: 'Customer',
          urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' },{ title: 'breadcrumbs.CRM', url: '/crm/list'}]
      }
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
      
    ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class CustomerRoutingModule { }
