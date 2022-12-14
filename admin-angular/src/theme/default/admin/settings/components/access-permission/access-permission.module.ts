import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessPermissionRoutingModule } from './access-permission.routing';
import { LayoutComponent } from './components/layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AccessPermissionRoutingModule,
    NgbModule
  ]
})
export class AccessPermissionModule { }
