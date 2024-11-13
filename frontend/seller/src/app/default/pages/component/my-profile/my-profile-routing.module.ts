import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyAccountLayoutComponent } from '../my-account/layout/layout.component';

const routes: Routes = [
  {
    path: '', component: MyAccountLayoutComponent,
    children: [
      // { path: '', redirectTo: 'my-profile', pathMatch: "full" },
      {
        path: '',
        component: MyProfileComponent,
        data: {
          title: 'My Proﬁle',
          urls: [{ title: 'breadcrumbs.Home', url: '/dashboard' }, { title: 'breadcrumbs.MyProﬁle', url: '/settings/list' }]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
