import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { AdminSupportTicketsComponent } from '../admin-support-tickets/admin-support-tickets.component';
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    LayoutComponent,
    AdminSupportTicketsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
