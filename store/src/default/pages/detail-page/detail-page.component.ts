/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ListsSandbox} from '../../../core/lists/lists.sandbox';

@Component({
    selector: 'app-page-detail',
    templateUrl: './detail-page.component.html',
    styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
    // page detail
    private pageId: any;

    constructor(public router: Router,
                public activatedRoute: ActivatedRoute,
                public listSandbox: ListsSandbox) {
        // subscribe route params and assign id to pageId (from footer component)
        this.activatedRoute.params.subscribe(param => {
            this.pageId = param['id'];
            this.getPageDetails(this.pageId);
        });
    }

    ngOnInit() {
    }
        // calls listSandbox getPageDetail for detail page
    getPageDetails(id) {
        this.listSandbox.getPageDetail(id);
    }
}
