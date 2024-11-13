import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VariantFilterLayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: VariantFilterLayoutComponent,
    children: [
      { path: '', redirectTo: 'variants', pathMatch: 'full' },
      {
        path: 'filter',
        loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
      },
      {
        path: 'variants',
        loadChildren: () => import('./variants/variants.module').then(m => m.VariantsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
