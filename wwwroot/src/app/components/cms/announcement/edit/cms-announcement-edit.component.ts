import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { PassportService, UserService, MessageService } from '@app/service/app';
import { SnackBarService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { MessageInfoModel, User } from '@app/models';
import { EnumClass, MessageTypeEnum } from '@app/enums';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-announcement-edit',
  templateUrl: './cms-announcement-edit.component.html',
  styleUrls: ['./cms-announcement-edit.component.scss', './cms-announcement-edit.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, ModelTransferService, MessageService]
})
export class CmsAnnouncementEditComponent extends AppCmsBaseComponent implements OnInit {

  msg: MessageInfoModel = new MessageInfoModel();
  scopeTypeList: any[] = [];
  isFormSubmit = false;

  private _user: User;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private messageService: MessageService,
    private modelTransferService: ModelTransferService,
    private userService: UserService) {
    super();

    this._user = passportService.getUserCookie();
    this.msg.type = MessageTypeEnum.Announcement;

  }

  ngOnInit(): void {

    this.initScopeTypeList();
    this.msg.id = Number(this.commonService.getParam('id') || 0);
    if (this.msg.id !== 0) {
      this.initData();
    }
  }

  goBack(interval = 0): void {
    this.commonService.goBack(interval);
  }

  submit(): void {

    if (this.isFormSubmit) {
      return;
    }

    if (typeof this.msg.title === 'undefined' || this.msg.title.trim() === '') {
      this.showSnackBarMsg('请填写标题');
      return;
    }

    if (typeof this.msg.scopeType === 'undefined') {
      this.showSnackBarMsg('请选择推送范围');
      return;
    }

    if (typeof this.msg.content === 'undefined' || this.msg.content.trim() === '') {
      this.showSnackBarMsg('请填写公告内容');
      return;
    }

    this.isFormSubmit = true;

    this.msg.userId = this._user.id;


    this.messageService
      .edit(this.msg, (rsp: any) => {
        if (rsp.data) {
          const id = Number(this.utilsService.decryptByAES(rsp.data));

          const tag = '公告';
          let op = '', rst = '';
          op = this.msg.id > 0 ? '编辑' : '发布';
          rst = id > 0 ? '成功' : '失败';

          this.showSnackBarMsg(tag + op + rst);

          this.goBack(1000);
        }
        this.isFormSubmit = false;

      }, (err: any) => {
        // console.log(err);
        this.isFormSubmit = false;
      });


  }

  private initScopeTypeList(): void {
    this.scopeTypeList = EnumClass.getMessageScopeTypeList();
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

  private showSnackBarMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

}
