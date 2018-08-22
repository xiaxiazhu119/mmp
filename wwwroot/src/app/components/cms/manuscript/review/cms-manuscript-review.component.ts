import { Component, OnChanges, OnInit, SimpleChange, Input, ViewEncapsulation } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptReviewModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import '@app/interfaces';

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
    // console.log(this.info);
    // console.log(this.author);
    // console.log(this.review);

    // return;

    if (this.isFormSubmit) {
      return;
    }

    if (!this.verifyForm()) {
      return;
    }

    if (!isSave) {
      if (!this.verifyReviewForm()) {
        return;
      }
    }

    this.info.editUserId = this._user.id;
    if (this.review.expire) {
      this.review.expire = new Date(this.review.expire).format('yyyy-MM-dd');
    }
    this.review.userId = this._user.id;

    this.isFormSubmit = true;

    const infoHasChanged = this.utilsService.compareObj(this.info, this.infoOri);
    const authorHasChanged = this.utilsService.compareObj(this.author, this.authorOri);
    if (!infoHasChanged && !authorHasChanged) {
      this.showSnackBarMsg('数据未发生变化，不能提交');
      this.isFormSubmit = false;
      return;
    }

    this.manuscriptService
      .edit(this.info, this.author, (rsp: any) => {
        this.isFormSubmit = false;
        const rst = Number(this.utilsService.decryptByAES(rsp.data));

        if (rst === 0) {
          this.showSnackBarMsg('稿件保存失败，请稍后再试');
          this.isFormSubmit = false;
          return;
        }

        if (isSave && rst > 0) {
          this.showSnackBarMsg('稿件保存成功');
          this.goBack(2000);
          return;
        }

        this.manuscriptService
          .review(this.review, (rsp2: any) => {
            const rc = Number(this.utilsService.decryptByAES(rsp2.data));
            const msg = rc > 0 ? '评审成功' : '评审失败，请稍后再试';
            this.isFormSubmit = false;
            this.showSnackBarMsg(msg);
            if (rc > 0) {
              this.goBack(1000);
            }
          });

      }, (err: any) => {
        this.isFormSubmit = false;
      });

  }

  goBack(interval = 0): void {
    this.commonService.goBack(interval);
  }

  private verifyForm(): boolean {
    const msg = this.manuscriptService.verifyManuscriptForm(this.info, this.author);
    if (msg !== '') {
      this.showSnackBarMsg(msg);
      return false;
    }
    return true;
  }

  private verifyReviewForm(): boolean {

    if (typeof this.review.status === 'undefined') {
      this.showSnackBarMsg('请选择评审结论');
      return false;
    }

    if (this.review.status !== ManuscriptStatusEnum.Refused) {
      if (typeof this.review.file === 'undefined' || this.review.file === '') {
        const msg = this.review.status === ManuscriptStatusEnum.Stored ? '请上传终稿' : '请上传修改意见';
        this.showSnackBarMsg(msg);
        return false;
      }

      if (this.review.status === ManuscriptStatusEnum.Return) {
        if (typeof this.review.expire === 'undefined' || this.review.expire === '') {
          this.showSnackBarMsg('请选择完成修改期限');
          return false;
        }
      }

    }
    return true;
  }

  private showSnackBarMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

}
