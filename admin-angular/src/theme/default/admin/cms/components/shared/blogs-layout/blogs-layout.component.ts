/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
    Component, OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import {  BlogSandbox } from '../../../../../../../core/admin/cms/blogs/blog.sandbox';

@Component({
    selector: 'app-blogs-layout',
    templateUrl: './blogs-layout.component.html',
    styleUrls: ['./blogs-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsLayoutComponent implements OnInit {

constructor(public blogsSandbox: BlogSandbox) {}

ngOnInit() {
    this.getPagesListHeaderCount();
}
getPagesListHeaderCount () {
        this.blogsSandbox.getBlogCount({count: 1});
        this.blogsSandbox.getBlogCounts();
 }
}
