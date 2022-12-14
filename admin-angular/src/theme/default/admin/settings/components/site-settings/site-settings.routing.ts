import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { LayoutComponent } from './layout/layout.component';


const Routers: Routes = [
  { path: '', redirectTo: 'seo', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'seo',
        loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'settings-site-seo', root: 'settingsSite' }
      },
      {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.SocialModule),
        canActivate: [AuthGuard],
        data: { permissionForHeader: 'settings-site-social', root: 'settingsSite' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(Routers)],
  exports: [RouterModule]
})
export class SiteSettingsRoutingModule { }
