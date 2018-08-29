import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { PassportService, UserService, MessageService } from '@app/service/app';
import { SnackBarService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { MessageInfoModel } from '@app/models';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { EnumClass } from '@app/enums';

@Component({
  selector: 'app-cms-message-info',
  templateUrl: './cms-message-info.component.html',
  styleUrls: ['./cms-message-info.component.scss', './cms-message-info.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, ModelTransferService, MessageService]
})
export class CmsMessageInfoComponent extends AppCmsBaseComponent implements OnInit {

  msg: MessageInfoModel = new MessageInfoModel();

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private messageService: MessageService,
    private modelTransferService: ModelTransferService,
    private userService: UserService) {
    super();

  }

  ngOnInit(): void {

    this.msg.id = Number(this.commonService.getParam('id') || 0);
    if (this.msg.id === 0) {
      this.commonService.routerNavigate('/');
      return;
    }
    this.initData();
  }

  goBack(): void {
    this.commonService.goBack();
  }

  private initData(): void {
    this.messageService
      .getInfo(this.msg.id, (rsp: any) => {

        if (rsp.data) {
          const d = JSON.parse(rsp.data);
          this.msg = this.modelTransferService.transferMessageInfoModel(d);
          // this.msg.typeName = EnumClass.getMessageTypeName(this.msg.type);
        }

      });
  }

}
