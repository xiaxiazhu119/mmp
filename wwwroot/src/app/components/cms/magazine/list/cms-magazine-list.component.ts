import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AppRoutingService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptSearchModel, ManuscriptListModel } from '@app/models';
import { DialogConfig, AppPaginationConfig } from '@app/models/ui';
import { EnumClass, ManuscriptStatusEnum, ManuscriptSearchTypeEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-magazine-list',
  templateUrl: './cms-magazine-list.component.html',
  styleUrls: ['./cms-magazine-list.component.scss', './cms-magazine-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AppRoutingService, ManuscriptService, ModelTransferService]
})
export class CmsMagazineListComponent extends AppCmsBaseComponent implements OnInit {

  sc: ManuscriptSearchModel = new ManuscriptSearchModel();
  dataList: ManuscriptListModel[] = [];
  categoryList = [];

  pgCfg: AppPaginationConfig = new AppPaginationConfig();

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private manuscriptService: ManuscriptService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private appRoutingService: AppRoutingService) {
    super();

    this.sc.status = ManuscriptStatusEnum.Published;
    this.sc.type = ManuscriptSearchTypeEnum.Magazine;
  }

  ngOnInit(): void {
    this.initCategoryList();
    this.search();
  }

  //#region public function

  clearKeyword(): void {
    this.sc.keyword = undefined;
  }

  clearAuthorName(): void {
    this.sc.authorName = undefined;
  }

  clearCompanyName(): void {
    this.sc.companyName = undefined;
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
