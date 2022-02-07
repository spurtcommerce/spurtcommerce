/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Settings, AppSettings } from '../../../app.settings';
import { CommonService } from '../../../../core/common/common.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  // colors palette
  public showOptions = true;
  public settings: Settings;

  /**             CHANGE THE COLORS PLATTE
   * set the color from localStorage,if localStorage have value or else
   * set color by default as green.
   * **/
  constructor(
    public appSettings: AppSettings,
    @Inject(PLATFORM_ID) private platformId: Object,
    private commonService: CommonService
  ) {
    this.settings = this.appSettings.settings;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('optionsTheme')) {
        const tempColor = localStorage.getItem('optionsTheme');
        this.settings.theme = tempColor;
      } else {
        this.settings.theme = 'green';
      }
    }
  }

  /*** CHANGE THE COLORS PLATTE
   * @param theme from mat-card
   * save  the theme in localStorage as 'optionsTheme'(key).
   * ***/
  public changeTheme(theme) {
    this.settings.theme = theme;
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('optionsTheme', theme);
    }
  }
}
