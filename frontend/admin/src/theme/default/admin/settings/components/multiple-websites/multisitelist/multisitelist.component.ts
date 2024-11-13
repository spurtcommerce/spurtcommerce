import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MultipleWebsitesSandbox } from "src/core/admin/settings/multiple-websites/multiple-websites.sandbox";
@Component({
  selector: "app-multisitelist",
  host: {
    class: "multi-web",
  },
  templateUrl: "./multisitelist.component.html",
  styleUrls: ["./multisitelist.component.scss"],
})
export class MultisitelistComponent implements OnInit {
  storeDetails = {};

  constructor(public multipleWebsitesSandbox: MultipleWebsitesSandbox, private router: Router,public titleService: Title,
  ){
    this.titleService.setTitle('Settings | Store Settings');
   }

  ngOnInit(): void {
    this.getmultipleWebsitesList();
  }

  getmultipleWebsitesList() {
    const params: any = {};
    this.multipleWebsitesSandbox.GetMultipleWebsitesList(params);
  }
  create() {
    this.router.navigate(['/settings/multiple-websites/create'], { queryParams: this.storeDetails });
  }
  setting(list) {
    this.router.navigate(['/settings/multiple-websites/create', list.id])

  }

  convertLink(link): any {


    if (!/^https?:\/\//i.test(link)) {
      link = 'http://' + link;
      return link
    }else{
      return link
    }

  }
}
