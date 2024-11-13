/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class LanguageListForm {
  public limit: string;
  public offset: string;
  public count: boolean;
  public keyword: string;
  public status: string;
  public defaultLanguage: any;

  constructor(fromLanguageList: any) {
    this.limit = fromLanguageList.limit || 0;
    this.offset = fromLanguageList.offset || 0;
    this.count = fromLanguageList.count || false;
    this.keyword = fromLanguageList.keyword || '';
    this.status = fromLanguageList.status|| '';
    this.defaultLanguage = fromLanguageList.isDefault || ""
  }
}
