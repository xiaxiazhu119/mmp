import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, MessageService } from '@app/service/app';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { MessageTypeEnum, MessageScopeTypeEnum, EnumClass } from '@app/enums';
import { User, MessageSearchModel, MessageInfoModel } from '@app/models';
import { AppPaginationConfig } from '@app/models/ui';
import { SnackBarService, DialogService } from '@app/service/ui';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-announcement-list',
  templateUrl: './cms-announcement-list.component.html',
  styleUrls: ['./cms-announcement-list.component.scss', './cms-announcement-list.component.theme.scss'],
  providers: [AppService, CommonService, UserService, MessageService, ModelTransferService, SnackBarService, DialogService]
})
export class CmsAnnouncementListComponent extends AppCmsBaseComponent implements OnInit {

  sc: MessageSearchModel = new MessageSearchModel();
  pgCfg: AppPaginationConfig = new AppPaginationConfig();
  messageList: MessageInfoModel[];
  noDataTxt = '暂时没有网站公告';
  scopeTypeList: any[] = [];

  constructor(private commonService: CommonService,
    private appService: AppService,
    private utilsService: UtilsService,
    private modelTransferService: ModelTransferService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private messageService: MessageService) {
    super();

    this.sc.type = MessageTypeEnum.Announcement;
    this.initScopeTypeList();
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

  clearTitle(): void {
    this.sc.title = undefined;
  }

  goToCreate(): void {
    this.commonService.routerNavigate(['/cms/announcement/edit', 0]);
  }

  goToEdit(id: number): void {
    this.commonService.routerNavigate(['/cms/announcement/edit', id]);
  }

  del(id: number): void {
    this.dialogService.openConfirmDialog('是否确认要删除该公告？', (dialogRef: any) => {
      this.messageService
        .delete(id, (rsp: any) => {

          const rc = Number(rsp.data);
          const msg = rc > 0 ? '删除成功' : '删除失败，请稍后再试';
          this.snackBarService.open(msg);
          if (rc > 0) {
            this.getList();
          }

        });
    });
  }

  private initScopeTypeList(): void {
    this.scopeTypeList = EnumClass.getMessageScopeTypeList();
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
