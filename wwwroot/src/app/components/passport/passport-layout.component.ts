import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppPassportBaseComponent } from '@app/passportBaseComponent';
import { CommonService } from '@app/service/common';
import { AppService } from '@app/service/app';
import { DialogService } from '@app/service/ui';

@Component({
  selector: 'app-passport-layout',
  templateUrl: './passport-layout.component.html',
  styleUrls: ['./passport-layout.component.scss', './passport-layout.component.theme.scss'],
  providers: [AppService]
})
export class PassportLayoutComponent extends AppPassportBaseComponent implements OnInit, AfterViewInit {

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


