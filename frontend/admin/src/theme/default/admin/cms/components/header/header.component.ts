/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { promotionWidgetComponentRoutes } from 'add-ons/add-ons.constant';
import { questionAndAnswerComponentRoutes } from 'add-ons/add-ons.constant';
import { ratingAndReviewComponentRoutes } from 'add-ons/add-ons.constant';
import { ProductSeoRoutes } from 'add-ons/add-ons.constant';
import { CategorySeoRoutes } from 'add-ons/add-ons.constant';
import { PageSeoRoutes } from 'add-ons/add-ons.constant';
import { BlogSeoRoutes } from 'add-ons/add-ons.constant';
import { SiteSeoRoutes } from 'add-ons/add-ons.constant';
import { postsComponentRoutes } from 'add-ons/add-ons.constant';
import { categoriesComponentRoutes } from 'add-ons/add-ons.constant';

@Component({
  selector: 'app-cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CMSHeaderComponent implements OnInit {
  checked: boolean;
  bannerChecked: boolean;
  blogChecked: boolean;
  seoChecked: boolean;
  routerLinkCheck:any = {}

  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.checked = false;
    this.bannerChecked = false;
    this.blogChecked = false;
    this.seoChecked = false;
  } 

  constructor(public titleService: Title) {}

  ngOnInit() {
    this.routerLinkCheck.promotionWidget = promotionWidgetComponentRoutes
    this.routerLinkCheck.questionAndAnswer = questionAndAnswerComponentRoutes
    this.routerLinkCheck.ratingAndReview = ratingAndReviewComponentRoutes
    this.routerLinkCheck.productSeo = ProductSeoRoutes
    this.routerLinkCheck.categorySeo = CategorySeoRoutes
    this.routerLinkCheck.pageSeo = PageSeoRoutes
    this.routerLinkCheck.blogSeo = BlogSeoRoutes
    this.routerLinkCheck.siteSeo = SiteSeoRoutes
    this.routerLinkCheck.managePost = postsComponentRoutes
    this.routerLinkCheck.manageCategories = categoriesComponentRoutes
    this.titleService.setTitle('CMS');
  }
  onClick(e) {
    this.checked = true;
    this.bannerChecked = false;
    this.blogChecked = false;
    this.seoChecked = false;
  }
  onBannerClick(e) {
    this.bannerChecked = true;
    this.checked = false;
    this.blogChecked = false;
    this.seoChecked = false;
  }
  onBlogClick(e) {
    this.bannerChecked = false;
    this.checked = false;
    this.blogChecked = true;
    this.seoChecked = false;
  }

  onSeoClick(e) {
    this.bannerChecked = false;
    this.checked = false;
    this.blogChecked = false;
    this.seoChecked = true;
  }
}
