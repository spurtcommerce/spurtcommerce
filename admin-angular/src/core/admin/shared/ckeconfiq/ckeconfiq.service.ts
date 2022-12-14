/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';

@Injectable()
export class CkeConfiqService {
  private confiq = {
    toolbar: [
      [
        'Bold',
        'Italic',
        'BulletedList',
        'Styles'
      ],
      ['Table'],
      ['Image']
    ]
  };

  private categoryconfiq = {
    toolbar: [
      [
        'Bold',
        'Italic',
        'BulletedList',
        'Styles'
      ],
      ['Table'],
      ['Image'],
      ['Format'],
      { name: 'links', items: [ 'Link', 'Unlink']},
    ],
    'format_tags': "p;h1;h2;h3;h4;h5"
    };

  constructor() { }


  public getckeconfig() {
    return this.confiq;
  }

  public getcategoryconfiq(){
    return this.categoryconfiq;
  }
}
