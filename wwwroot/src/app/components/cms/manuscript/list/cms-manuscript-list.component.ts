import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AppRoutingService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptSearchModel, ManuscriptListModel, User } from '@app/models';
import { DialogConfig, AppPaginationConfig } from '@app/models/ui';
import { EnumClass, ManuscriptSearchTypeEnum, ManuscriptStatusEnum, PermissionGroupEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-manuscript-list',
  templateUrl: './cms-manuscript-list.component.html',
  styleUrls: ['./cms-manuscript-list.component.scss', './cms-manuscript-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, DialogService, UserService, AppRoutingService, ManuscriptService, ModelTransferService]
})
export class CmsManuscriptListComponent extends AppCmsBaseComponent implements OnInit {

  sc: ManuscriptSearchModel = new ManuscriptSearchModel();
  dataList: ManuscriptListModel[] = [];
  statusList = [];

  pgCfg: AppPaginationConfig = new AppPaginationConfig();

  permissions = {
    canEdit: false,
    canCancel: false,
    canReview: false,
    canConfirm: false
  };

  private manuscriptRouteConfig: any;
  private user: User;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private passportService: PassportService,
    private manuscriptService: ManuscriptService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private appRoutingService: AppRoutingService) {
    super();

    const appCmsRouteConfig = appRoutingService.getCmsRouteConfig();
    this.manuscriptRouteConfig = appCmsRouteConfig.modules.manuscript;
    this.sc.type = ManuscriptSearchTypeEnum.Manuscript;

    this.checkPermission();
  }

  ngOnInit(): void {
    this.initStatusList();
    this.search();
  }

  //#region public function

  clearKeyword(): void {
    this.sc.keyword = undefined;
  }

  goToCreate(): void {
    this.commonService.routerNavigate(this.manuscriptRouteConfig.modules.create.link);
  }

  search(pageIndex?: number): void {
    this.sc.pageIndex = pageIndex === undefined ? 1 : pageIndex;
    this.getList();
  }

  onPageChange(e: any): void {
    // console.log(e)
    this.search(Number(e));
  }

  onOperationEmit(e: any): void {
    console.log(e);
    const id = e.data.id;
    switch (e.key) {
      case 'view':
        this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.info.link, id]);
        break;
      case 'edit':
        this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.edit.link, id]);
        break;
      case 'cancel':
        this.dialogService.openConfirmDialog('是否确认要取消投稿', (dialogRef: any, data?: any) => {
          this.manuscriptService
            .updateStatus(id, ManuscriptStatusEnum.Canceled, (d: any) => {
              dialogRef.close();
              const rc = Number(this.utilsService.decryptByAES(d.data));
              const msg = rc > 0 ? '取消成功' : '取消失败，请稍后再试';
              this.snackBarService.open(msg);
              if (rc > 0) {
                this.getList();
              }
            });
        });
        break;
      case 'upload':
        break;
      case 'confirm':
        break;
      case 'review':
      this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.review.link, id]);
        break;
      default:
        break;
    }
  }

  //#endregion

  private initStatusList(): void {
    this.statusList = EnumClass.getManuscriptStatusList();
  }

  private getList(): void {
    this.manuscriptService
      .list(this.sc, (data: any) => {
        // console.log(data);
        if (data.data) {
          const d = JSON.parse(this.utilsService.decryptByAES(data.data));
          // console.log(d);
          // console.log(d.list);
          this.dataList = this.modelTransferService.transferManuscriptListModel(d.list);
          this.pgCfg.totalItems = d.total;
        }
      });
  }

  //#region permission

  private checkPermission(): void {

    this.user = this.passportService.getUserCookie();

    const pg = this.user.permissionGroup;

    switch (pg) {
      case PermissionGroupEnum.Teacher:
        this.sc.userId = this.user.id;
        this.permissions.canEdit = this.permissions.canCancel = this.permissions.canConfirm = true;
        break;
      case PermissionGroupEnum.Editor:
        this.permissions.canReview = true;
        break;
      case PermissionGroupEnum.SA:
        this.permissions.canEdit = this.permissions.canCancel = this.permissions.canConfirm = this.permissions.canReview = true;
        break;
      default:
        break;

    }
  }


  //#endregion

}
