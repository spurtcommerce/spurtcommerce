/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, EventEmitter, Output, Input, SimpleChanges, OnChanges } from '@angular/core';

import * as _ from 'underscore';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html',
    styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnChanges {

    pager: any = {};
    @Input() counts: any;
    @Input() currentPage: any;
    @Input() pageSize: any;
    @Output() pageChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.counts > 0) {
            this.setPage(this.pager.currentPage ? this.pager.currentPage : 1);
        } else if (this.counts === 0) {
            this.pager = {};
        }
    }

    pageClicked(page) {
        if (page < 1 || page > this.pager.totalPages || page === this.pager.currentPage) {
            return;
        }
        this.pageChange.emit(page);
        this.setPage(page);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.getPager(this.counts, page, this.pageSize);
    }

    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {

        const totalPages = Math.ceil(totalItems / pageSize);
        let startPage: number, endPage: number;

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        const pages = _.range(startPage, endPage + 1);

        if (totalPages < this.pager.totalPages) {
            if (currentPage > totalPages) {
                currentPage = currentPage - 1;
            }
            this.pageChange.emit(currentPage);
        }

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

}
