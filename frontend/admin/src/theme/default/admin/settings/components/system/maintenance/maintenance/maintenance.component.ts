//angular common
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'node_modules/rxjs/dist/types';
import { Title } from '@angular/platform-browser';

//Sandbox
import { GeneralSettingSandbox } from '../../../../../../../../core/admin/settings/generalsetting/generalsetting.sandbox';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  //Site Id
  public siteId: Number;
  public mode: any = '';

  //Subscriptions
  private subscriptions: Array<Subscription> = [];

  constructor(public sandbox: GeneralSettingSandbox, public changeDetect: ChangeDetectorRef,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | System');
  }

  ngOnInit() {
    this.getGeneralSetting();
    this.subscribe();
  }
  submitMode():void {
    const params: any = {};
    params.mode = +this.mode;
    params.id = this.siteId;
    this.sandbox.maintenanceMode(params);
  }
  subscribe():void {
    this.subscriptions.push(this.sandbox.getGeneralSettings$.subscribe(data => {
      if (data && data[0]) {

        if (data[0].maintenanceMode === 1) {
          this.mode = '1';
          this.changeDetect.detectChanges();

        } else if (data[0].maintenanceMode === 0) {
          this.mode = '0';
          this.changeDetect.detectChanges();
        }
      }
    }));
  }

  getGeneralSetting():void {
    this.sandbox.getGeneralSetting();
    this.sandbox.getGeneralSettings$.subscribe(val => {
      if (val) {
        this.siteId = val[0].settingId;
      }

    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
