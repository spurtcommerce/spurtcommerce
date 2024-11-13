import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/theme/default/admin/shared/components';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { DefaultCommonModule } from 'src/theme/default/default.common.module';
import { NumberAcceptModule } from 'src/core/admin/shared/validation-directives/onlyNumber.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule,
    DefaultCommonModule,
    NumberAcceptModule,
    CKEditorModule,
  ],
  exports: [
    ComponentsModule,
    MaterialModule,
    DefaultCommonModule,
    NumberAcceptModule,
    CKEditorModule,
  ],
  providers: [
  ]
})
export class SharedModule { }
