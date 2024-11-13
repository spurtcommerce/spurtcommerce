import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbondonedRoutingModule } from './abondoned-routing.module';
import { abondonedComponents } from '../../../../../../../../add-ons/add-ons.constant';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'add-ons/shared/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [...abondonedComponents],
  imports: [
    CommonModule,
    AbondonedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    TranslateModule.forChild({}),
  ]
})
export class AbondonedModule { }
