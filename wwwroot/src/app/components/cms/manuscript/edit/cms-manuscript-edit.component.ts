import { Component, OnChanges, OnInit, SimpleChange, Input, ViewEncapsulation } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptReviewModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';
import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-manuscript-edit',
  templateUrl: './cms-manuscript-edit.component.html',
  styleUrls: ['./cms-manuscript-edit.component.scss', './cms-manuscript-edit.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AreaService, AppService, ManuscriptService, ModelTransferService],
  encapsulation: ViewEncapsulation.None
})
export class CmsManuscriptEditComponent extends AppCmsBaseComponent implements OnInit {

  info: ManuscriptInfoModel = new ManuscriptInfoModel();
  author: ManuscriptAuthorModel = new ManuscriptAuthorModel();
  infoOri: ManuscriptInfoModel = new ManuscriptInfoModel();
  authorOri: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  isFormSubmit = false;
  isSubmitted = false;
  agreement: boolean;

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
  }

  ngOnInit(): void {

  }

  submit(): void {
    console.log(this.info);
    console.log(this.author);

    if (this.isFormSubmit) {
      return;
    }

    if (!this.verifyForm()) {
      return;
    }

    this.isFormSubmit = true;

    // console.log(this.info);
    // console.log(this.author);

    this.info.editUserId = this._user.id;

    if (this.info.id > 0) {
      const infoHasChanged = this.utilsService.compareObj(this.info, this.infoOri);
      const authorHasChanged = this.utilsService.compareObj(this.author, this.authorOri);
      if (!infoHasChanged && !authorHasChanged) {
        this.showSnackBarMsg('数据未发生变化，不能提交');
        this.isFormSubmit = false;
        return;
      }
    }

    // this.info.categoryName = this.categoryList.filter((c: any) => c.id === this.info.category)[0].name;
    // if (this.info.isPublished) {
    //   this.info.periodicalCategoryName = this.periodicalCategoryList.filter((c: any) => c.id === this.info.periodicalCategory)[0].name;
    // }

    // if (!this.info.isSelf) {
    //   this.author.provinceName = this.provinceList.filter((p: any) => p.id === this.author.province)[0].name;
    //   this.author.cityName = this.cityList.filter((c: any) => c.id === this.author.city)[0].name;
    //   this.author.districtName = this.districtList.filter((d: any) => d.id === this.author.district)[0].name;
    // }

    // this.info.status = this._user.permissionGroup === PermissionGroupEnum.Director ? ManuscriptStatusEnum.Stored : ManuscriptStatusEnum.Pending;

    this.manuscriptService
      .edit(this.info, this.author, (data: any) => {
        this.isFormSubmit = false;
        const id = Number(this.utilsService.decryptByAES(data.data));

        let msg = '';
        if (id > 0) {
          msg = this.info.id > 0 ? '投稿编辑成功' : '投稿成功，请等待评审结果';
          setTimeout(() => {
            this.goBack();
          }, 2000);
        } else {
          msg = this.info.id > 0 ? '编辑失败' : '投稿失败';
        }
        // const msg = this.info.id > 0 ? '投稿编辑成功' : (id > 0 ? '投稿成功，请等待评审结果' : '投稿失败');
        this.showSnackBarMsg(msg);

        // if (id > 0 && this.info.id === 0) {
        //   this.info = new ManuscriptInfoModel();
        //   this.author = new ManuscriptAuthorModel();
        // }

        // console.log('id:', id);

      }, (err: any) => {
        // console.log(err);
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
