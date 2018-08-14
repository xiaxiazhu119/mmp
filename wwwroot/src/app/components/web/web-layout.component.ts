import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppWebBaseComponent } from '@app/webBaseComponent';
import { CommonService } from '@app/service/common';
import { AppService } from '@app/service/app';
import { DialogService } from '@app/service/ui';

import { appRouteConfig } from '@app/routing';

const __webModules = appRouteConfig.modules.web.modules.home.modules;

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss', './web-layout.component.theme.scss'],
  providers: [AppService, CommonService]
})
export class WebLayoutComponent extends AppWebBaseComponent implements OnInit, AfterViewInit {


  constructor(private commonService: CommonService,
    private dialogService: DialogService,
    private appService: AppService) {
    super();

    this.commonService.componentLoaded();
  }

  ngOnInit(): void {
    // console.log('load web layout component complete');
  }



  ngAfterViewInit(): void {
  }



}


