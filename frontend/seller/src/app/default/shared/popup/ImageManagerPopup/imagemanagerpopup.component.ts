/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/index';
import { MediaSandbox } from '../../../../core/media/media.sandbox';
import { environment } from '../../../../../environments/environment';
import { HTTPStatus } from '../../../../core/providers/interceptor/request.interceptor';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-imagemanagerpopup',
  templateUrl: './imagemanagerpopup.html',
  styleUrls: ['./imagemanagerpopup.scss'],
})
export class ImagemanagerpopupComponent implements OnInit, OnDestroy {
  @ViewChild('filePath') filePath: ElementRef;
  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  @Input() imageLimit: number
  // createFolder event
  public textValue: any;
  public textValues: any;
  // openFolder event
  private currentFolder: string;
  // selectFile event
  private selectedFiles: any;
  // uploadImageAction event
  private selecetdFile: any;
  // image
  public imageUrls: string;
  // delete file
  private deleteImage: string;
  private subscription: Array<Subscription> = [];
  // ngOnDestroy event
  private subscriptions: Array<Subscription> = [];
  // loader
  public loader: any;
  imageLoader: boolean = false;
  // folder path show on top
  public folderPathName: string;
  public globalTempData: string;
  public refreshPath: string;
  public prefixPath = false;
  public createFolderEnable = false;
  public folderPathNames: string;
  public folderPathNameApiFormat: string;
  public vendorPrefixId = JSON.parse(localStorage.getItem('vendorUserDetails')).vendorPrefixId;
  public prefixId = ' >' + this.vendorPrefixId + ' >';
  restrict: number = environment.folderNameLength;


  public checkedData: any = [];
  public unCheckData: any = [];
  public multipleSelected: any = [];
  public translateName: any;
  imageContent: any = [];
  counter: number;
  checkedNumber = 0;
  limitNumber = 3;
  isCheckMax = true;
  maxNo = false;
  check02 = false;
  // iscloseSearch = false;


  //namehide
  FolderNameShow: any = true;
  ImageNameShow: any = true;

  amt = 0;

  public keyword: any;
  queryParams: any = {};
  textAddValue: string;
  PriFixValue: any;

  constructor(
    public modal: NgbActiveModal,
    public mediaSandbox: MediaSandbox,
    public translate: TranslateService,
    public ref: ChangeDetectorRef,
    private httpStatus: HTTPStatus, public toaster: ToastrService) {
    this.folderPathNames = this.prefixId;
    this.regSubscribeEvents();
    this.getHttpResponse();

  }

