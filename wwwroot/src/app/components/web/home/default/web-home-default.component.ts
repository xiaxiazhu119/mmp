import { Component, OnInit } from '@angular/core';

import { AppWebBaseComponent } from '@app/webBaseComponent';
import { CommonService } from '@app/service/common';
import { DialogService } from '@app/service/ui';

@Component({
  selector: 'app-web-home-default',
  templateUrl: './web-home-default.component.html',
  styleUrls: ['./web-home-default.component.scss', './web-home-default.component.theme.scss'],
  providers: []
})
export class WebHomeDefaultComponent extends AppWebBaseComponent implements OnInit {

  constructor(private commonService: CommonService,
    private dialogService: DialogService) {
    super();


    this.commonService.componentLoaded();
  }

  ngOnInit(): void {


  }

  goToSignIn(): void {
    this.commonService.routerNavigate('/passport/sign-in');
  }


  goToCms(): void {
    this.commonService.routerNavigate('/cms');
  }


}
