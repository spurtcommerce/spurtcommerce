/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// service
import { ConfigService } from '../../service/config.service';
import { Api } from '../../providers/api/api';

@Injectable()
export class AuditLogService extends Api {

    params: any = {};
    private url = this.getBaseUrl();

    // AUTH API SERVICE //
    // login
    auditLogList(params): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/auditlog/auditLog-list', { params: reqOpts });
    }

    auditLogDelete(params): Observable<any> {
        let reqOpts: any = {};
        reqOpts = params;
        return this.http.delete(this.url + '', { params: reqOpts });
    }


    auditModuleList(params): Observable<any> {
        return this.http.get(this.url + '/auditlog/module-list', { params: params });
    }

    auditLogListCount(params): Observable<any> {
        return this.http.get(this.url + '/auditlog/auditLog-list', { params: params });
    }

    userlist(params): Observable<any> {

        return this.http.get(this.url + '/auth/userlist', { params: params });
    }
    deleteLogs(params): Observable<any> {
        return this.http.post(this.url + '/auditlog/delete-auditlog', params);
    }


}

