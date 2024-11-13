import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../layout/products.component';
import { ChatpopupComponent } from './chatpopup/chatpopup.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterial } from '../../../../../../app/app.material.module';
import { AuthGuard } from '../../../../../../../src/app/core/providers/guards/auth-guard';

export const routes: Routes = [
  {
      path: '',
      component: ProductsComponent,
      canActivate: [AuthGuard],
      children: [

      
      ]

  }
];

@NgModule({
  declarations: [
    ChatpopupComponent,

  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppMaterial
  ],
})
export class ManageProductModule { }
