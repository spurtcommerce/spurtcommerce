/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { ConfigService } from '../../service/config.service';

@Injectable()
export class UtilService {
  constructor(
    private configService: ConfigService
  ) {}

  /**
   * Translates given message code and title code and displays corresponding notification
   *
   * @param messageTranslationCode
   * @param type
   * @param titleTranslationCode
   */
  // public displayNotification(messageTranslationCode: string, type: string = 'info', titleTranslationCode?: string) {
  //   const message: string = this.translateService.instant(messageTranslationCode);
  //   let title: string = titleTranslationCode ? this.translateService.instant(titleTranslationCode) : null;
  //
  //   switch (type) {
  //     case 'error':
  //       title = this.translateService.instant('ErrorNotificationTitle');
  //       break;
  //
  //     case 'success':
  //       title = this.translateService.instant('SuccessNotificationTitle');
  //       break;
  //
  //     case 'alert':
  //       title = this.translateService.instant('WarningNotificationTitle');
  //       break;
  //
  //     default:
  //       title = this.translateService.instant('InfoNotificationTitle');
  //       break;
  //   }
  //
  //   this.notificationService[type](title,this.configService.get('notifications').options);
  // }
  //
  // /**
  //  * Translates lookup names by looking into lookup code
  //  *
  //  * @param data
  //  */
  // public translateLookupData(data: Array<any>): Array<any> {
  //   // Translate quantity stock adjustment reasons
  //   return data.map(lookup => {
  //     lookup.name = lookup.code ? this.translateService.instant('Lookups')[lookup.code] : lookup.name;
  //     return lookup;
  //   });
  // }
}
