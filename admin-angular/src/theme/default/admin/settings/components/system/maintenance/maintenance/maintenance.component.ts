import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'node_modules/rxjs/dist/types';
import { GeneralSettingSandbox } from '../../../../../../../../core/admin/settings/generalsetting/generalsetting.sandbox';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  public mode: any = '';
  private subscriptions: Array<Subscription> = [];

  constructor(public sandbox: GeneralSettingSandbox, public changeDetect: ChangeDetectorRef) { }

  ngOnInit() {
    this.getGeneralSetting();
    this.subscribe();
    // this.getGeneralSetting();
  }
  submitMode() {
    const params: any = {};
    params.mode = this.mode;
    this.sandbox.maintenanceMode(params);
  }
  subscribe() {
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

  getGeneralSetting() {
    this.sandbox.getGeneralSetting();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
