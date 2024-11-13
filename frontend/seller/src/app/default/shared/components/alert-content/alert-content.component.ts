import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-content',
  templateUrl: './alert-content.component.html',
  styleUrls: ['./alert-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertContentComponent {

  show: boolean = true

  @Input() alert: any = {};

  closeicon() {
    this.show = false;
  }

}