  getHttpResponse() {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
    });
  }

  // Initially calls getBucketList event with empty param.
  /**
   * Handles ngOnInit,Initially calls getBucketList event with empty param.
   *
   *   and assigning  configService url
   */
  ngOnInit() {

    this.imageUrls = environment.imageUrl;
    this.currentFolder = '';
    this.getBucketList('');
  }

  clickToOpen(): void {
    this.createFolderEnable = true;
  }

  /**
   * Handles form 'getBucketList' event. Calls sandbox bucketListApi.
   *
   * @param foldername create folder  event
   * @param limit as default '100'.
   */

  public getBucketList(foldername: string): void {

    this.prefixPath = false;
    this.refreshPath = foldername;
    const params: any = {};
    params.folderName = foldername ? foldername : this.vendorPrefixId.toLowerCase() + '/';
    params.limit = 100;
    this.folderPathName = foldername;
    this.mediaSandbox.bucketListApi(params);
  this.subscriptions.push(this.mediaSandbox.getBucketListData$.subscribe((data: any) => {
      if (data) {
        this.folderPathNameApiFormat = data.Prefix;
        this.imageContent = data.Contents;
        this.imageContent = this.imageContent.map((item) => {
          return { ...item, selected: false };
        })
      }


    }))



    this.globalTempData = foldername;
    this.folderPathTitle(this.folderPathName);
  }

  public refresh(): void {
    this.prefixPath = false;
    const params: any = {};
    params.limit = 100;
    params.folderName = this.folderPathNameApiFormat;
    this.mediaSandbox.bucketListApi(params);
    this.folderPathTitle(this.folderPathName);
  }

  public getBucketLists(foldername: string): void {
    this.prefixPath = true;
    const params: any = {};
    params.folderName = this.folderPathNameApiFormat;
    params.limit = 100;
    this.folderPathName = foldername;
    this.mediaSandbox.bucketListApi(params);
    this.globalTempData = foldername;
    this.folderPathTitles(this.folderPathName);
  }

  /**
   * Handles openFolder event .And calls getBucketList event
   *
   * @param folder create folder  by clicking the folder event
   */

  public openFolder(folder): void {
    this.checkedData = [];
    this.unCheckData = [];
    this.multipleSelected = [];
    this.currentFolder = folder;
    this.getBucketList(folder);
  }

  /**
   * Handles enhanceName event .
   *
   * @param file enhanceName the data by spliting by (/).
   */
  public enhanceName(file) {
    const newValue = file.split('/');
    return newValue[newValue.length - 1];
  }

  /**
   * Handles removeSlash event .
   *
   * @param data removes  the data by spliting by (/).
   */

  public removeSlash(data) {
    const newValue = data.split('/');
    return newValue[newValue.length - 2];
  }

  /**
   * Handles goBack event .
   *
   * @param path removes  the data by spliting by (/).
   *
   *check the conditon if it true store data in previousPath
   * else  store data in previousPath with previousPath.
   *
   * calls the getBucketList event
   */
  public goBack(path): void {
    let previousPath: any;
    this.folderPathNameApiFormat = path;
    const tempPath = path.split('/');
    for (let i = 0; i < tempPath.length - 2; i++) {
      if (i === 0) {
        previousPath = tempPath[i] + '/';
      } else {
        previousPath = previousPath + tempPath[i] + '/';
      }
    }
    // this.folderPathNameUp=previousPath;
    if (previousPath === undefined) {
      previousPath = '';
    }
    this.getBucketList(previousPath);
  }

  /**
   * Handles deleteFile event .calls mediaSandbox deleteFile .
   *And subscribe for refreshing the page by calling getBucketList function.
   * @params file.
   */

  public deleteFile(): void {
    const params: any = {};
    params.fileName = this.deleteImage;
    this.mediaSandbox.deleteFile(params);
  this.subscription.push(this.mediaSandbox.getBucketDeleteFile$.subscribe(data => {
      if (data) {
        if (data.status === 1) {
          this.getBucketList(this.globalTempData);
          this.checkedData = [];
          this.unCheckData = [];
          this.multipleSelected = [];
        }
      }
    }));



  }

  /**
   * Handles createFolder event .calls mediaSandbox getbuckcreatefolder .
   *
   * @param param.
   *
   * According to the condition it store the values in param.
   */


  formatText(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .trim();
  }
  public createFolder(): void {
    const param: any = {};
    // if (this.currentFolder === '') {
    //   param.folderName = this.vendorPrefixId.toLowerCase()+'/' + this.textValue + '/';
    // } else {
    // }
    let changePath = this.formatText(this.textValue)
    param.folderName = this.folderPathNameApiFormat + changePath + '/';
    this.mediaSandbox.getbuckcreatefolder(param);
    this.mediaSandbox.getCreateFolderLoaded$.subscribe(data => {
      if (data === true) {
        this.createFolderEnable = false;
        this.textValue = '';
      }
    });
  }

  /**
   * Handles uploadImageAction event .calls  convertBase64 event.
   *
   * @param event.
   *
   * store the event in selecetdFile variable.
   */
  getImageType(imageName) {




    // Define the regex pattern for image types
    const imagePattern = environment.imageType;

    // Test if the file name matches the pattern
    imagePattern.test(imageName);


    return imagePattern.test(imageName);
  }

  isValidFile(file) {
    return environment.imageType.test(file);
  }

  kbToMb(kb) {
    return Math.round(kb / 1024);
  }


  public uploadImageAction(event) {


    const size = Math.round(event.target.files[0].size / 1024);

    if (!this.getImageType(event.target.files[0].name)) {
      this.toaster.error(environment.imageTypeSupport)
      this.translateName = 'translate', this.translate.instant('managedelivery');

      return;
    }

    if (size > environment?.ImageManager) {
      let error = `Please upload image below ${this.kbToMb(environment?.ImageManager)} mb`
      this.toaster.error(error)
      this.translateName = 'translate', this.translate.instant('managedelivery');

      return;
    }
    this.selecetdFile = event.target;
    if (this.selecetdFile) {
    }
    this.convertBase64(this.selecetdFile);
  }

  /**
   * Handles uploadImage event .calls  convertBase64 event.
   */
  public uploadImage(): void {
    const el: HTMLInputElement = this.filePath.nativeElement as HTMLInputElement;
    el.value = ''; // Reset the value to ensure change detection
    // this.ref.detectChanges();
    el.click();
  }

  // Handles close event to close the image manager popup along with arguments
  close() {
    if (this.multipleSelected.length > 0) {
      this.modal.close(this.multipleSelected);
    } else {
      this.modal.close();
    }
  }

  /**
   * Handles convertBase64 event .converts the data into base 64 format.
   *
   * calls mediaSandbox getbuckupload
   *
   * @param inputValue from  uploadImageAction event.
   *
   * then calls close event.
   */
  private convertBase64(inputValue: any): void {



    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      const params: any = {};
      params.image = myReader.result;
      params.path = this.folderPathNameApiFormat;
      params.fileName = inputValue.files[0].name;
      params.fileType = 0;
      this.imageLoader = true;

      this.ref.detectChanges();
      this.mediaSandbox.getbuckupload(params);
    };
    myReader.readAsDataURL(file);
  }

  /**
   * Handles regSubscribeEvents event .
   *
   * subscribe mediaSandbox getMediaCreatefold$
   *
   * subscribe mediaSandbox getMediaUpload$
   *
   * If the respose is succesfull then call getBucketList event.
   */
  private regSubscribeEvents(): void {
    this.subscriptions.push(
      this.mediaSandbox.getMediaCreatefold$.subscribe(create => {
        if (create && create.status === 1) {
          this.imageLoader = false;
          this.getBucketList(this.folderPathNameApiFormat);
        }
      }, err => {
        throw err;
      })
    );
    this.subscriptions.push(
      this.mediaSandbox.getMediaUpload$.subscribe(upload => {
        if (upload && upload.status === 1) {
          this.imageLoader = false;
          this.getBucketLists(this.folderPathName);
        }
      })
    );
    // getmediauploadRequestFailed
    this.subscriptions.push(
      this.mediaSandbox.getmediauploadRequestFailed$.subscribe(upload => {
        if (upload) {
          this.imageLoader = false;
        }
      })
    );
  }

  /** calls mediaSandbox searchFolders.
   * @param from event,
   * If no value it calls getBucketList.**/
  searchFolder(event) {
    if (event) {
      const param: any = {};
      param.folderName = event;
      this.mediaSandbox.searchFolders(param);
    } else if (!event) {
      const folderPath = this.currentFolder;
      this.getBucketList(folderPath);
    }
  }

  folderPathTitles(file) {

  }

  folderPathTitle(file) {
    if (file?.charAt(0) === '') {
    }

    this.folderPathNames = '';
    this.folderPathNameApiFormat = '';
    if (file !== '') {
      const tempData = file.split('/');
      for (let i = 0; i < tempData.length; i++) {
        this.folderPathNames += ' > ' + tempData[i];
        // this.folderPathNameApiFormat += '/' + tempData[i];
        // this.folderPathNameApiFormat += `${i>0?'/':''}${tempData[i]}`;
      }
    }
  }

  // unsubscribing  all the subscribe event.
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }

  /**
   * Handles enhanceName event .
   *
   * @param file enhanceName the data by spliting by (/).
   */
  public getImage(image) {
    let folderPath = '/';
    const tempData = image.split('/');
    const tempImage = tempData[tempData.length - 1];
    if (tempData.length > 1) {
      tempData.pop();
      folderPath = tempData.join('/') + '/';
    }
    this.globalTempData = tempData;
  }



  // store the checked file to 
  fileCheckBox(event, file, ind) {
    this.deleteImage = event.target.value;

    if (event.target.checked) {
      this.amt++
      this.imageLimit++
      this.checkedData.push(file);

    }
    else {
      this.amt--
      this.imageLimit--
      this.unCheckData.push(file);
      this.unCheckData.forEach((value, index) => {
        this.checkedData = this.checkedData.filter(_value => {
          if (value === _value) {
            return false;
          } else {
            return true;
          }
        });
      });
    }
    this.amt === environment.maxImage ? this.maxNo = true : this.maxNo = false;

  }

  public selectFile(file): void {
    const tempData = file.split('/');
    let folderPath: any = '';
    for (let i = 0; i < tempData.length - 1; i++) {
      folderPath = folderPath + tempData[i] + '/';
    }
    const param: any = {};
    param.containerName = folderPath;
    param.image = tempData[tempData.length - 1];
    this.multipleSelected.push(param);
    this.close();
  }

  registerImage(): void {
    this.checkedData.forEach(data => {
      if (data) {
        const tempData = data.split('/');
        let folderPath: any = '';
        for (let i = 0; i < tempData.length - 1; i++) {
          folderPath = folderPath + tempData[i] + '/';
        }
        const param: any = {};
        param.containerName = folderPath;
        param.image = tempData[tempData.length - 1];
        this.multipleSelected.push(param);
      }
    });

    this.translateName = this.translate.instant('managedelivery.Imageinsertedsuccessfully');

    this.toaster.success('Image inserted successfully');
    this.close();
  }
  dismiss() {
    this.modal.close();
  }
  clearFiles() {
    this.textValues = '';
    this.searchFolder('')
  }
  clearAddFolders() {
    this.textValue = ''
  }
}