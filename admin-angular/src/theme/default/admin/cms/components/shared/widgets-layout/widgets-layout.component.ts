/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetSandbox } from '../../../../../../../core/admin/cms/widgets/widgets.sandbox';

@Component({
  selector: 'app-widgets-layout',
  templateUrl: './widgets-layout.component.html',
  styleUrls: ['./widgets-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetLayoutComponent implements OnInit {

  constructor(public sandbox: WidgetSandbox) {}

  ngOnInit() {
    this.getWidgetHeaderCount();
  }

  getWidgetHeaderCount() {
    this.sandbox.getWidgetCount();
  }
}
