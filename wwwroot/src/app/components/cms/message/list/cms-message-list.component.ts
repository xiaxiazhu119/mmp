import { Component, OnChanges, OnInit, SimpleChange, Input, ViewChild } from '@angular/core';

import { AppService, PassportService, UserService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService } from '@app/service/common';
import { KeyValuePair } from '@app/models';
import { DialogConfig } from '@app/models/ui';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { MessageTypeEnum } from '@app/enums';

@Component({
  selector: 'app-cms-message-list',
  templateUrl: './cms-message-list.component.html',
  styleUrls: ['./cms-message-list.component.scss', './cms-message-list.component.theme.scss'],
  providers: [AppService, CommonService, SnackBarService, UserService]
})
export class CmsMessageListComponent extends AppCmsBaseComponent implements OnInit {

  @ViewChild('tabGroup')
  tabGroup: any;

  notice = MessageTypeEnum.Notice;
  announcement = MessageTypeEnum.Announcement;


  constructor(private commonService: CommonService,
    private appService: AppService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private userService: UserService) {
    super();

  }

  ngOnInit(): void {

    this.appService.initTabInkBar(this.tabGroup);
  }

}
