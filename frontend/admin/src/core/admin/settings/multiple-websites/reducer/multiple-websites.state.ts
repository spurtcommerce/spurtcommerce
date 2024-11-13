/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface MultipleWebsitesState extends Map<string, any> {

  /*Get Multiple websites List*/

  MultipleWebsiteslist: any;
  MultipleWebsiteslistLoading: boolean;
  MultipleWebsiteslistLoaded: boolean;
  MultipleWebsiteslistFailed: boolean;

  /* Create Multiple websites*/

  CreateMultipleWebsites: any;
  CreateMultipleWebsitesLoading: boolean;
  CreateMultipleWebsitesLoaded: boolean;
  CreateMultipleWebsitesFailed: boolean;

  /* Update Multiple websites*/

  UpdateMultipleWebsites: any;
  UpdateMultipleWebsitesLoading: boolean;
  UpdateMultipleWebsitesLoaded: boolean;
  UpdateMultipleWebsitesFailed: boolean;

  // get setting details
  GetSettingsMultipleWebsites: any;
  GetSettingsMultipleWebsitesLoading: boolean;
  GetSettingsMultipleWebsitesLoaded: boolean;
  GetSettingsMultipleWebsitesFailed: boolean;
}

export const MultipleWebsitesRecordState = Record({
  
  /*Get Multiple websites List*/

  MultipleWebsiteslist: {},
  MultipleWebsiteslistLoading: false,
  MultipleWebsiteslistLoaded: false,
  MultipleWebsiteslistFailed: false,

  /*Create Multiple websites*/

  CreateMultipleWebsites: {},
  CreateMultipleWebsitesLoading: false,
  CreateMultipleWebsitesLoaded: false,
  CreateMultipleWebsitesFailed: false,

  /*Update Multiple websites*/

  UpdateMultipleWebsites: {},
  UpdateMultipleWebsitesLoading: false,
  UpdateMultipleWebsitesLoaded: false,
  UpdateMultipleWebsitesFailed: false,

  // get setting details
  GetSettingsMultipleWebsites: {},
  GetSettingsMultipleWebsitesLoading: false,
  GetSettingsMultipleWebsitesLoaded: false,
  GetSettingsMultipleWebsitesFailed: false,

});
