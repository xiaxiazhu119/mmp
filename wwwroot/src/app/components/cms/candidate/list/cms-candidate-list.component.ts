import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AppRoutingService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptSearchModel, ManuscriptListModel, ManuscriptPublishModel, User, ManuscriptReviewModel } from '@app/models';
import { DialogConfig, AppPaginationConfig } from '@app/models/ui';
import { EnumClass, ManuscriptStatusEnum, ManuscriptSearchTypeEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { CmsManuscriptPublishDialogComponent } from './dialog/publish/cms-manuscript-publish-dialog.component';

@Component({
  selector: 'app-cms-candidate-list',
  templateUrl: './cms-candidate-list.component.html',
  styleUrls: ['./cms-candidate-list.component.scss', './cms-candidate-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AppRoutingService, ManuscriptService, ModelTransferService, DialogService]
})
export class CmsCandidateListComponent extends AppCmsBaseComponent implements OnInit {

  sc: ManuscriptSearchModel = new ManuscriptSearchModel();
  dataList: ManuscriptListModel[] = [];
  categoryList = [];

  pgCfg: AppPaginationConfig = new AppPaginationConfig();

  private manuscriptRouteConfig: any;
  private _user: User;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private manuscriptService: ManuscriptService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private appRoutingService: AppRoutingService) {
    super();

    this._user = passportService.getUserCookie();

    const appCmsRouteConfig = appRoutingService.getCmsRouteConfig();
    this.manuscriptRouteConfig = appCmsRouteConfig.modules.manuscript;

    this.sc.status = ManuscriptStatusEnum.Stored;
    this.sc.type = ManuscriptSearchTypeEnum.Candidate;
  }

  ngOnInit(): void {
    this.initCategoryList();
    this.search();
  }

  //#region public function

  clearKeyword(): void {
    this.sc.keyword = undefined;
  }

  goToEdit(): void {
    this.commonService.routerNavigate(this.manuscriptRouteConfig.modules.edit.link);
  }

  search(pageIndex?: number): void {
    this.sc.pageIndex = pageIndex === undefined ? 1 : pageIndex;
    this.getList();
  }

  onPageChange(e: any): void {
    // console.log(e)
    this.search(Number(e));
  }

  getConfirmLabelStyle(isConfirm: boolean): string {
    let txt = '未确认', cls = 'return';
    if (isConfirm) {
      txt = '已确认';
      cls = 'confirmed';
    }
    return `<span class="app-label ${cls}">${txt}</span>`;
    // return '';
  }

  publish(data: any): void {

    const publishData: ManuscriptPublishModel = {
      manuscriptId: data.id,
      userId: this._user.id
    };

    const dialogData = {
      title: data.title,
      year: undefined,
      term: undefined
    };

    const callback = (dialogRef: any) => {

      publishData.year = dialogData.year;
      publishData.term = dialogData.term;
      console.log(publishData);

      const reviewData: ManuscriptReviewModel = {
        id: 0,
        manuscriptId: data.id,
        status: ManuscriptStatusEnum.Published,
        userId: this._user.id,
        pub: publishData
      };

      this.manuscriptService
        .review(reviewData, (rsp: any) => {

          const rc = Number(this.utilsService.decryptByAES(rsp.data));
          const msg = rc > 0 ? '刊登成功' : '刊登失败，请稍后再试';
          // this.snackBarService.open(msg);
          if (rc > 0) {
            this.getList();
          }
          this.snackBarService.open(msg);
          dialogRef.close();

        });

    };

    this.dialogService
      .openCustomDialog<CmsManuscriptPublishDialogComponent>(dialogData, CmsManuscriptPublishDialogComponent, callback);


  }

  goToInfo(id: number): void {
    this.commonService.routerNavigate(['/cms/candidate/info', id]);
  }

  //#endregion

  private initCategoryList(): void {
    this.categoryList = EnumClass.getManuscriptCategoryList();
  }

  private getList(): void {
    this.manuscriptService
      .getList(this.sc, (rsp: any) => {
        // console.log(data);
        if (rsp.data) {
          const d = JSON.parse(this.utilsService.decryptByAES(rsp.data));
          console.log(d);
          // console.log(d.list);
          this.dataList = this.modelTransferService.transferManuscriptListModel(d.list);
          this.pgCfg.totalItems = d.total;
        }
      });
  }


}
