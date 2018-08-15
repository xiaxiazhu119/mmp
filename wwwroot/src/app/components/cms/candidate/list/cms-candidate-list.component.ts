import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AppRoutingService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptSearchModel, ManuscriptListModel } from '@app/models';
import { DialogConfig, AppPaginationConfig } from '@app/models/ui';
import { EnumClass, ManuscriptStatusEnum, ManuscriptSearchTypeEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-candidate-list',
  templateUrl: './cms-candidate-list.component.html',
  styleUrls: ['./cms-candidate-list.component.scss', './cms-candidate-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AppRoutingService, ManuscriptService, ModelTransferService]
})
export class CmsCandidateListComponent extends AppCmsBaseComponent implements OnInit {

  sc: ManuscriptSearchModel = new ManuscriptSearchModel();
  dataList: ManuscriptListModel[] = [];
  categoryList = [];

  pgCfg: AppPaginationConfig = new AppPaginationConfig();
  private manuscriptRouteConfig: any;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private manuscriptService: ManuscriptService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private appRoutingService: AppRoutingService) {
    super();

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

  //#endregion

  private initCategoryList(): void {
    this.categoryList = EnumClass.getManuscriptCategoryList();
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

}
