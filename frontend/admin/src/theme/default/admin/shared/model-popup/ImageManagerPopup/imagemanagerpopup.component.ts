/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/index';
import { MediaSandbox } from '../../../../../../core/admin/catalog/media/media.sandbox';
import { ConfigService } from '../../../../../../core/admin/service/config.service';
import { HTTPStatus } from '../../../../../../core/admin/providers/CommonInterceptor';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../../../src/environments/environment';
// import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'lodash';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-imagemanagerpopup',
  templateUrl: './imagemanagerpopup.html',
  styleUrls: ['./imagemanagerpopup.css']
})
export class ImagemanagerpopupComponent implements OnInit, OnDestroy {


  @ViewChild('filePath') filePath: ElementRef;
  @Input() user: any;
  // createFolder event
  public textValue: any;
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
  // ngOnDestroy event
  private subscriptions: Array<Subscription> = [];
  private subscription: Array<Subscription> = [];
  // loader
  public loader: any;
  // folder path show on top
  public folderPathName: string;
  public globalTempData: string;
  public refreshPath: string;
  public prefixPath = false;
  public folderPathNames: string;
  public isTooltip = false;
  public pageSize = 100;
  public offset: any;
  public isLoadMore = true;
  public checkedData: any = [];
  public unCheckData: any = [];
  public multipleSelected: any = [];

  public selectedImages: any = [];
  translateName: any;
  amt = 0;
  maxNo = false;
  list: any;
  public imageContent:any=[];
  @Input() maxLength:number



  constructor(
    public modal: NgbActiveModal,
    public mediaSandbox: MediaSandbox,
    public configService: ConfigService,
    private httpStatus: HTTPStatus,
    public toaster: ToastrService,
    public translate:TranslateService, 

  ) {
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
    this.currentFolder = '';
    this.getBucketList('');
    this.imageUrls = this.configService.getImageUrl();
    
  }

  /**
   * Handles form 'getBucketList' event. Calls sandbox bucketListApi.
   *
   * @param foldername create folder  event
   * @param limit as default '100'.
   */

  public getBucketList(foldername: string) {
    this.prefixPath = false;
    this.refreshPath = foldername;
    const params: any = {};
    params.folderName = foldername;
    params.limit = this.pageSize;
    params.marker = '';
    this.folderPathName = foldername;
    this.mediaSandbox.bucketListApi(params);
    this.subscribe();
    this.globalTempData = foldername;
    this.folderPathTitle(this.folderPathName);
  }

  subscribe() {
    this.mediaSandbox.getBucketListData$.subscribe(data => {
      if (data && Object.keys(data).length) {
        if (data.NextMarker) {
          this.offset = data.NextMarker;
        } else {
          this.isLoadMore = false;
        }
        this.imageContent = data.Contents;
        this.imageContent = this.imageContent.map((item)=> {
          return { ...item, selected: false };
        })
      }
    });
  }

  public refresh() {
    this.isLoadMore = true;
    this.mediaSandbox.clearBucketList();
    this.prefixPath = false;
    const params: any = {};
    params.limit = this.pageSize;
    params.folderName = this.refreshPath;
    params.marker = '';
    this.mediaSandbox.bucketListApi(params);
    this.folderPathTitle(this.folderPathName);
  }

