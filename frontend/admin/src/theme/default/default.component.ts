/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-spurt-root',
  templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit {
  title = 'Spurt Commerce';
  public mylanguage: string;

  constructor(public translate: TranslateService) {}

  ngOnInit() {}
}
