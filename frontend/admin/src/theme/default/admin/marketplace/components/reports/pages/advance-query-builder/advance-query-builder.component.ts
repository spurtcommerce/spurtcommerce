import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-advance-query-builder',
  templateUrl: './advance-query-builder.component.html',
  styleUrls: ['./advance-query-builder.component.scss']
})
export class AdvanceQueryBuilderComponent implements OnInit {

  constructor(
    public titleService: Title,
  ) {
    this.titleService.setTitle('Advance Query Builder');
  }

  ngOnInit(): void {
  }

}
