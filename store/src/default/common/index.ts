/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
