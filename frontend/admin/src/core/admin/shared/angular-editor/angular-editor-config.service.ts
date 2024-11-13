import { Injectable } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Injectable({
  providedIn: 'root'
})
export class AngularEditorConfigService {

  constructor() { }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      // ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
}
public getAngularEditor() {
  return this.editorConfig;
}
}
