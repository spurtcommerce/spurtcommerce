/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';

@Component({
  selector: 'app-spurt-addemail',
  templateUrl: 'add.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class EmailTempAddComponent implements OnInit {
  // FormGroup Variable
  public emailtempForm: FormGroup;
  public title: FormControl;
  public subject: FormControl;
  public content: FormControl;
  public status: FormControl;
  // Variable
  public updatetitle: number;
  private EditEmailTempId: string;
  private editemailtempinfo: any = [];
  public price: string;
  public submitted = false;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: EmailTempSandbox,
    private router: Router,
    public service: EmailTempService
  ) {}

  // VALIDATION
  get f() {
    return this.emailtempForm.controls;
  }

  // initially calls initForm,setDefaultValues,editEmailtempList
  ngOnInit() {
    this.initForm();
    this.EditEmailTempId = this.route.snapshot.paramMap.get('id');
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
    this.emailtempForm.patchValue({ postalcode: 'Yes', tc: true });
  }

  // FormGroup
  initForm() {
    this.emailtempForm = this.fb.group({
      title: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      content: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  // Cancle Action
  emailtempcancel() {
    this.router.navigate(['/settings/local/emailtemp']);
  }

  /**
   * Handles form 'submit' event. Calls sandbox EmailtempAdd  and EmailtempUpdate function if form is valid.
   *
   * @param emailtempForm entire form value
   * @param para storing entire value
   */
  onSubmit(data) {
    this.submitted = true;
    if (this.emailtempForm.invalid) {
      return;
    }
    const para: any = {};
    para.title = this.emailtempForm.value.title;
    para.subject = this.emailtempForm.value.subject;
    para.content = this.emailtempForm.value.content;
    para.status = this.emailtempForm.value.status;

    if (this.editemailtempinfo && this.editemailtempinfo[0]) {
      para.id = this.editemailtempinfo[0].emailTemplateId;
      this.sandbox.updateemailtemp(para);
    } else {
      this.sandbox.addEmailtemp(para);
    }
  }

  // Edit EmailTemp Bind All FormControl
  editEmailtempList() {
    this.editemailtempinfo.push(this.service.getemailtemplistdata());
    if (this.editemailtempinfo[0] !== null) {
      if (this.editemailtempinfo[0] && this.editemailtempinfo[0].title) {
        this.updatetitle = 1;
        this.emailtempForm.controls['title'].setValue(
          this.editemailtempinfo[0].title
        );
        this.emailtempForm.controls['subject'].setValue(
          this.editemailtempinfo[0].subject
        );
        this.emailtempForm.controls['content'].setValue(
          this.editemailtempinfo[0].content
        );
        this.emailtempForm.controls['status'].setValue(
          this.editemailtempinfo[0].isActive
        );
      }
    } else {
      this.emailtempForm = null;
    }
  }
}
