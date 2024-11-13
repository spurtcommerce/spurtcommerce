import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { DefaultCommonModule } from '../../default.common.module';
import { MaterialModule } from '../../default.material.module';
import { ComponentsModule } from '../shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ManageTicketsComponent } from './components/manage-tickets/manage-tickets.component';
import { ConverstionComponent } from './components/converstion/converstion.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ManageTicketsComponent,
    ConverstionComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,


    DefaultCommonModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class SupportModule { }
