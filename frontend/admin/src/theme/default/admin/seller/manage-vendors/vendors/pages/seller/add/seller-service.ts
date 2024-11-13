import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';

@Injectable()
export class SellerServices extends Api {
  private apiUrl = this.getBaseUrl();
  private apiUrlPaths = {
    uploadDocument: '/media/upload-file',
    uploadFile: '/media/upload-file',
    getDocumentList : '/admin-vendor/master/document',
    getDocumentCount: '/vendor-document',
    updateDocument: '/vendor-document',

    
  };

// updateDocument 
  public uploadDocument(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.apiUrlPaths.uploadDocument}`, params);

  }

//   uploadFile
public uploadFile(params: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.apiUrlPaths.uploadFile}`, params);

  }

   /*DOCUMENT LIST API */

  public getDocumentList(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.apiUrlPaths.getDocumentList}`, { params: params });
  }

/*  DOCUMENT LISI API  COUNT */
public getDocumentCount(params: any): Observable<any> {
  return this.http.get(`${this.apiUrl}${this.apiUrlPaths.getDocumentCount}`, { params: params });
}

/*  updateDocument api*/
public updateDocument(params: any): Observable<any> {
  return this.http.post(`${this.apiUrl}${this.apiUrlPaths.updateDocument}` , params);
}


  
}