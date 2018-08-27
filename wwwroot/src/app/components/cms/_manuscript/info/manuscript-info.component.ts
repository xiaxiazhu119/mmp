import { Component, OnChanges, OnInit, SimpleChange, Input, ViewChild } from '@angular/core';

import { AppService, PassportService, UserService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptReviewModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';

@Component({
  selector: 'app-manuscript-info',
  templateUrl: './manuscript-info.component.html',
  styleUrls: ['./manuscript-info.component.scss', './manuscript-info.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AppService, ManuscriptService, ModelTransferService]
})
export class ManuscriptInfoComponent implements OnInit {

  info: ManuscriptInfoModel = new ManuscriptInfoModel();
  author: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  infoOri: ManuscriptInfoModel = new ManuscriptInfoModel();
  authorOri: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  profile: UserProfile = new UserProfile();

  private _user: User;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private appService: AppService,
    private userService: UserService,
    private modelTransferService: ModelTransferService,
    private manuscriptService: ManuscriptService) {

    this._user = passportService.getUserCookie();
    // this.profile = passportService.getUserProfileCookie();
  }

  ngOnInit(): void {

    this.info.id = Number(this.commonService.getParam('id')) || 0;

    if (this.info.id === 0) {
      this.commonService.routerNavigate('/');
      return;
    }

    this.initLatestData();
    this.initOriData();
  }

  getFileFullPath(path: string): string {
    return this.appService.getFileFullPath(path);
  }

  private initLatestData(): void {
    this.manuscriptService
      .getInfo(this.info.id, (rsp: any) => {

        if (rsp.data) {
          const d = JSON.parse(rsp.data);
          this.info = this.modelTransferService.transferManuscriptInfoModel(d.info);
          this.author = this.modelTransferService.transferManuscriptAuthorModel(d.author);

          if (this.info.file) {
            this.info.fileName = this.utilsService.getFileNameByPath(this.info.file);
            this.info.fileFullPath = this.appService.getFileFullPath(this.info.file);
          }

          this.userService
            .getInfo(this.info.userId, (rsp2: any) => {
              const d2 = JSON.parse(this.utilsService.decryptByAES(rsp2.data));
              this.profile = this.modelTransferService.transferUserProfileModel(d2.profile);
              // console.log(d2,this.profile)
            });

        }

      });
  }

  private initOriData(): void {
    this.manuscriptService
      .ori(this.info.id, (rsp: any) => {

        if (rsp.data) {
          const d = JSON.parse(rsp.data);
          this.infoOri = this.modelTransferService.transferManuscriptInfoModel(d.info);
          this.authorOri = this.modelTransferService.transferManuscriptAuthorModel(d.author);

          if (this.infoOri.file) {
            this.infoOri.fileName = this.utilsService.getFileNameByPath(this.infoOri.file);
            this.infoOri.fileFullPath = this.appService.getFileFullPath(this.infoOri.file);
          }

        }

      });

  }

}
