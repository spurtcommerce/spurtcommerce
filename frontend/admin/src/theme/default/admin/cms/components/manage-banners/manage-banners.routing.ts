import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';

const routes: Routes = [
  {
        path: 'banners',
        loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'cms-banners', root: 'cms' }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBannersRoutingModule { }
