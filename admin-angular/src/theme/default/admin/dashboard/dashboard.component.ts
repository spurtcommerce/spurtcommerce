/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { DashboardSandbox } from '../../../../core/admin/dashboard/dashboard.sandbox';
import { ConfigService } from '../../../../core/admin/service/config.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LayoutSandbox } from '../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public line: any[];
  public view: any[] = [300, 300];
  public imageURL = this.configService.getImageUrl();
  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public topSellingImage = {};
  public recentSellingImage = {};

  public colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F'],
  };

  public productUrl: string;
  public topProducts: any = "4";
  public averagevalue: any = "4";
  public newcustomerscount: any = "4";
  public totalorderscount: any = "4";
  public totalRevenues: any = "4";
  public averageConvertionRatios: any = "4";
  public customersVisitmonth: any = "3";
  public customersVisityear: any = "2020";
  public year: any = [];
  public month: any;
  public customervisits: any;
  public transactionslist: any;
  public transactionlistyear: any = "2021";
  public top10weeklyproduct: any;
  public top10weeklyproductlist: any = [];
  public top10weeklyproductdatalist: any;
  /*plottlyyy customer visits*/

  public xvalue = []
  public yvalue = []
  title = 'demo';
  trace1: any;
  data: any;
  layout: any;
  res: any;
  config: any;


  /*plottlyyy transaction lists*/
  public xvalue1 = []
  public yvalue1: any = ['Jan', 'Feb', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  title1 = 'demo';
  trace11: any;
  data1: any;
  layout1: any;
  res1: any;
  config1: any;

  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';
  /*Sales graph*/
  salesgraphyear: any = 2021;
  salesgraphmonth: any = "8";
  salesconfig: any;
  salesdata: any;
  saleslayout: any;
  salestrace: any;
  public salesxvalue = []
  public salesyvalue = []
  public salesgraphdata: any;
  resultValue: any = [];
  public toptenweeklysalesdata: any = [];
  public top10weeklycheckeddata: any = [];
  /* Radar */
  public demoradarChartLabels: string[] = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
  ];

  public demoradarChartData: any = [
    { data: [46, 46, 46, 46, 46, 46], label: 'Company A' },
    { data: [48, 48, 48, 48, 48, 48], label: 'Company B' },
    { data: [52, 52, 52, 52, 52, 52], label: 'Company c' },
    { data: [30, 30, 30, 30, 30, 30], label: 'Company D' },
    { data: [30, 30, 30, 30, 30, 30], label: 'Company E' },
  ];
  public radarChartType: string = 'radar';
  public optionsradar: any = {
    responsive: false,
    maintainAspectRatio: false,
    legend: {
      position: 'left',
      responsive: true,
      maintainAspectRatio: true,
      labels: {
        boxWidth: 15
      }
    },
    scale: {
      pointLabels: {
          // fontSize: 14,
          fontStyle: "bold",
      }
  }
  }
  currentDate:any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public dashboardSandbox: DashboardSandbox,
    private router: Router,
    private configService: ConfigService,
    public titleService: Title,
    public layoutSandbox: LayoutSandbox,
    public toastr: ToastrManager
  ) {

    this.currentDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()

  };
  this.salesgraphyear=this.currentDate.year.toString();
  this.customersVisityear=this.currentDate.year.toString();
  this.transactionlistyear=this.currentDate.year.toString();
  this.salesgraphmonth=this.currentDate.month.toString();
  this.customersVisitmonth=this.currentDate.month.toString();

    for (let i = 2010; i <= this.currentDate.year; i++) {
      this.year.push({ "name": i.toString(), "Values": i.toString() });
    }

    this.month = [
      {
        "name": "Jan",
        "Values": "1"
      },
      {
        "name": "Feb",
        "Values": "2"
      },
      {
        "name": "Mar",
        "Values": "3"
      },
      {
        "name": "Apr",
        "Values": "4"
      }, {
        "name": "May",
        "Values": "5"
      },
      {
        "name": "June",
        "Values": "6"
      }, {
        "name": "July",
        "Values": "7"
      },
      {
        "name": "Aug",
        "Values": "8"
      }, {
        "name": "Sep",
        "Values": "9"
      },
      {
        "name": "Oct",
        "Values": "10"
      }, {
        "name": "Nov",
        "Values": "11"
      },
      {
        "name": "Dec",
        "Values": "12"
      },
    ]



  }

  ngOnInit() {
    this.dashboardSandbox.getDashboardCount();
    this.titleService.setTitle('Dashboard');
    this.dashboardSandbox.getRecentVisitorList();
    this.dashboardSandbox.getRecentSellingProductList();
    this.dashboardSandbox.getItemPerPageCount();
    this.productUrl = environment.productUrl;
    this.averageOrderValue();
    this.getTopSellingProductList();
    this.totalRevenue();
    this.totalOrders();
    this.newCustomers();
    this.averageConversionRatio();
    this.getSalesOrderList();
    this.transactionValues();
    // this.sellerList();
    this.salesgraph();
    this.toptenweeklyproducts();
  }



  // View Product
  viewProduct(id) {
    window.open(this.productUrl + 'products/productdetails/' + id);
  }

  // View Order Details
  viewOrder(orderId) {
    this.router.navigate(['/sales/orders/vieworder', orderId]);
  }

  topSellingImageLoading(id) {
    this.topSellingImage[id] = true;
  }

  recentSellingImageLoading(id) {
    this.recentSellingImage[id] = true;
  }

  /* Average order value */

  averageOrderValue() {
    let params: any = {};
    params.limit = 10;
    params.offset = 0;
    params.count = 0;
    params.duration = this.averagevalue;
    this.dashboardSandbox.averageOrderValue(params);
  }

  /* Top Selling Product */

  getTopSellingProductList() {
    let params: any = {};
    params.limit = 10;
    params.offset = 0;
    params.count = 0;
    params.duration = this.topProducts;
    this.dashboardSandbox.getTopSellingProductList(params);
    this.subscriptions.push(this.dashboardSandbox.topSellingProducts$.subscribe(data => {
      if (data && data.length > 0) {
        if (this.topProducts == 2) {
        }
      }
    }));
    params.count = true;
    this.dashboardSandbox.getTopSellingProductListCount(params);
  }


  /*Total Revenue*/

  totalRevenue() {
    let params: any = {};
    params.duration = this.totalRevenues;
    this.dashboardSandbox.totalRevenue(params);
  }

  /*Total Orders*/

  totalOrders() {
    let params: any = {};
    params.duration = this.totalorderscount;
    this.dashboardSandbox.totalOrders(params);
  }

  /*New Customers*/

  newCustomers() {
    let params: any = {};
    params.duration = this.newcustomerscount;
    this.dashboardSandbox.newCustomers(params);
  }

  /*averageConversionRatio*/

  averageConversionRatio() {
    let params: any = {};
    params.duration = this.averageConvertionRatios;
    this.dashboardSandbox.averageConversionRatio(params);
  }


  getSalesOrderList() {
    this.xvalue = [];
    this.yvalue = [];
    this.data = [];

    let params: any = {};
    params.month = this.customersVisitmonth;
    params.year = this.customersVisityear;
    this.dashboardSandbox.getSalesOrderList(params);

    this.subscriptions.push(this.dashboardSandbox.salesOrderList$.subscribe(data => {
      if (data && (this.xvalue.length === 0 && this.yvalue.length === 0)) {
        this.customervisits = data;
        this.customervisits.forEach(element => {
          this.xvalue.push(element.dayOfMonth)
          this.yvalue.push(JSON.parse(element.visitCount))

        });
      }


    }));
    this.trace1 = {
      type: 'bar',
      x: this.xvalue,
      y: this.yvalue,
      marker: {
        color: 'blue',
      },
    };
    this.data = [this.trace1
    ];


    this.layout = {
      height: 300,
      autosize: true,
      xaxis: {
        title: 'Days',
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: true,
        showticklabels: true,
      },
      yaxis: {
        title: 'Customer Visits',
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: true,
      },
      annotations: [{
        xref: 'x1',
        yref: 'y1',
        x: [1, 2, 3, 4],
        y: [1, 2, 3, 4],
        text: '',
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(50, 171, 96)'
        }
      }],
      showticklabels: false,
      margin: {
        l: 40,
        r: 20,
        b: 40,
        t: 20,
        pad: 4
      },

    };
    this.config = { responsive: true, displayModeBar: false }

  }


  /* TRANSACTION VALUE*/

  transactionValues() {
    this.xvalue1 = [];
    function monthName(mon) {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
    }
    this.layout1 = {}
    this.data1 = [];
    this.yvalue1 = [];
    let params: any = {};
    params.year = this.transactionlistyear;
    this.dashboardSandbox.transactionValues(params);
    this.resultValue = [];
    this.subscriptions.push(this.dashboardSandbox.transactionValues$.subscribe(data => {
      if (data && (this.xvalue1.length === 0)) {
        this.transactionslist = data;
        this.transactionslist.forEach(element => {
          if (element) {
            this.xvalue1.push(JSON.parse(element.ordercount))
            this.yvalue1.push(monthName(element.month));
            this.resultValue.push(element.ordercount + ',' + ' ' + '$' + ' ' + element.orderAmount)
          }

        });
        this.layout1 = {
          height: 300,
          autosize: true,
          xaxis: {

            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: false,
            fixedrange:true
          },
          yaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
            showticklabels: true,
            fixedrange:true
          },
          barmode: 'stack',
          annotations: [{
            xref: 'paper',
            yref: 'paper',
            x: this.xvalue1,
            y: [''],
            text: '',
            font: {
              family: 'Arial',
              size: 12,
              color: 'blue'
            }
          }],

          margin: {
            l: 90,
            r: 60,
            b: 40,
            t: 10,
            pad: 10
          },
          bargap: 0.83,
        };
        this.layout1.annotations = [];
        this.config1 = { responsive: true, displayModeBar: false }
        this.xvalue1.forEach((data, i) => {

          let result: any = {}
          result = {
            xref: 'x1',
            yref: 'y1',
            x: this.xvalue1[i],
            y: i,
            text: Array(30).fill('\xa0').join('') + this.resultValue[i],
            font: {
              family: 'Arial',
              size: 12,
              color: 'black'
            },
            showarrow: false,
          };
          this.layout1.annotations.push(result);
        })
      }
    }))

    this.trace11 = {
      type: 'bar',
      x: this.xvalue1.reverse(),
      y: this.yvalue1.reverse(),
      orientation: 'h',

      text: this.yvalue1.map(String),

      constrainoutsidetext: true,
      textposition: 'top center',
      insidetextanchor: "start",

      mode: 'markers+text',

      marker: {
        color: '#14BAE1',


      },
    };

    this.data1 = [this.trace11];
  }

  /*Sales graph*/

  salesgraph() {
    this.salesxvalue = [];
    this.saleslayout = {}
    this.salesyvalue = [];
    this.salesdata = [];
    let params: any = {};
    params.year = this.salesgraphyear;
    params.month = this.salesgraphmonth;
    this.dashboardSandbox.salesgraph(params);
    this.subscriptions.push(this.dashboardSandbox.salesgraph$.subscribe(datas => {
      if (datas && (this.salesxvalue.length === 0 && this.salesyvalue.length === 0)) {
        this.salesgraphdata = datas
        this.salesgraphdata.forEach(element => {
          this.salesxvalue.push(element.dayOfMonth)
          this.salesyvalue.push(JSON.parse(element.productCount))

        });
      }

    }))
    this.salestrace = {
      type: 'scatter',
      x: this.salesxvalue,
      y: this.salesyvalue,
      mode: 'lines',
      marker: {
        color: '#FDA677',
      },
    };


    this.salesdata = [this.salestrace];
    this.saleslayout = {
      height: 300,
      xaxis: {
        title: 'Products Sold',
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: true,
        showticklabels: true,
      },
      yaxis: {
        title: 'Days',
        autorange: true,
        showgrid: false,
        zeroline: false,
        showline: true,
      },
      annotations: [{
        xref: 'x1',
        yref: 'y1',
        x: [1, 2, 3, 4],
        y: [1, 2, 3, 4],
        text: '',
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(50, 171, 96)'
        }
      }],
      showticklabels: false,
      margin: {
        l: 40,
        r: 20,
        b: 40,
        t: 20,
        pad: 4
      },

    };
    this.salesconfig = { responsive: true, displayModeBar: false }


  }

  /*weekly sales product*/

  toptenweeklyproducts() {
    let params: any = {};
    params.limit = 10;
    params.offset = 0;
    params.count = 0;
    params.duration = 2;
    this.dashboardSandbox.toptenweeklyproducts(params);
    this.subscriptions.push(this.dashboardSandbox.toptenweeklyproducts$.subscribe(data => {
      if (data && data.length > 0) {
        let c = data.map(datas => {
          const opts = { ...datas, checked: false };
          return opts;
        })
        this.top10weeklyproductlist = c;

        this.top10weeklyproductlist.forEach((element, i) => {
          if (i < 3) {
            element.checked = true;
          }

        });

        this.top10weeklyproductdatalist = this.top10weeklyproductlist.filter(item => item.checked)
        this.top10weeklycheckeddata = this.top10weeklyproductdatalist.filter(item => item.productId);
        this.weeklysalesproduct();
      }
    }))

  }

  checkboxweekly(event, item) {
    if (event.target.checked == true) {
      if (this.top10weeklyproductdatalist.length > 2) {
        this.toastr.errorToastr('Please select only three items');
        this.top10weeklyproductlist.forEach((data) => {
          if (data.id == item.id) {
            item.checked = false;
          }
        });
        return (event.target.checked = false);
      } else {
        this.top10weeklyproductdatalist = this.top10weeklyproductlist.filter((item) => {
          if (item.checked === true) {
            return item;
          }
        });
      }
    } else if (event.target.checked == false) {
      this.top10weeklyproductdatalist.forEach((data, index) => {
        if (data.id == item.id) {
          this.top10weeklyproductdatalist.splice(index, 1);
        }
      });
    }
    this.weeklysalesproduct();
  }
  weeklysalesproduct() {
    let params: any = {};
    this.top10weeklyproductdatalist = this.top10weeklyproductlist.filter(item => item.checked)
    this.top10weeklycheckeddata = this.top10weeklyproductdatalist.map(a => a.productId);
    params.productId = this.top10weeklycheckeddata;
    this.dashboardSandbox.weeklysalesproduct(params);
    this.subscriptions.push(this.dashboardSandbox.weeklysalesproduct$.subscribe(data => {
      if (data) {
        this.toptenweeklysalesdata = data.map((day, index) => {
          let dayobject: any = {};
          dayobject.label = day.productName;
          dayobject.data = {};
          dayobject.data = day.value.map((d) => d.value);
          return dayobject;
        });
      }
    }))
  }


  public ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
