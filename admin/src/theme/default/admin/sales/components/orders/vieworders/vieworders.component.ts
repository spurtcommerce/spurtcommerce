/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OrdersSandbox } from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Observable, Observer } from 'rxjs';
import { CurrencySymbolPipe } from '../../../../shared/components/pipes/currency-symbol.pipe';

@Component({
  selector: 'app-sales-order-vieworders',
  templateUrl: 'vieworders.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ],
  providers: [DatePipe, CurrencySymbolPipe]
})
export class ViewOrdersComponent implements OnInit {
  public orderId: any;
  private closeResult: string;
  private invoiceDetail: any;
  private dynamicBody: any = {};
  private docDefinition: any = {};
  private pdf: any;
  private invoice: any;
  private imageUrl: string;
  public orderStatus: any;
  public orderDetails: any = [];
  public orderStatusId: number;
  public isDisabled: boolean;
  public symbolSettings: any;
  private captureDataUrl: any;
  private postImage: any;
  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private route: ActivatedRoute,
    public orderSandbox: OrdersSandbox,
    public layoutSandbox: LayoutSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public datePipe: DatePipe,
    private configService: ConfigService,
    private pipe: CurrencySymbolPipe,

  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    this.imageUrl = this.configService.getImageUrl();
    this.isDisabled = false;
    this.getorderstatuslist();
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.subscribe();
    this.orderSandbox.getSettings();
    this.captureDataUrl = 'assets/img/storelogo.png';
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
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
  getorderstatuslist() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    this.orderStatusSandbox.getorderstatuslist(params);
  }

  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  subscribe() {
    this.route.params.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderdetails(param);
        this.orderSandbox.getvieworderData$.subscribe(value => {
          if (value && value.orderStatusId) {
            if (value.productList[0] && value.productList[0].orderOptions) {
              this.orderDetails = value.productList[0].orderOptions;
            }
            this.orderStatusId = value.orderStatusId;
            if (this.orderStatusId === 2) {
              this.isDisabled = true;
            }
          }
        });
      }
    });
  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
    this.orderSandbox.changeOrderStatus(params);
  }

  /**
   * download invoice for order
   *
   * @param dynamicBody creating dynamic body for the invoic detail
   */
  // downloadInvoiceDetail(details, setting) {
  //   this.invoice = setting;
  //   this.invoiceDetail = details;
  //   this.dynamicBody.widths = ['10%', '50%', '20%', '20%'];
  //   const item1 = this.invoiceDetail.productList.map((item, index) => {
  //     const splitTotal = item.total.split('.');
  //     return [
  //       index + 1,
  //       item.name,
  //       item.quantity,
  //       '$' + item.total
  //     ];
  //   });
  //   this.dynamicBody.body = [
  //     [
  //       { alignment: 'center', text: 'S.no', style: 'th' },
  //       { alignment: 'center', text: 'Products', style: 'th' },
  //       { alignment: 'center', text: 'Quantity', style: 'th' },
  //       { alignment: 'center', text: 'Total Amount', style: 'th' }
  //     ]
  //   ].concat(item1);
  //   this.generatePdf();
  // }

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
                { style: 'detail', text: 'Invoice No' },
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
                  text:
                    '$' + parseInt(this.invoiceDetail.total, 10).toFixed(2)
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
                  text: '',
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

   /**
   * download invoice for order
   *
   * @param dynamicBody creating dynamic body for the invoic detail
   */
  downloadInvoiceDetail(details, setting) {
    this.symbolSettings = details.currencySymbolLeft ? {position: 'left', symbol: details.currencySymbolLeft} : details.currencySymbolRight ? {position: 'right', symbol: details.currencySymbolRight } : null;
    this.invoice = setting;
    this.invoiceDetail = details;
    this.dynamicBody.widths = ['10%', '50%', '20%', '20%'];
    const item1 = this.invoiceDetail.productList.map((item, index) => {
      const splitTotal = item.total.split('.');
      return [
        index + 1,
        item.name,
        item.quantity,
        this.pipe.transform(item.total, this.symbolSettings)
      ];
    });
    this.dynamicBody.body = [
      [
        { alignment: 'center', text: 'S.no', style: 'th' },
        { alignment: 'center', text: 'Products', style: 'th' },
        { alignment: 'center', text: 'Quantity', style: 'th' },
        { alignment: 'center', text: 'Total Amount', style: 'th' }
      ]
    ].concat(item1);
    this.generatePdf();
  }
}
