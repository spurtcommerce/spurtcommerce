/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutContainerComponent} from './layout/layout.container';
import {ComponentsModule} from '../shared/components/index';
import {SharedModule} from '../shared/shared.module';



export const CONTAINERS = {
    LayoutContainerComponent
};
@NgModule({
  imports: [
      CommonModule,
      ComponentsModule,
      SharedModule,
  ],
  declarations: [],
  providers: []
})
export class ContainerModule {
}
