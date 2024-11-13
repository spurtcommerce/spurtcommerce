/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetSandbox } from 'add-ons/cms/widgets/core/widget.sandbox';


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
