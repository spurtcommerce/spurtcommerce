
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    DataType: 'application/json'
  })
};

@Injectable()
export class ConfigService {
  private config: Object;
  private env: Object;

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
    ],
    versionCheck: false
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
    'format_tags': "p;h1;h2;h3;h4;h5",
    versionCheck: false
    };

    
  public editorConfig = {
    toolbar: [
      
      'bold', 'italic', '|',
      'numberedList', 'bulletedList', '|',
      'paragraph', '|',
      'outdent', 'indent', '|',
      'blockQuote', 'insertTable', '|',
      'imageUpload', '|',
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
      uploadUrl: '', 
    },
  };

    constructor(private http: HttpClient) {}


  public getckeconfig() {
    return this.confiq;
  }

  public getcategoryconfiq(){
    return this.categoryconfiq;
  }

  
  public getImageUrl(): string {
    return environment.imageUrl;
  }
  public getBaseUrl(): string {
    return environment.baseUrl;
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