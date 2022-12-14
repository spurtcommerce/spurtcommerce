/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';
import { CkeConfiqService } from 'src/core/admin/shared/ckeconfiq/ckeconfiq.service';

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

  public emailTemplateForm: FormGroup;
  public title: FormControl;
  public subject: FormControl;
  public content: FormControl;
  public status: FormControl;
  public updateTitle: number;
  private editEmailTempId: string;
  private editEmailTemplateInfo: any = [];
  public price: string;
  public submitted = false;
  public config: any;
  constructor(
    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: EmailTempSandbox,
    private router: Router,
    public service: EmailTempService,
    private ckeconfiqservice: CkeConfiqService
  ) {
    this.config = this.ckeconfiqservice.getckeconfig();
  }

  get f() {
    return this.emailTemplateForm.controls;
  }

  ngOnInit() {
    this.initForm();
    this.editEmailTempId = this.route.snapshot.paramMap.get('id');
    this.setDefaultValues();
    this.editEmailtempList();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  setDefaultValues() {
    this.emailTemplateForm.patchValue({ postalcode: 'Yes', tc: true });
  }

  initForm() {
    this.emailTemplateForm = this.fb.group({
      title: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      content: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
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
  onSubmit(data) {
    this.submitted = true;
    if (this.emailTemplateForm.invalid) {
      return;
    }
    const para: any = {};
    para.title = this.emailTemplateForm.value.title;
    para.subject = this.emailTemplateForm.value.subject;
    para.content = this.emailTemplateForm.value.content;
    para.status = this.emailTemplateForm.value.status;

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
        this.emailTemplateForm.controls['title'].setValue(
          this.editEmailTemplateInfo[0].title
        );
        this.emailTemplateForm.controls['subject'].setValue(
          this.editEmailTemplateInfo[0].subject
        );
        this.emailTemplateForm.controls['content'].setValue(
          this.htmlTagConversion(this.editEmailTemplateInfo[0].content)
        );
        this.emailTemplateForm.controls['status'].setValue(
          this.editEmailTemplateInfo[0].isActive
        );
      }
    } else {
      this.emailTemplateForm = null;
    }
  }

  htmlTagConversion(data){
    const val = data
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;','"')
    .replaceAll('&#39;',"'")
    .replaceAll('&sbquo;','‚')
    .replaceAll('&#61;','=')
    .replaceAll('&#45;','-')
    .replaceAll('&hellip;','…')
    .replaceAll('&commat;','@')
    .replaceAll('&copy;','©')
    .replaceAll('&#35;','#')
    .replaceAll('&ldquo;','“')
    .replaceAll('&rsquo;','’')
    .replaceAll('&lsquo;','‘')
    .replaceAll('&trade;','™')
    .replaceAll('&reg;','®')
    .replaceAll('&ndash;','–')
    .replaceAll('&eacute;','é')
    .replaceAll('&euro;','€')
    .replaceAll('&pound;','£');
     return  val ;
  }
}
