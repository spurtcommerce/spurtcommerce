import { ChangeDetectionStrategy, Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-badge',
  templateUrl: './common-badge.component.html',
  styleUrls: ['./common-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonBadgeComponent {
@Input() rejected:any 
  @Input() badge: any = {};
  @Output() rejectReason: EventEmitter<string> = new EventEmitter();
  rejectLength: any;


  emitValue(){
   this.rejectLength =  JSON.parse( this.rejected.rejectReason)?.length
    this.rejectReason.emit(this.rejected);
  }

  getClassMap() {
    return {
      [this.badge.class]: true,  // Dynamically set the class
      'identify-data': !['', null, undefined].includes(this.badge.image)  // Conditionally add 'identify-data'
    };
  }

}
