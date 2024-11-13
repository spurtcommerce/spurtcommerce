import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';


@Injectable()
export class CompanyVerifyService extends Api {


  // url
  private basUrl = this.getBaseUrl();

  //companyVerify

  public CompanyVerify(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor/' + params.vendorId);
  }

  //companyVerifychecked

  public companyVerifychecked(param: any): Observable<any> {
    const id = param.id;
    delete param['id'];
    return this.http.put(`${this.basUrl}/admin-vendor/approve-vendor/${id}`, param);
  }


  //countryList

  public countryList(param: any): Observable<any> {
    const id = param.id;
    return this.http.get(`${this.basUrl}/country`, param);
  }



  // companyVerifycheckedApi 
  public companyVerifycheckedApi(param: any): Observable<any> {

    const id = param.id;
    delete param['id'];
    return this.http.put(`${this.basUrl}/admin-seller/${id}`, param);

  }

  //verificationStatus

  public verificationStatus(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor/' + params.vendorId);
  }

    //verificationStatus

    public verificationSettingApi(params: any): Observable<any> {
      params.defaultWebsite =1
      return this.http.get(this.basUrl + '/settings',{params:params});
    }
}

