/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
// model
import {ManufacturerListModel} from './models/manufacture-list.model';
import {ManufacturerCountModel} from './models/manufacturer-count.model';
import {Api} from '../../providers/api/api';

@Injectable()
export class BrandApiClient extends Api {
// url address
    private url: string = this.getBaseUrl();
    public editData: any;
    public delManufactvalue: any;
    public pageoffset: any;
    public pagesize: any;
    public ischecked: any;
    public imageValue: any;
    public checkLength: any = [];

    deletePagerefresh(pageoffset, pagesize) {
        this.pageoffset = pageoffset;
        this.pagesize = pagesize;
    }

    // delete data value
    setDelManufact(value: any, checked: any, checkLength: any) {
        this.delManufactvalue = value;
        this.ischecked = checked;
        this.checkLength = checkLength;
    }

    getDelManufact() {
        return this.delManufactvalue;
    }

    // passing manufacture editdata
    setManufactureEditValue(editdata) {
        this.editData = editdata;
    }

    getManufacturerEditeValue() {
        return this.editData;
    }

    /**
     * Handles 'manufacturerList' function. Calls get method with specific api address
     * along its param.
     *
     * @param params form ManufacturerListModel
     */

    public manufacturerList(params: ManufacturerListModel): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/manufacturer/manufacturerlist', {params: reqOpts});
    }

    /**
     * Handles 'manufacturerCount' function. Calls get method with specific api address
     * along its param.
     *
     * @param params from model
     */
    manufacturerCount(params: ManufacturerCountModel) {
        let reqOpts: any = {};
        reqOpts = params;

        return this.http.get(this.url + '/manufacturer/manufacturerlist', {params: reqOpts});
    }

    /**
     * Handles 'updateManufacturer' function. Calls put method with specific api address
     * along its param.
     *
     * @param value from model
     */
    updateManufacturer(value: any) {
        return this.http.put(this.url + '/manufacturer/update-manufacturer/' + value.manufacturerId, value);
    }

    /**
     * Handles 'addManufactureData' function. Calls post method with specific api address
     * along its param.
     *
     * @param value from model
     */
    addManufactureData(value: any) {
        return this.http.post(this.url + '/manufacturer/create-manufacturer', value);
    }

    /**
     * Handles 'deleteManufacturer' function. Calls delete method with specific api address
     * along its param.
     *
     * @param value from model
     */

    deleteManufacturer(value: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: false,
            body: {manufacturerId: value.manufacturerId}
        };

        return this.http.delete(this.url + '/manufacturer/delete-manufacturer/' + value.manufacturerId, httpOptions);
    }

    bulkDelete(value: any) {
        return this.http.post(this.url + '/manufacturer/delete-manufacturer', value);
    }

    public exportManufacturer(params: any): Observable<any> {
        const reqOpts: any = {};
        reqOpts.responseType = 'arraybuffer';
        if (params) {
          reqOpts.params = new HttpParams();
          for (const k in params) {
            if (k) {
              reqOpts.params = reqOpts.params.set(k, params[k]);
            }
          }
        }
        return this.http.get(this.url + '/manufacturer/manufacturer-excel-list',  reqOpts);
      }


}
