/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';
import { formFields, isDynamicFieldInContent } from './add.constant';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';

@Component({
  selector: 'app-spurt-addemail',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class EmailTempAddComponent implements OnInit {
  // Reusable Form 
  _Object = Object;
  dynamicObjControls: any = {};
  public formObjFormGroup: UntypedFormGroup;
  public title: UntypedFormControl;
  public subject: UntypedFormControl;
  public content: UntypedFormControl;
  public status: UntypedFormControl;

  // Update title 
  public updateTitle: number;
  private editEmailTempId: string;
  private editEmailTemplateInfo: any = [];
  public price: string;
  // validation 
  public submitted = false;
  public config: any;
  dynamicFieldsValue = false;

  // cke5 
  editor = ClassicEditor;

  //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public modalService: NgbActiveModal,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public sandbox: EmailTempSandbox,
    private router: Router,
    public service: EmailTempService,
    private changeDetectRef: ChangeDetectorRef,
    private ckeconfiqservice: CkeConfiqService,
  ) {
    this.config = this.ckeconfiqservice.getEditorConfig();
  }

  get f() {
    return this.formObjFormGroup.controls;
  }

  ngOnInit() {
    //build Form
    this.buildForm()

    this.editEmailTempId = this.route.snapshot.paramMap.get('id');
    this.setDefaultValues();
    this.editEmailtempList();
  }

 

  setDefaultValues() {
    this.formObjFormGroup.patchValue({ postalcode: 'Yes', tc: true });
  }
  close() {
    this.modalService.close('close');
  }
  cancel() {
    this.router.navigate(['/settings/local/emailtemp']);
  }

  /**
   * Handles form 'submit' event. Calls sandbox EmailtempAdd  and EmailtempUpdate function if form is valid.
   *
   * @param emailTemplateForm entire form value
   * @param para storing entire value
   */
  onSubmit() {
    this.submitted = true;
    const emailTemplate = {
      content:
        this.formObjFormGroup.value.content,
      dynamicFieldsRef: this.editEmailTemplateInfo[0].dynamicFieldsRef
    };
    this.dynamicFieldsValue = isDynamicFieldInContent(emailTemplate);
    if (this.formObjFormGroup.invalid || this.dynamicFieldsValue) {
      return;
    }
    const para: any = {};
    para.title = this.formObjFormGroup.value.title;
    para.subject = this.formObjFormGroup.value.subject;
    para.content = this.formObjFormGroup.value.content;
    para.status = this.formObjFormGroup.value.status;
    para.dynamicFieldsRef=this.formObjFormGroup.value.dynamicFieldsRef;
    if (this.editEmailTemplateInfo && this.editEmailTemplateInfo[0]) {
      para.id = this.editEmailTemplateInfo[0].emailTemplateId;
      this.sandbox.updateEmailTemplate(para);
    } else {
      this.sandbox.addEmailTemplate(para);
    }
    this.modalService.close('close');
  }

  editEmailtempList() {
    this.editEmailTemplateInfo.push(this.service.getemailtemplistdata());
    if (this.editEmailTemplateInfo[0] !== null) {
      if (this.editEmailTemplateInfo[0] && this.editEmailTemplateInfo[0].title) {
        this.updateTitle = 1;
        this.formObjFormGroup.controls['title'].setValue(
          this.editEmailTemplateInfo[0].title
        );
        this.formObjFormGroup.controls['subject'].setValue(
          this.editEmailTemplateInfo[0].subject
        );
        this.formObjFormGroup.controls['content'].setValue(
          this.htmlTagConversion(this.editEmailTemplateInfo[0].content)
        );
        this.formObjFormGroup.controls['status'].setValue(
          this.editEmailTemplateInfo[0].isActive
        );
        this.formObjFormGroup.controls['dynamicFieldsRef'].setValue(
          this.editEmailTemplateInfo[0].dynamicFieldsRef
        )
      }
    } else {
      this.formObjFormGroup = null;
    }
  }

  htmlTagConversion(data) {
    const val = data
      .replaceAll('&amp;', '&')
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&quot;', '"')
      .replaceAll('&#39;', "'")
      .replaceAll('&sbquo;', '‚')
      .replaceAll('&#61;', '=')
      .replaceAll('&#45;', '-')
      .replaceAll('&hellip;', '…')
      .replaceAll('&commat;', '@')
      .replaceAll('&copy;', '©')
      .replaceAll('&#35;', '#')
      .replaceAll('&ldquo;', '“')
      .replaceAll('&rsquo;', '’')
      .replaceAll('&lsquo;', '‘')
      .replaceAll('&trade;', '™')
      .replaceAll('&reg;', '®')
      .replaceAll('&ndash;', '–')
      .replaceAll('&eacute;', 'é')
      .replaceAll('&euro;', '€')
      .replaceAll('&pound;', '£');
    return val;
  }

  saveChanges() {
    this.submitted = true;
    const emailTemplate = {
      content:
        this.formObjFormGroup.value.content,
      dynamicFieldsRef: this.editEmailTemplateInfo[0].dynamicFieldsRef
    };
    this.dynamicFieldsValue = isDynamicFieldInContent(emailTemplate);
    this.changeDetectRef.detectChanges();


    if (this.formObjFormGroup.invalid) {
      return;
    }
    const para: any = {};
    para.title = this.formObjFormGroup.value.title;
    para.subject = this.formObjFormGroup.value.subject;
    para.content = this.formObjFormGroup.value.content;
    para.status = this.formObjFormGroup.value.status;

    if (this.editEmailTemplateInfo && this.editEmailTemplateInfo[0]) {
      para.id = this.editEmailTemplateInfo[0].emailTemplateId;
      this.sandbox.updateEmailTemplate(para);
    } else {
      this.sandbox.addEmailTemplate(para);
    }
    this.modalService.close('close');

  }

  // Intialize form
  private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
  }
}
