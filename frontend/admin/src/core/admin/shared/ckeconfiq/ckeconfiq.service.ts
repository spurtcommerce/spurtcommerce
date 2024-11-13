/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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

    public editorConfig: any = {
      toolbar: [
        
        'bold', 'italic', '|',
        'numberedList', 'bulletedList', '|',
        'paragraph', '|',
        'outdent', 'indent', '|',
        'blockQuote', 'insertTable', '|',
        'imageUpload', '|',
        'style', '|',
        'heading', '|',
        'undo', 'redo',
        
      ],
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        ]
      },
     
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
      },
      image: {
        toolbar: [
          'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
        ]
      },
      simpleUpload: {
        uploadUrl: '', // Leave empty to use base64 upload adapter
      },
  
      style: {
        definitions: [
          {
            name: 'Title',
            element: 'h1',
            classes: 'title'
          },
          {
            name: 'Subtitle',
            element: 'h2',
            classes: 'subtitle'
          },
          {
            name: 'Paragraph',
            element: 'p',
            classes: 'paragraph'
          }
        ]
      },
    }  

  constructor() { }


  public getckeconfig() {
    return this.confiq;
  }

  public getcategoryconfiq(){
    return this.categoryconfiq;
  }
  public getEditorConfig() {
    return this.editorConfig;
  }
}

export default class Adapter {
  loader:any;
  reader:any;
  config;
  constructor(loader: any, config: any) {
    this.loader = loader;
    this.config = config;
  }


public async upload(): Promise<any> {
  const value = await this.loader.file;
      return this.read( value);
    }

  read(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
       resolve({ default: reader.result });
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.onabort = function () {
        reject();
      }; 
       reader.readAsDataURL(file);


    });

  }

  abort() {
    if (this.reader) {
      this.reader.abort();
    }
  }
}


