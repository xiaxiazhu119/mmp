import { Component, OnChanges, OnInit, SimpleChange, Input, ViewChild } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptReviewModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-cms-manuscript-review-form',
  templateUrl: './manuscript-review-form.component.html',
  styleUrls: ['./manuscript-review-form.component.scss', './manuscript-review-form.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AreaService, AppService, ManuscriptService, ModelTransferService]
})
export class ManuscriptReviewFormComponent implements OnInit {

  @Input()
  review: ManuscriptReviewModel;
  @Input()
  reviewOri: ManuscriptReviewModel;

  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  statusList = [];

  isPassed = false;
  isReturn = false;
  isRefused = false;

  fuCfg = {
    p: {
      btn: '上传终稿',
      ph: '上传终稿',
      a: '查看终稿'
    },
    rt: {
      btn: '上传修改意见',
      ph: '修改意见',
      a: '查看修改意见'
    }
  };

  fu: any;

  private _user: User;
  private _profile: UserProfile = new UserProfile();

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private areaService: AreaService,
    private passportService: PassportService,
    private appService: AppService,
    private userService: UserService,
    private modelTransferService: ModelTransferService,
    private manuscriptService: ManuscriptService) {

    this._user = passportService.getUserCookie();
    this._profile = passportService.getUserProfileCookie();
  }

  ngOnInit(): void {

    // this.info.file = '/upload/1/ecology_201808101439094518.sql';

    this.review.id = Number(this.commonService.getParam('id')) || 0;

    if (this.review.id === 0) {
      this.commonService.routerNavigate('/cms');
      return;
    }

    this.initStatusList();

    this.initData();
    // console.log('id:', id);

  }

  //#region file

  onReviewFileUpload(e: any): void {
    // console.log('onfileupload:', e)
    if (e.code < 0) {
      this.showSnackBarMsg(e.desc);
    } else {
      if (e.data) {
        const filePath = this.utilsService.decryptByAES(e.data);
        // console.log(filePath)
      }
    }

  }

  delReviewFile(): void {

  }

  //#endregion

  //#region author-type status category periodical

  onStatusChange(e: any): void {
    this.isPassed = this.isReturn = this.isRefused = false;
    switch (e.value) {
      case ManuscriptStatusEnum.Passed:
        this.isPassed = true;
        this.fu = this.fuCfg.p;
        break;
      case ManuscriptStatusEnum.Return:
        this.isReturn = true;
        this.fu = this.fuCfg.rt;
        break;
    }
  }

  //#endregion

  //#region private

  private initStatusList(): void {
    this.statusList.push({
      id: ManuscriptStatusEnum.Passed,
      name: EnumClass.getManuscriptStatusName(ManuscriptStatusEnum.Passed)
    });
    this.statusList.push({
      id: ManuscriptStatusEnum.Return,
      name: EnumClass.getManuscriptStatusName(ManuscriptStatusEnum.Return)
    });
    this.statusList.push({
      id: ManuscriptStatusEnum.Refused,
      name: EnumClass.getManuscriptStatusName(ManuscriptStatusEnum.Refused)
    });
  }

  private initData(): void {
  }


  private showSnackBarMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

  //#endregion

}
