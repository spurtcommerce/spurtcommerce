import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { ManageTicketsComponent } from './components/manage-tickets/manage-tickets.component';
import { ConverstionComponent } from './components/converstion/converstion.component';

const routes: Routes = [

  
  

  { path: '', redirectTo: 'Manage-ticket-list', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: 'audit-logs',
      //   loadChildren: () => import('./components/audit-log/audit-log.module').then(m => m.AuditLogModule),
      //   canActivate: [AuthGuard],
      //   data: { permissionForHeader: 'audit-logs', root: 'reports' }
      // },
      {
        path: 'Manage-ticket-list',
        component: ManageTicketsComponent,
        canActivate: [AuthGuard],
        data: {
         
          urls: [{ title: 'breadcrumbs.Report', url: '' },
          { title: 'breadcrumbs.Sales Report', url: '' },
          { title: 'breadcrumbs.List', url: '' }]
        }
      },
      {
        path: 'conversation',
        component: ConverstionComponent,
        canActivate: [AuthGuard],
        data: {
         
          urls: [{ title: 'breadcrumbs.Report', url: '' },
          { title: 'breadcrumbs.Sales Report', url: '' },
          { title: 'breadcrumbs.List', url: '' }]
        }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
