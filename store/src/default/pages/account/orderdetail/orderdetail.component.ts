import { FormControl } from '@angular/forms';
/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Observer } from 'rxjs';
// invoice pdf
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.scss'],
  providers: [DatePipe]
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  // document
  private pdf: any;
  private docDefinition: any = {};
  private invoiceDetail: any;
  private invoice: any;
  // orders
  private orderId: string;
  private dynamicBody: any = {};
  public productList: any = [];
  public productId: any = [];
  // review form
  public reviewForm: FormGroup;
  public isShowReview = false;
  public textValue: FormControl;
  productIdArray: any = [];
  public showId: number;
  // subscriptions
  private subscriptions: Array<Subscription> = [];
  currentRate = '';
  public ProdIdArray: any = [];
  public is_edit: boolean;
  public prodReview: any = [];
  public reviewRating: any = [];
  public isReview = [];
  captureDataUrl: any;
  postImage: any;
  constructor(
    public accountSandbox: AccountSandbox,
    public listSandbox: ListsSandbox,
    private route: ActivatedRoute,
    public datePipe: DatePipe,
    public fb: FormBuilder
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.regSubscribeEvents();
    this.is_edit = true;
  }

  // Initially calls accountSandbox getOrderDetail if route got subscribed
  ngOnInit() {
    this.loadForm();
    this.captureDataUrl = 'assets/images/storelogo.png';
    this.convertBase64(this.captureDataUrl).subscribe(base64data => {
      // this is the image as dataUrl
      this.postImage = 'data:image/jpg;base64,' + base64data;
    }); // subscribe and get the id from the router
  }

  convertBase64(inputValue: any) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = inputValue;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
  /** subscribe values from the sandbox. whenever the value changes this subscription will trigger **/
  regSubscribeEvents() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.accountSandbox.getOrderDetail({ orderId: this.orderId });
    });
    this.subscriptions.push(
      this.accountSandbox.orderHistoryDetail$.subscribe(data => {
        if (data) {
          this.productList = data.productList;
          if (data.productList && data.productList[0]) {
            data.productList.forEach((productinfo, index) => {
              this.reviewRating.push(productinfo.rating);
              this.productId[productinfo.productId] = productinfo.productId;
            });
          }
        }
      })
    );
    this.subscriptions.push(
      this.listSandbox.settingDetail$.subscribe(setting => {
        if (setting && setting.settingsId) {
          this.invoice = setting;
        }
      })
    );
  }


  //  // build a form for info  by gouping the form control
  public loadForm() {
    this.reviewForm = this.fb.group({
      textValue: [''],
      rating: ['']
    });
  }

  /**
   * download invoice for order
   *
   * @param dynamicBody creating dynamic body for the invoic detail
   */
  downloadInvoiceDetail(details) {
    this.invoiceDetail = details;
    this.dynamicBody.widths = ['10%', '50%', '20%', '20%'];
    const item1 = this.invoiceDetail.productList.map((item, index) => {
      const tempTotal = item.total.split('.');
      return [
        index + 1,
        item.name,
        item.quantity,
        '$ ' + item.total
      ];
    });
    this.dynamicBody.body = [
      [
        { alignment: 'center', text: 'S.no', style: 'th' },
        { alignment: 'center', text: 'Products', style: 'th' },
        { alignment: 'center', text: 'Qty', style: 'th' },
        { alignment: 'center', text: 'Total Amount', style: 'th' }
      ]
    ].concat(item1);
    this.generatePdf();
  }

  // generate pdf dynamically
  generatePdf() {
    this.docDefinition = {
      content: [
        {
          margin: [0, 0, 0, 0],

          columns: [
            {
              margin: [0, 30, 0, 0],
              width: '60%',
              stack: [
                {
                  width: 180,
                  height: 60,
                  image: this.postImage
                }
              ]
            },
            {
              alignment: 'left',
              width: '40%',
              stack: [
                { style: 'h1', text: 'INVOICE' },
                { style: 'h2', text: '' },
                { style: 'h2', text: this.invoice.storeAddress },
                { style: 'h2', text: this.invoice.storeTelephone },
                { style: 'h2', text: this.invoice.storeEmail }
              ]
            }
          ]
        },
        '\n', // optional space between columns

        {
          canvas: [
            {
              color: '#D3D3D3',
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 595 - 2 * 40,
              y2: 5,
              lineWidth: 0.5
            }
          ]
        },
        '\n',
        {
          columns: [
            {
              width: '25%',
              stack: [
                { style: 'shipping', text: 'Shipping address' },
                { style: 'h2', text: '' },
                { style: 'h2', text: this.invoiceDetail.shippingCompany },
                { style: 'h2', text: this.invoiceDetail.shippingAddress1 },
                { style: 'h2', text: this.invoiceDetail.shippingAddress2 },
                { style: 'h2', text: this.invoiceDetail.shippingCity },
                { style: 'h2', text: this.invoiceDetail.shippingZone },
                { style: 'h2', text: this.invoiceDetail.telephone }
              ]
            },
            {
              width: '25%',
              stack: [
                { style: 'billing', text: 'Billing address' },
                { style: 'h2', text: '' },
                { style: 'h2', text: this.invoiceDetail.shippingCompany },
                { style: 'h2', text: this.invoiceDetail.shippingAddress1 },
                { style: 'h2', text: this.invoiceDetail.shippingAddress2 },
                { style: 'h2', text: this.invoiceDetail.shippingCity },
                { style: 'h2', text: this.invoiceDetail.shippingZone },
                { style: 'h2', text: this.invoiceDetail.telephone }
              ]
            },
            {
              width: '20%',
              margin: [40, 0, 0, 0],
              stack: [
                { style: 'detail', text: 'Invoice ID' },
                { style: 'h2', text: '' },
                { style: 'h2', text: 'Issue Date' },
                { style: 'h2', text: '' }
              ]
            },
            {
              width: '20%',
              stack: [
                { style: 'invoice_d', text: this.invoiceDetail.invoiceNo },
                { style: 'h2', text: '' },
                {
                  style: 'invoice',
                  text: this.datePipe.transform(
                    this.invoiceDetail.createdDate,
                    'dd/MM/yyyy'
                  )
                },
                { style: 'h2', text: '' }
              ]
            }
          ]
        },
        '\n',
        {
          canvas: [
            {
              color: '#D3D3D3',
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 595 - 2 * 40,
              y2: 5,
              lineWidth: 0.5
            }
          ]
        },
        '\n',
        {
          text: 'Order Details',
          style: 'order'
        },
        '\n',
        {
          alignment: 'center',
          table: this.dynamicBody
        },
        '\n',
        {
          columns: [
            {
              width: '80%',
              alignment: 'right',
              stack: [{ style: 'h2', text: 'Total Amount' }]
            },
            {
              width: '13%',
              alignment: 'right',
              stack: [
                {
                  style: 'h2',
                  text: '$ ' + this.invoiceDetail.total
                }
              ]
            }
          ]
        }
      ],
      footer: [
        {
          margin: [0, 0, 0, 10],
          table: {
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: ' ',
                  style: 'note'
                }
              ],
              [
                {
                  border: [false, false, false, false],
                  text: '',
                  style: 'content',
                  margin: [0, 0, 0, 0]
                }
              ]
            ]
          }
        }
      ],
      styles: {
        h1: { margin: [0, 10, 0, 0], fontSize: 16, bold: true },
        detail: { margin: [0, 10, 0, 0], fontSize: 12, bold: false },
        shipping: { margin: [0, 10, 0, 0], fontSize: 12, bold: true },
        billing: { margin: [0, 10, 0, 0], fontSize: 12, bold: true },
        h2: { margin: [0, 5, 0, 0], fontSize: 12, bold: false },
        invoice: { margin: [0, 5, 0, 0], fontSize: 12, bold: true },
        invoice_d: { margin: [0, 10, 0, 0], fontSize: 12, bold: true },
        order: { margin: [0, 0, 0, 0], fontSize: 12, bold: true },
        total: { margin: [0, 5, 0, 0], fontSize: 10, bold: true },
        note: { margin: [0, 0, 0, 0], bold: true },
        content: { margin: [0, 0, 0, 0], bold: false, fontSize: 10 },
        th: { margin: [0, 10, 0, 0], bold: false, fontSize: 10 },
        td: { margin: [0, 10, 0, 0], bold: false, fontSize: 10 }
      }
    };

    this.pdf = pdfMake;
    this.pdf.createPdf(this.docDefinition).download('invoice');
  }

  // destroy the subscribed events while page destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
    this.accountSandbox.clearDetail();
  }
}
