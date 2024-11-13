import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Api } from "src/core/admin/providers/api/api";

@Injectable()
export class SellerCategoriesService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();
  //sellerCategoriesList
  public sellerCategoriesList(params: any): Observable<any> {
    let id=params.sellerId;
    delete params['sellerId']
    return this.http.get(`${this.basUrl}/admin-seller/${id}/seller-category`,{params:params})
  }
  // updateSellerCategories
  public updateSellerCategories(params: any): Observable<any> {
    let id=params.sellerId;
    delete params['params.sellerId']
    return this.http.put(`${this.basUrl}/admin-seller/${id}/verify-category`,params)
  }

  // sellerCategoryCount
  public sellerCategoryCount(params: any): Observable<any> {
    let id=params.sellerId;
    delete params['sellerId']
    return this.http.get(`${this.basUrl}/admin-seller/${id}/seller-category`,{params:params})
  }
  // categoryVerify
  public categoryVerify(params: any): Observable<any> {
    const id = params.id;
    delete params['id'];
    return this.http.put(`${this.basUrl}/admin-seller/${id}`, params);
  }

}
