import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AppRoutingService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptSearchModel, ManuscriptListModel } from '@app/models';
import { DialogConfig, AppPaginationConfig } from '@app/models/ui';
import { EnumClass, ManuscriptSearchTypeEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-manuscript-list',
  templateUrl: './cms-manuscript-list.component.html',
  styleUrls: ['./cms-manuscript-list.component.scss', './cms-manuscript-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AppRoutingService, ManuscriptService, ModelTransferService]
})
export class CmsManuscriptListComponent extends AppCmsBaseComponent implements OnInit {

  sc: ManuscriptSearchModel = new ManuscriptSearchModel();
  dataList: ManuscriptListModel[] = [];
  statusList = [];

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
    this.sc.type = ManuscriptSearchTypeEnum.Manuscript;

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
    switch (e.key) {
      case 'edit':
        this.commonService.routerNavigate([this.manuscriptRouteConfig.modules.edit.link, e.data.id]);
        break;
      case 'cancel':
        break;
      case 'upload':
        break;
      case 'confirm':
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

}
