import { Component, OnChanges, OnInit, SimpleChange, Input, ViewChild } from '@angular/core';

import { AppService, PassportService, UserService, MessageService } from '@app/service/app';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { MessageTypeEnum, MessageScopeTypeEnum, PermissionGroupEnum } from '@app/enums';
import { User, MessageSearchModel, MessageInfoModel } from '@app/models';
import { AppPaginationConfig } from '@app/models/ui';

@Component({
  selector: 'app-cms-message-tab-item',
  templateUrl: './message-tab-item.component.html',
  styleUrls: ['./message-tab-item.component.scss', './message-tab-item.component.theme.scss'],
  providers: [AppService, CommonService, UserService, MessageService, ModelTransferService]
})
export class MessageTabItemComponent implements OnInit {

  @Input()
  type: MessageTypeEnum;

  sc: MessageSearchModel = new MessageSearchModel();
  pgCfg: AppPaginationConfig = new AppPaginationConfig();
  messageList: MessageInfoModel[];
  noDataTxt: string;

  private _user: User;

  constructor(private commonService: CommonService,
    private appService: AppService,
    private passportService: PassportService,
    private utilsService: UtilsService,
    private modelTransferService: ModelTransferService,
    private messageService: MessageService) {

    this._user = passportService.getUserCookie();

    this.sc.type = this.type;

  }

  ngOnInit(): void {
    switch (this.type) {
      case MessageTypeEnum.Notice:
        this.sc.scopeType = MessageScopeTypeEnum.Single;
        this.sc.scopeValue = this._user.id.toString();
        this.noDataTxt = '暂时没有系统通知';
        break;
      case MessageTypeEnum.Announcement:
        this.noDataTxt = '暂时没有网站公告';

        let t;
        switch (this._user.permissionGroup) {
          case PermissionGroupEnum.Teacher:
            t = MessageScopeTypeEnum.Teacher;
            break;
          case PermissionGroupEnum.Info:
          case PermissionGroupEnum.Director:
            t = MessageScopeTypeEnum.District;
            break;
          default:
            break;
        }

        this.sc.type = MessageTypeEnum.Announcement;
        this.sc.scopeTypes = Number(MessageScopeTypeEnum.All) + (typeof t !== 'undefined' ? (',' + Number(t)) : '');

        break;
    }
    this.search();

  }

  search(pageIndex?: number): void {
    this.sc.pageIndex = pageIndex === undefined ? 1 : pageIndex;
    this.getList();
  }

  onPageChange(e: any): void {
    // console.log(e)
    this.search(Number(e));
  }

  goToInfo(id: number): void {
    this.commonService.routerNavigate(['/cms/message/info', id]);
  }

  private getList(): void {
    this.messageService
      .getList(this.sc, (rsp: any) => {
        if (rsp.data) {
          const d = JSON.parse(rsp.data);
          this.messageList = this.modelTransferService.transferMessageListModel(d.list);
          this.pgCfg.totalItems = d.total;
        }

      });
  }

}
