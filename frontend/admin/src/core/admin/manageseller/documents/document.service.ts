import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Api } from "src/core/admin/providers/api/api";

@Injectable()
export class documentVerifyService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();
  //documentVerify
  public documentVerifyList(params: any): Observable<any> {
    return this.http.get(this.basUrl + "/admin-seller/document/" + params.sellerId);
  }



   //documentVerifyChecked
   public documentVerifyChecked(param: any): Observable<any> {
    const id = param.id;
    delete param['id'];
    return this.http.put(`${this.basUrl}/admin-vendor/approve-vendor/${id}`, param);
  }

   //DocumentVerifynew
   public DocumentVerifynew(param: any): Observable<any> {
    return this.http.put(this.basUrl+"/admin-vendor/vendor-document/"+param.vendorId, param);
  }

  //documentView
  public documentView(params: any): Observable<any> {
    let data=params.key
    return this.http.get(this.basUrl+"/media/document", { params: params });
  }




}
