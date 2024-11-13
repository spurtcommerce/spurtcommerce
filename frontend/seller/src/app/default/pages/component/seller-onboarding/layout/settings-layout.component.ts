import { Component, OnInit } from '@angular/core';
import { settingsSideMenu } from './settings.layout.constant';
import { environment } from '../../../../../../environments/environment';
import { sellerOnBoardingSandbox } from '../../../../../../../src/app/core/seller-onBoarding/sellerOnBoarding.sandbox';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent implements OnInit {

  settingsSideMenu = settingsSideMenu;
  imageUrl = environment.imageUrl;

  constructor(public sellerOnBoardingSandbox: sellerOnBoardingSandbox) { }

  ngOnInit(): void {
  }

}
