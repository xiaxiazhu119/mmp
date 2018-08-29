import { Component, OnInit } from '@angular/core';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { CommonService, ModelTransferService } from '@app/service/common';
import { DialogService } from '@app/service/ui';
import { MessageService, PassportService } from '@app/service/app';
import { MessageInfoModel, MessageSearchModel, User } from '@app/models';
import { MessageTypeEnum, MessageScopeTypeEnum, PermissionGroupEnum } from '@app/enums';

@Component({
  selector: 'app-cms-home-dashboard',
  templateUrl: './cms-home-dashboard.component.html',
  styleUrls: ['./cms-home-dashboard.component.scss', './cms-home-dashboard.component.theme.scss'],
  providers: [CommonService, PassportService, ModelTransferService, MessageService]
})
export class CmsHomeDashboardComponent extends AppCmsBaseComponent implements OnInit {

  noticeList: MessageInfoModel[] = [];
  announcementList: MessageInfoModel[] = [];

  private _user: User;
  constructor(private commonService: CommonService,
    private messageService: MessageService,
    private passportService: PassportService,
    private modelTransferService: ModelTransferService) {
    super();

    this._user = passportService.getUserCookie();

  }

  ngOnInit(): void {

    this.initNoticeList();
    this.initAnnouncementList();

  }

  goToAnnouncement(): void {
    this.goToMessageList(MessageTypeEnum.Announcement);
  }

  goToNotice(): void {
    this.goToMessageList(MessageTypeEnum.Notice);
  }

  goToInfo(id: number): void {
    this.commonService.routerNavigate(['/cms/message/info', id]);
  }

  private goToMessageList(t: MessageTypeEnum): void {
    this.commonService.routerNavigate('/cms/message/list', { t: t });
  }

  private initNoticeList(): void {
    const sc: MessageSearchModel = new MessageSearchModel();
    sc.type = MessageTypeEnum.Notice;
    sc.scopeType = MessageScopeTypeEnum.Single;
    sc.scopeValue = this._user.id.toString();
    const callback = (rsp: any) => {
      if (rsp.data) {
        const d = JSON.parse(rsp.data);
        this.noticeList = this.modelTransferService.transferMessageListModel(d.list);
      }
    };
    this.getMessageList(sc, callback);
  }

  private initAnnouncementList(): void {
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

    const sc: MessageSearchModel = new MessageSearchModel();
    sc.type = MessageTypeEnum.Announcement;
    sc.scopeTypes = Number(MessageScopeTypeEnum.All) + (typeof t !== 'undefined' ? (',' + Number(t)) : '');
    const callback = (rsp: any) => {
      if (rsp.data) {
        const d = JSON.parse(rsp.data);
        this.announcementList = this.modelTransferService.transferMessageListModel(d.list);
      }
    };
    this.getMessageList(sc, callback);
  }

  private getMessageList(sc: MessageSearchModel, callback: any): void {
    sc.pageSize = 5;
    this.messageService
      .getList(sc, callback);
  }


}
