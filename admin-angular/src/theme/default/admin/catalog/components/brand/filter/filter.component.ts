/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { BrandSandbox } from '../../../../../../../core/admin/catalog/brand/brand.sandbox';


@Component({
    selector: 'app-catalog-brand-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})

export class BrandFilterComponent implements OnInit {

    public filterForm: FormGroup;
    public keyword: string;
    @Input() pageSize: any;
    private price = 0;
    public status: any;
    public pagenationCount: boolean;
    private selectedLink = 'Min';
    @Output() progressEmit = new EventEmitter<string>();

    constructor(public fb: FormBuilder, public sandbox: ProductSandbox, public brandSandBox: BrandSandbox) { }

    ngOnInit() {
        this.pageSize = sessionStorage.getItem('itemsPerPage');
        this.pagenationCount = true;
        this.initFilterForm();
    }

    initFilterForm() {
        this.filterForm = this.fb.group({
            keyword: ['', Validators.required],
            status: [null, Validators.required],
        });
    }

    selectPrice(e: string): void {
        this.selectedLink = e;
    }

    resetFilter() {
        if (this.filterForm.value.keyword || this.filterForm.value.status || this.filterForm.value.status === 0) {
            this.filterForm.reset();
            const param: any = {};
            param.limit = this.pageSize;
            param.offset = 0;
            param.keyword = '';
            param.status = '';
            this.progressEmit.emit(param);
            this.brandSandBox.manufacturerList(param);
            param.count = 1;
            this.brandSandBox.manufacturerCount(param);
        }

    }

    applyFilter() {
        this.keyword = this.filterForm.value.keyword ? this.filterForm.value.keyword : '';
        this.status = this.filterForm.value.status === 0 ? this.status = '0' : this.filterForm.value.status === 1 ? this.status = '1' : '';
        const param: any = {};
        param.keyword = this.keyword;
        param.status = this.status;
        this.progressEmit.emit(param);

    }
}
