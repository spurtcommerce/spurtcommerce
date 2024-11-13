// Angular imports
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Third Party imports
import { ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { TranslateService } from '@ngx-translate/core';

// Sandbox 
import { DashboardSandbox } from '../../../../core/dashboard/dashboard.sandbox';
import { OrderSandbox } from '../../../../core/order/order.sandbox';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { CommonSandbox } from '../../../../../../src/app/core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from '../../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';
import { CommonService } from '../../../../../../src/app/core/common/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  // currency symbol
  public currency = JSON.parse(localStorage.getItem('adminCurrency'));

  // Date 
  public todayDate = new Date();
  public duration = 1;
  public orderDuration = 1;
  public vendorDetails: any;

  // Check box 
  datasets: any;
  checkedItems: boolean[];
  checkedStates: boolean[];

  sellerEmail: any = JSON.parse(localStorage.getItem('vendor-settings'))?.storeEmail;
  // Sessiong Storage 
  public userDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
  public currencyCode = this.userDetails?.currencyCode;
  public sellerdetails: any;
  public vendorSetting: any;

  // legend check 
  legend: any = { display: true, fullWidth: false };
  data = {
    labels: [],
    datasets: [{
      label: 'My First Dataset',
      data: [],
      backgroundColor: [],

    }]
  };

  constructor(
    public dashboardSandbox: DashboardSandbox,
    public paymentSandbox: PaymentSandbox,
    public orderSandbox: OrderSandbox,
    public titleService: Title,
    private translate: TranslateService,
    public commonSandbox: CommonSandbox,
    public router: Router,
    public approvalService: ApprovalFlagService,
    public changeRef: ChangeDetectorRef,
    private CommonService: CommonService

  ) {
    this.sellerdetails = JSON.parse(localStorage.getItem('vendorUser'))
  }

  //Pie chart configurations
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'left',

        labels: {

          boxWidth: 8,
          font: {
            size: 10,
          },
          padding: 10
        },
        align: 'center',
        maxHeight: 300,
        maxWidth: 500,
        textDirection: 'rtl'

      },
      datalabels: {
        display: true,
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}: ${value}`;
        },
        color: '#fff',
        font: {
          weight: 'bold'
        },
        backgroundColor: (context) => {
          return context.dataset.backgroundColor[context.dataIndex];
        },
        padding: 6
      },
      tooltip: {
        enabled: true,
        backgroundColor: '',
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        titleColor: '#fff',
        bodyFont: {
          size: 14
        },
        bodyColor: '#fff',
        footerFont: {
          size: 12
        },
        footerColor: '#fff',

        caretSize: 6,
        cornerRadius: 6,
        displayColors: false
      }

    },

    elements: {
      arc: {
        borderWidth: 1,
        borderColor: '#fff'
      }
    }
  };
  //Pie chart label configurations

  public pieChartLabels: any[] = [];
  public pieChartData: any[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  subscription: any
  public pieChartColors = [
    {
      backgroundColor: []
    }
  ];

  ngOnInit() {
    this.titleService.setTitle('Dashboard');
    this.getVendorProfile();

    this.CommonService.doGetSettings({}).subscribe((val) => {
      if (val && val.status == 1) {
        this.vendorSetting = val.data[0]
        this.changeRef.detectChanges();
      }
    })
  }


  apicall() {
    // this.dashboardSandbox.getItemPerPageCount();
    this.getDashboardCount();
    this.getOrdersList();
    this.getRecentPaymentList();
    this.getTopSellingProducts();
    this.getOrders();
  }

  // get chart duration event
  getChartDuration(val) {
    this.orderDuration = Number(val);
    this.getOrders();
  }

  //Upload Document
  uploaddocument() {
    this.router.navigate(['/my-account/myshop']);
  }
  // get product duration event
  getDuration(val) {
    this.duration = Number(val);
    this.getTopSellingProducts();
  }

  // Chart Color 
  chartColor(checked, i) {
    this.checkedStates[i] = !this.checkedStates[i];

    this.data.datasets[0].data[i] = checked ? 0 : this.datasets[i]
    this.data = { ...this.data };
  }
  // get chart event for orders
  getOrders() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    const params: any = {};
    params.duration = this.orderDuration;
    this.dashboardSandbox.getLanguageList(params);
    this.subscriptions.add(this.dashboardSandbox.getLanguageList$.subscribe(datavalue => {

      this.pieChartData = [];
      this.pieChartLabels = [];
      if (!['', null, undefined].includes(datavalue)) {
        let c = [];
        let labels = [];
        let colors = [];
        datavalue?.value?.forEach(datas => {
          c.push(Number(datas.orderCount))
          labels.push(datas.name);
          colors.push(datas.colorCode)
        });
        this.data.datasets.map(val => {
          val.data = c;
          val.backgroundColor = colors
        })
        this.data.labels = labels
      }
      this.datasets = structuredClone(this.data.datasets[0].data);
      this.checkedStates = this.data.datasets[0].backgroundColor.map(() => false);


    }));
  }


  // get Vendor Profile
  private getVendorProfile() {
    this.CommonService.profileAPi({}).subscribe((val) => {
      if (val && val?.status == 1) {
        this.vendorDetails = val?.data;
        this.changeRef.detectChanges();

        if (val?.data?.approvalFlag == 1) {
          this.apicall();
        }
      }
    })
  }

  // get all dashboard counts
  private getDashboardCount() {
    const params: any = {};
    this.dashboardSandbox.getDashboardCounts(params);
  }

  // get recent orders list
  private getOrdersList() {
    const params: any = {};
    params.limit = 4;
    params.offset = 0;
    this.dashboardSandbox.getOrderList(params);
  }

  // get recent sales list
  private getRecentPaymentList() {
    const params: any = {};
    params.limit = 4;
    params.offset = 0;
    this.paymentSandbox.getPaymentList(params);
  }

  // get top selling product list
  getTopSellingProducts() {
    const params: any = {};
    params.duration = this.duration;
    this.dashboardSandbox.getTopSellingProductsList(params);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
