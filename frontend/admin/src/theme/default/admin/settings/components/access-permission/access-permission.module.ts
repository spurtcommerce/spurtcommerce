// angular imports 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// custom modules 
import { AccessPermissionRoutingModule } from './access-permission.routing';
import { ComponentsModule } from '../../../shared/components';
// third party modules 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
// components 
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AccessPermissionRoutingModule,
    NgbModule,
    ComponentsModule,
    TranslateModule.forChild()
  ]
})
export class AccessPermissionModule {

}