  public getBucketLists(foldername: string) {
    this.prefixPath = true;
    const params: any = {};
    params.folderName = foldername;
    params.limit = this.pageSize;
    params.marker = '';
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

  public openFolder(folder) {
    this.checkedData = [];
    this.unCheckData = [];
    this.multipleSelected = [];
    this.isLoadMore = false;
    this.mediaSandbox.clearBucketList();
    this.currentFolder = folder;
    this.getBucketList(folder);
  }

  /**
   * Handles enhanceName event .
   *
   * @param file enhanceName the data by spliting by (/).
   */
  public enhanceName(file) {
    const newValue = file?.split('/');
    return newValue[newValue.length - 1];
  }

  /**
   * Handles removeSlash event .
   *
   * @param data removes  the data by spliting by (/).
   */

  public removeSlash(data) {
    this.list=data
    const newValue = this.list?.split('/');
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
  public goBack(path) {
    this.mediaSandbox.clearBucketList();
    let previousPath: any;
    const tempPath = path?.split('/');
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
      this.isLoadMore = true;

    }
    this.getBucketList(previousPath);
  }

  /**
   * Handles deleteFile event .calls mediaSandbox deleteFile .
   *And subscribe for refreshing the page by calling getBucketList function.
   * @params file.
   */

   public deleteFile() {
    const params: any = {};
    params.delete = this.checkedData;
    this.mediaSandbox.bulkImageDelete(params);
    this.mediaSandbox.bulkImageDelete$.subscribe(data => {
      if (data) {
        if (data.status === 1) {
          this.checkedData = [];
          this.isLoadMore = true;
          this.mediaSandbox.clearBucketList();
          this.getBucketList(this.globalTempData);
        }
      }
    });
  }

  /**
   * Handles createFolder event .calls mediaSandbox getbuckcreatefolder .
   *
   * @param param.
   *
   * According to the condition it store the values in param.
   */
  public createFolder() {
    const param: any = {};
    if (this.currentFolder === '') {
      param.folderName = (this.textValue + '/').toLowerCase();

  
    } else {
      param.folderName = (this.currentFolder + this.textValue + '/').toLowerCase();
     
    }
    this.mediaSandbox.getbuckcreatefolder(param);
    this.subscription.push(this.mediaSandbox.getBucketListData$.subscribe(data => {
      if (data) {
        this.isTooltip = false;
        this.textValue = '';
      }
    }));
    this.subscription.forEach(each => each.unsubscribe());
  }

  /**
   * Handles uploadImageAction event .calls  convertBase64 event.
   *
   * @param event.
   *
   * store the event in selecetdFile variable.
   */
  public uploadImageAction(event) {
    const size = Math.round(event.target.files[0].size / 1024);
    if (size > 10240) {
      this.translateName=this.translate.instant('reports.Imagesizeshouldbelessthan10MB');
      this.toaster.error('this.translateName');
      return;
    }
    this.selecetdFile = event.target;
    this.convertBase64(this.selecetdFile);
  }

  /**
   * Handles uploadImage event .calls  convertBase64 event.
   */
  public uploadImage() {
    const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
    el.click();
  }



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
    this.selectedImages = [];
    if (inputValue.files.length > 5) {
      this.toaster.error('Maximum 5 images can be uploaded');
      return;
    }
    else {
      for (let i = 0; i < inputValue.files.length; i++) {
        const file: File = inputValue.files[i];
        const myReader: FileReader = new FileReader();
        myReader.onloadend = e => {
          const params: any = {};
          params.image = myReader.result;
          params.path = this.globalTempData;
          params.fileName = inputValue.files[i].name;
          // this.mediaSandbox.getbuckupload(params);
          this.selectedImages.push(params);
          if (inputValue.files.length - 1 === i) {
            const param: any = {};
            param.image = this.selectedImages;
            this.mediaSandbox.bulkImageUpload(param);
            this.mediaSandbox.bulkImageUpload$.subscribe(data => {
              if (data && data.status === 1) {
                this.mediaSandbox.clearBucketList();
                this.getBucketList(this.globalTempData);
              }
            })
            // const paramss: any = {};
            // paramss.selectedImages = this.selectedImages;
            // this.mediaSandbox.bulkImageUpload(paramss);
          }
        };
        myReader.readAsDataURL(file);


      }


      // this.mediaSandbox.getbuckupload(this.selectedImages);
    }
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
  private regSubscribeEvents() {
    this.subscriptions.push(
      this.mediaSandbox.getMediaCreatefold$.subscribe(create => {
        if (create && create.status === 1) {
          this.isLoadMore = true;
          this.mediaSandbox.clearBucketList();
          this.getBucketList(this.currentFolder);
        }
      })
    );
    this.subscriptions.push(
      this.mediaSandbox.getMediaUpload$.subscribe(upload => {
        if (upload && upload.status === 1) {
          this.isLoadMore = true;
          this.mediaSandbox.clearBucketList();
          this.getBucketLists(this.folderPathName);
        }
      })
    );
  }

  // store the checked file to delete
  // fileCheckBox(event, file, ind) {
  //   this.deleteImage = event.target.value;
  //   const data = file?.split('/');
  //   const params: any = {};
  //   params.pathName = this.globalTempData;
  //   params.fileName = data[data.length - 1];
  //   if (event.target.checked) {
  //     this.amt++
  //     this.maxLength++
  //     this.checkedData.push(file);
  //     console.log(this.checkedData,"checkedData")
  //     this.imageContent.forEach((res,index) => {
  //       if(ind == index){
  //         res.selected = true
  //       }
        
  //     })
  //     }
  //   else {
  //     this.amt--
  //     this.maxLength--
  //     this.unCheckData.push(params);
  //       this.unCheckData.forEach((value, index) => {
  //           this.checkedData = this.checkedData.filter(_value => {
  //               if (value === _value) {
  //                   return false;
  //               } else {
  //                   return true;
  //               }
  //           });
  //       });
  //   }
  //   this.amt ===  environment.maxImage ? this.maxNo = true : this.maxNo = false;
  //   }

  fileCheckBox(event, file, ind) {
    this.deleteImage = event.target.value;
    const data = file?.split('/');
    const params: any = {};
    params.pathName = this.globalTempData;
    params.fileName = data[data.length - 1];
  
    if (event.target.checked) {
      this.amt++;
      this.maxLength++;
      this.checkedData.push(file);  
      // Mark the selected image
      this.imageContent.forEach((res, index) => {
        if (ind === index) {
          res.selected = true;
        }
      });
    } else {
      this.amt--;
      this.maxLength--;
  
      // Remove from checkedData and push to unCheckData
      this.unCheckData.push(params);
      
      // Filter out the unchecked file from checkedData
      this.checkedData = this.checkedData.filter((checkedFile) => {
        return checkedFile !== file;
      });
  
      // Mark the unselected image
      this.imageContent.forEach((res, index) => {
        if (ind === index) {
          res.selected = false;
        }
      });
    }
  
    // Check if the maximum number of images has been reached
    this.maxNo = (this.amt === environment.maxImage);
  }
  


  // Multiple image at a time

  registerImage() {
    this.checkedData.forEach(data => {
      if (data) {
        const tempData = data.split('/');
        let folderPath: string = '';
        
        // Construct the folder path
        for (let i = 0; i < tempData.length - 1; i++) {
          folderPath = folderPath + tempData[i] + '/';
        }
        
        const param: any = {};
        param.containerName = folderPath;
        param.image = tempData[tempData.length - 1];
        
        // Check for duplicates before pushing
        const isDuplicate = this.multipleSelected.some(item => 
          item.containerName === param.containerName && item.image === param.image
        );
        
        if (!isDuplicate) {
          this.multipleSelected.push(param);
        }
      }
    });
        this.toaster.success('Image inserted successfully');
    this.close();
  }
  // single image at a time

  public selectFile(file) {
    const tempData = file?.split('/');
    let folderPath: any = '';
    for (let i = 0; i < tempData.length - 1; i++) {
      folderPath = folderPath + tempData[i] + '/';
    }
    const param: any = {};
    
    param.containerName = folderPath;
    param.image = tempData[tempData.length - 1];
    this.multipleSelected.push(param);
    // this.close();
  }

  /** calls mediaSandbox searchFolders.
   * @param from event,
   * If no value it calls getBucketList.**/
  search_Folder(event) {
    if (event) {
      const param: any = {};
      param.folderName = event;
      param.search = true;
      this.isLoadMore = false;
      this.mediaSandbox.searchFolders(param);
    } else if (!event) {
      const folderPath = ' ';
      this.getBucketList(folderPath);
      this.isLoadMore = true;
    }
  }

  folderPathTitles(file) {

  }

  folderPathTitle(file) {
    if (file.charAt(0) === '') {
    }

    this.folderPathNames = '';
    if (file !== '') {
      const tempData = file?.split('/');
      for (let i = 0; i < tempData.length; i++) {
        this.folderPathNames += ' > ' + tempData[i];
      }
    }
  }

  // unsubscribing  all the subscribe event.
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
    this.mediaSandbox.clearBucketList();
  }

  /**
   * Handles enhanceName event .
   *
   * @param file enhanceName the data by spliting by (/).
   */
  public getImage(image) {
    let folderPath = '/';
    const tempData = image?.split('/');
    const tempImage = tempData[tempData.length - 1];
    if (tempData.length > 1) {
      tempData.pop();
      folderPath = tempData.join('/') + '/';
    }
    this.globalTempData = tempData;
    // return this.imageUrls + '?width=120&height=120&path=' + this.currentFolder + '&name=' + tempImage;
  }

  getMoreBucketList() {
    this.mediaSandbox.getBucketListData$.subscribe(data => {
      if (data && Object.keys(data).length) {
        if (data.NextMarker) {
          this.offset = data.NextMarker;
        } else {
          this.isLoadMore = false;
        }
      }
    });
    const params: any = {};
    params.limit = this.pageSize;
    params.folderName = this.refreshPath;
    params.marker = this.offset;
    this.mediaSandbox.bucketListApi(params);
  }

}
