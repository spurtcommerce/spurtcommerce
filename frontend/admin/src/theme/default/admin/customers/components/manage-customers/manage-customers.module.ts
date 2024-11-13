import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCustomersRoutingModule } from './manage-customers.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManageCustomersRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule, 
  ]
})
export class ManageCustomersModule { }
