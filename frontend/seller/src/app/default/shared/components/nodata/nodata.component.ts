import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nodata',
  templateUrl: './nodata.component.html',
  styleUrls: ['./nodata.component.scss']
})
export class NodataComponent implements OnInit {
  @Input() isTheme: boolean;
  constructor() { }

  ngOnInit() {
  }

}
