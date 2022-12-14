import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { PermissionComponent } from './components/permission/permission.component';

const routes: Routes = [
  { path: '', redirectTo: 'role', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'role',
        pathMatch: 'full'
      },
      {
        path: 'role',
        loadChildren: () => import('./components/role/role.module').then(m => m.RoleModule),
        canActivate: [AuthGuard],
        data: { permission: 'list-role'}
      },
      {
        path: 'user',
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        data: { permission: 'list-user'}
      },
      {
        path: 'permission',
        component: PermissionComponent,
        canActivate: [AuthGuard],
        data: { permission: 'edit-role-permission' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessPermissionRoutingModule { }
