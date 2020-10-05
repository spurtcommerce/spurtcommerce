/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Component, Input, Output, EventEmitter, OnChanges, OnInit, OnDestroy, DoCheck} from '@angular/core';
import {ListsSandbox} from '../../../../core/lists/lists.sandbox';
import {Subscription} from 'rxjs';
import {CommonService} from '../../../../core/common/common.service';


@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnChanges, OnInit, OnDestroy {
    // decorator
    @Input() categories;
    @Input() categoryId;
    @Input() changeCategories;
    @Input() isClicked = [];
    @Output() change: EventEmitter<any> = new EventEmitter();
    // categories
    mainCategories;
    public subCategory = [];
    // categories selected
    public activecategory: any;
    public currentCategory: any;
    // subscriptions
    private subscriptions: Array<Subscription> = [];
    @Input() categoryParentId;
    constructor(public listSandBox: ListsSandbox, private commonService: CommonService) {
    }

    ngOnChanges() {
        this.currentCategory = this.categoryId;
        this.isClicked = [];
        this.isClicked[this.categoryId] = true;
        // this.listSandBox.getActiveCategory(this.currentCategory);
    }
    // initially calls subscribe method
    ngOnInit() {
        this.subCategory = this.categories;
    }
    // emit the category id
    public changeCategory(id, activeId, name) {
        this.isClicked = [];
        if (id ===  +this.currentCategory) {
            this.activecategory = '';
            this.listSandBox.removeActiveCategory();
            this.change.emit('');

        } else {
            this.isClicked[id] = true;
            this.currentCategory = id;
            this.activecategory = activeId;
            this.change.emit(id);
        }
    }
    // OnDestroy Unsubscribe the old subscribed values
    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }
}

