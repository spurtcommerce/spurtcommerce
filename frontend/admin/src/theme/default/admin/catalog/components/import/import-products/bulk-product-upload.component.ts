/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ImportSandbox } from '../../../../../../../core/admin/catalog/import/import.sandbox';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { title } from 'process';
// import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-bulk-product-upload',
  templateUrl: './bulk-product-upload.component.html',
  styleUrls: ['./bulk-product-upload.component.scss']
})
export class BulkProductUploadComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  public zipFileName: any;
  public zipFile: any;
  public zipFileError = '';
  public Title = 'Bulk Products';
  public multipleFile: any = [];
  public zipFileSelected = false;
  private subscriptions: Array<Subscription> = [];
  public initialPage = true;
  public uploadPage = false;
  public uploadSubmit = false;


  constructor(public sandbox: ImportSandbox,
    public toastr: ToastrService,
    public titleService:Title,
    public cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.titleService.setTitle(this.Title);
  }

  downloadFile() {
    this.sandbox.downloadFile({});
  }

  uploadZip() {
    this.initialPage = false;
    this.uploadPage = true;
  }

  onUpload(event) {
    this.zipFile = event.target.files[0];
    this.zipFileName = event.target.files[0].name;
  }

  reset(fileInput) {
    this.zipFileName = '';
    this.zipFile = undefined;
    this.uploadSubmit = false;
    this.fileInput.nativeElement.value = '';
  }

  // upload file

  uploadSuccess() {
    this.uploadSubmit = true;
    if (!this.zipFile) {
      return;
    }
    const ext = /^.+\.([^.]+)$/.exec(this.zipFile.name);
    if (!ext || (ext && ext[1] !== 'zip')) {
      this.toastr.error('Please choose the zip file');
      this.zipFile = undefined;
      this.zipFileName = '';
      return;
    }
    const params: any = {};
    params.file = this.zipFile;
    this.sandbox.uploadFile(params);
    this.subscriptions.push(this.sandbox.uploadFile$.subscribe(data => {
      if (data && data.status === 1) {
        this.uploadPage = false;
        this.initialPage = true;
        this.zipFileSelected = false;
        this.zipFileName = '';
        this.cd.detectChanges();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
