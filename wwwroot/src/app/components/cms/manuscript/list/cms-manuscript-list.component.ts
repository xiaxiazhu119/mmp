import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AppRoutingService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptSearchModel, ManuscriptListModel, User, ManuscriptReviewModel, UserProfile } from '@app/models';
import { DialogConfig, AppPaginationConfig } from '@app/models/ui';
import { EnumClass, ManuscriptSearchTypeEnum, ManuscriptStatusEnum, PermissionGroupEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { CmsManuscriptConfirmDialogComponent } from './dialog/confirm/cms-manuscript-confirm-dialog.component';

@Component({
  selector: 'app-cms-manuscript-list',
  templateUrl: './cms-manuscript-list.component.html',
  styleUrls: ['./cms-manuscript-list.component.scss', './cms-manuscript-list.component.theme.scss'],
  providers: [CommonService, AppService, SnackBarService, DialogService, UserService, AppRoutingService, ManuscriptService, ModelTransferService, DialogBaseService]
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
  user: User;

  private manuscriptRouteConfig: any;
  private _profile: UserProfile;

  constructor(private commonService: CommonService,
    private appService: AppService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private dialogBaseService: DialogBaseService,
    private passportService: PassportService,
    private manuscriptService: ManuscriptService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private appRoutingService: AppRoutingService) {
    super();

    const appCmsRouteConfig = appRoutingService.getCmsRouteConfig();
    this.manuscriptRouteConfig = appCmsRouteConfig.modules.manuscript;
    this.sc.type = ManuscriptSearchTypeEnum.Manuscript;
    this._profile = passportService.getUserProfileCookie();

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
    // console.log(e);
    const id = e.data.id;
    switch (e.key) {
      case 'view':
        this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.info.link, id]);
        break;
      case 'edit':
        this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.edit.link, id]);
        break;
      case 'cancel':
        this.dialogService.openConfirmDialog('是否确认要取消投稿', (dialogRef: any) => {
          this.updateReview(id, ManuscriptStatusEnum.Confirmed, '取消', () => {
            dialogRef.close();
          });

          // const rv1 = new ManuscriptReviewModel();
          // rv1.manuscriptId = id;
          // rv1.status = ManuscriptStatusEnum.Canceled;
          // rv1.userId = this.user.id;
          // this.manuscriptService
          //   .review(rv1, (rsp: any) => {
          //     dialogRef.close();
          //     const rc = Number(this.utilsService.decryptByAES(rsp.data));
          //     const msg = rc > 0 ? '取消成功' : '取消失败，请稍后再试';
          //     this.snackBarService.open(msg);
          //     if (rc > 0) {
          //       this.getList();
          //     }
          //   });
        });
        break;
      case 'upload':
        break;
      case 'confirm':
        // this.updateReview(id, ManuscriptStatusEnum.Confirmed, '确认');

        const data = {
          title: e.data.title,
          idCard: this._profile.idCard
        };

        this.openConfirmDialog(data, (dialogRef: any) => {
          this._profile.idCard = data.idCard;

          this.updateReview(id, ManuscriptStatusEnum.Confirmed, '确认', () => {

            this.userService.updateProfile(this._profile, (rsp: any) => {
              const rc = Number(rsp.data);
              // const msg = rc > 0 ? '确认成功' : '确认失败，请稍后再试';
              // this.snackBarService.open(msg);
              if (rc > 0) {
                this.passportService.putUserProfileCookie(this._profile);
                // this.getList();
              }
              dialogRef.close();
            });

          });

        });

        break;
      case 'review':
        this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.review.link, id]);
        break;
      default:
        break;
    }
  }

  getStatusLabelStyle(s: ManuscriptStatusEnum): string {
    return this.utilsService.getEnumStr(ManuscriptStatusEnum, s);
  }

  getFileFullPath(path: string): string {
    return this.appService.getFileFullPath(path);
  }

  //#endregion

  private initStatusList(): void {
    this.statusList = EnumClass.getManuscriptStatusList();
  }

  private getList(): void {
    this.manuscriptService
      .getList(this.sc, (rsp: any) => {
        // console.log(data);
        if (rsp.data) {
          const d = JSON.parse(this.utilsService.decryptByAES(rsp.data));
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

  private updateReview(id: number, status: ManuscriptStatusEnum, operSummary: string, callback?: any): any {
    const review = new ManuscriptReviewModel();
    review.manuscriptId = id;
    review.status = status;
    review.userId = this.user.id;
    this.manuscriptService
      .review(review, (rsp: any) => {
        const rc = Number(this.utilsService.decryptByAES(rsp.data));
        const msg = operSummary + (rc > 0 ? '成功' : '失败，请稍后再试');
        this.snackBarService.open(msg);
        if (rc > 0) {
          this.getList();
        }
        if (callback) {
          callback();
        }
      });
  }

  private openConfirmDialog(data: any, callback: any): void {

    const cfg: DialogConfig = new DialogConfig();
    cfg.data = data;
    // cfg.onInit = (dialogRef: any, e: any) => {
    //   // console.log(e);
    // };
    cfg.onConfirm = (dialogRef: any, e: any) => {
      // console.log(cfg.data)
      // console.log(e);

      callback(dialogRef);

    };
    // cfg.onCancel = (dialogRef: any, e: any) => {
    //   // console.log(e);
    //   dialogRef.close();
    // };
    this.dialogBaseService
      .openDialogBase<CmsManuscriptConfirmDialogComponent>(cfg, CmsManuscriptConfirmDialogComponent);

  }

}
