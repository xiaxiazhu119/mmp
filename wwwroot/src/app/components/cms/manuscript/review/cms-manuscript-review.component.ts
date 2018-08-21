import { Component, OnChanges, OnInit, SimpleChange, Input, ViewEncapsulation } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptReviewModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';


@Component({
  selector: 'app-cms-manuscript-review',
  templateUrl: './cms-manuscript-review.component.html',
  styleUrls: ['./cms-manuscript-review.component.scss', './cms-manuscript-review.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AreaService, AppService, ManuscriptService, ModelTransferService],
  encapsulation: ViewEncapsulation.None
})
export class CmsManuscriptReviewComponent extends AppCmsBaseComponent implements OnInit {

  isReview = true;
  info: ManuscriptInfoModel = new ManuscriptInfoModel();
  author: ManuscriptAuthorModel = new ManuscriptAuthorModel();
  infoOri: ManuscriptInfoModel = new ManuscriptInfoModel();
  authorOri: ManuscriptAuthorModel = new ManuscriptAuthorModel();
  review: ManuscriptReviewModel = new ManuscriptReviewModel();
  reviewOri: ManuscriptReviewModel = new ManuscriptReviewModel();

  isFormSubmit = false;
  isSubmitted = false;

  private _user: User;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private areaService: AreaService,
    private passportService: PassportService,
    private appService: AppService,
    private userService: UserService,
    private modelTransferService: ModelTransferService,
    private manuscriptService: ManuscriptService) {
    super();

    this._user = passportService.getUserCookie();
    if (this._user.permissionGroup !== PermissionGroupEnum.SA && this._user.permissionGroup !== PermissionGroupEnum.Editor) {
      this.commonService.routerNavigate('/cms');
      return;
    }

  }

  ngOnInit(): void {

  }

  submit(isSave = true): void {
    console.log(this.info);
    console.log(this.author);

    if (this.isFormSubmit) {
      return;
    }

    if (!this.verifyForm()) {
      return;
    }

    this.info.editUserId = this._user.id;

    this.isFormSubmit = true;

    if (this.info.id > 0) {
      const infoHasChanged = this.utilsService.compareObj(this.info, this.infoOri);
      const authorHasChanged = this.utilsService.compareObj(this.author, this.authorOri);
      if (!infoHasChanged && !authorHasChanged) {
        this.showSnackBarMsg('数据未发生变化，不能提交');
        this.isFormSubmit = false;
        return;
      }
    }

    this.manuscriptService
      .edit(this.info, this.author, (data: any) => {
        this.isFormSubmit = false;
        const id = Number(this.utilsService.decryptByAES(data.data));

        let msg = '';
        if (id > 0) {
          msg = this.info.id > 0 ? '投稿编辑成功' : '投稿成功，请等待评审结果';
        } else {
          msg = this.info.id > 0 ? '编辑失败' : '投稿失败';
        }
        this.showSnackBarMsg(msg);


      }, (err: any) => {
        this.isFormSubmit = false;
      });

  }

  goBack(): void {
    this.commonService.goBack();
  }

  private verifyForm(): boolean {
    const msg = this.manuscriptService.verifyManuscriptForm(this.info, this.author);
    if (msg !== '') {
      this.showSnackBarMsg(msg);
      return false;
    }
    return true;
  }

  private showSnackBarMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

}
