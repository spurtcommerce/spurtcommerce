/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class LanguageForm {
  public name: string;
  public code: string;
  public image: string;
  public sortOrder: number;
  public status: number;
  public languageId: number;

  constructor(langForm: any) {
    this.code = langForm.code || '';
    this.name = langForm.name || '';
    this.image = langForm.image || '';
    this.sortOrder = langForm.sortorder || '';
    this.status = langForm.status || 0;
    if (langForm && langForm.languageId) {
      this.languageId = langForm.languageId || '';
    }
  }
}
