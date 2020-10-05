/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { DatePipe } from '@angular/common';
import { Subscription, Observable, Observer } from 'rxjs';
// invoice pdfmake
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [DatePipe]
})
export class OrdersComponent implements OnInit, OnDestroy {
  // variable declaration
  public isRecipt: number;
  private invoiceDetail: any;
  private invoice: any;
  private pdf: any;
  private dynamicArray: any = {};
  private docDefinition: any = {};
  private subscriptions: Array<Subscription> = [];
  public pageSize = 5;
  public index = 0;
  private captureDataUrl: any;
  private postImage: any;
  constructor(
    public accountSandbox: AccountSandbox,
    public listSandbox: ListsSandbox,
    public datePipe: DatePipe
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.regSubscribeEvents();
  }

  // Initially calls getOrderHistoryList with 0 offset.
  ngOnInit() {
    this.getOrderHistoryList(0);
    this.captureDataUrl = 'assets/images/storelogo.png';
    this.convertBase64(this.captureDataUrl).subscribe(base64data => {
      this.postImage = 'data:image/jpg;base64,' + base64data;
    });
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
  // fetch order history from sandbox
  public getOrderHistoryList(offset) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    this.accountSandbox.getOrderHistory(params);
    params.limit = '';
    params.offset = 0;
    params.count = 1;
    this.accountSandbox.getOrderHistoryCount(params);
  }

  // calls getOrderHistoryList function for pagination.event from material paginator.
  public onPageChange(event) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    const offset = event.pageIndex * event.pageSize;
    this.getOrderHistoryList(offset);
  }

  // calls accountSandbox getOrderDetail for order details
  // public downloadInvoice(orderid, order) {
  //   this.accountSandbox.getOrderDetail({ orderId: orderid });
  // }

  // subscribe values from the sandbox. whenever the value changes this subscription will trigger

  regSubscribeEvents() {
    this.subscriptions.push(
      this.listSandbox.settingDetail$.subscribe(setting => {
        if (setting && setting.settingsId) {
          this.invoice = setting;
        }
      })
    );
    this.subscriptions.push(
      this.accountSandbox.orderHistoryDetail$.subscribe(detail => {
        if (detail && detail.orderId) {
          // if setting detail and history detail loaded, generate dynamic invoice pdf
          if (this.invoice) {
            this.invoiceDetail = detail;
            this.dynamicArray.widths = ['10%', '50%', '20%', '20%'];
            const item1 = this.invoiceDetail.productList.map((item, index) => {
              const splitTotal = item.total.split('.');
              return [
                index + 1,
                item.name,
                item.quantity,
                '$ ' + item.total
              ];
            });
            this.dynamicArray.body = [
              [
                { alignment: 'center', text: 'S.no', style: 'tr' },
                { alignment: 'center', text: 'Products', style: 'tr' },
                { alignment: 'center', text: 'Qty', style: 'tr' },
                { alignment: 'center', text: 'Total Amount', style: 'tr' }
              ]
            ].concat(item1);
            this.generatePdf();
          }
        }
      })
    );
  }

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
                }
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
          table: this.dynamicArray
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
        h1: {
          margin: [0, 10, 0, 0],
          fontSize: 16,
          bold: true
        },
        detail: {
          margin: [0, 10, 0, 0],
          fontSize: 12,
          bold: false
        },
        shipping: {
          margin: [0, 10, 0, 0],
          fontSize: 12,
          bold: true
        },
        billing: {
          margin: [0, 10, 0, 0],
          fontSize: 12,
          bold: true

        },
        h2: {
          margin: [0, 5, 0, 0],
          fontSize: 12,
          bold: false,
        },
        invoice: {
          margin: [0, 5, 0, 0],
          fontSize: 12,
          bold: true
        },
        invoice_d: {
          margin: [0, 10, 0, 0],
          fontSize: 12,
          bold: true
        },
        order: {
          margin: [0, 0, 0, 0],
          fontSize: 12,
          bold: true
        },
        total: {
          margin: [0, 5, 0, 0],
          fontSize: 10,
          bold: true
        },
        note: {
          margin: [0, 0, 0, 0],
          bold: true
        },
        content: {
          margin: [0, 0, 0, 0],
          bold: false,
          fontSize: 10
        },
        th: {
          margin: [0, 10, 0, 0],
          bold: false,
          fontSize: 10
        },
        td: {
          margin: [0, 10, 0, 0],
          bold: false,
          fontSize: 10
        }
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
