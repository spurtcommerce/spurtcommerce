import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-badge',
  templateUrl: './common-badge.component.html',
  styleUrls: ['./common-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonBadgeComponent {

  @Input() badge: any = {};

}
