import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';

@Component({
  selector: 'app-cms-manuscript-edit-form',
  templateUrl: './manuscript-edit-form.component.html',
  styleUrls: ['./manuscript-edit-form.component.scss', './manuscript-edit-form.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AreaService, AppService, ManuscriptService, ModelTransferService]
})
export class ManuscriptEditFormComponent implements OnInit {

  info: ManuscriptInfoModel = new ManuscriptInfoModel();
  author: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  infoOri: ManuscriptInfoModel = new ManuscriptInfoModel();
  authorOri: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  isFormSubmit = false;
  isSubmitted = false;
  agreement: boolean;
  provinceList: any[] = [];
  cityList: any[] = [];
  districtList: any[] = [];
  categoryList: any[] = [];
  periodicalCategoryList: any[] = [];

  private _user: User;
  private _profile: UserProfile = new UserProfile();
  private _defaultAreaConfig;

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
    this._defaultAreaConfig = appService.getAppDefaultAreaConfig();
  }

  ngOnInit(): void {

    this.info.file = '/upload/1/ecology_201808101439094518.sql';

    this.info.id = Number(this.commonService.getParam('id')) || 0;

    this.initProvinceList();
    this.initSelfAuthorInfo();
    this.initCategoryList();
    this.initPeriodicalCategoryList();

    this.initData();
    // console.log('id:', id);

  }

  onFileUpload(e: any): void {
    // console.log('onfileupload:', e)
    if (e.code < 0) {
      this.showSnackBarMsg(e.desc);
    } else {
      if (e.data) {
        const filePath = this.utilsService.decryptByAES(e.data);
        // console.log(filePath)
        this.info.file = filePath;
      }
    }

  }

  delAttachment(): void {

  }

  onAuthorTypeChange(e: any): void {
    // console.log(e);
    if (e.value) {
      this.initSelfAuthorInfo();
      this.initSelfAuthorAreaInfo();
    } else {
      this.author = new ManuscriptAuthorModel();
    }
  }

  submit(): void {

    if (this.isFormSubmit) {
      return;
    }

    if (!this.verifyForm()) {
      return;
    }

    this.isFormSubmit = true;

    // console.log(this.info);
    // console.log(this.author);

    if (this.info.id > 0) {
      const infoHasChanged = this.utilsService.compareObj(this.info, this.infoOri);
      const authorHasChanged = this.utilsService.compareObj(this.author, this.authorOri);
      if (!infoHasChanged && !authorHasChanged) {
        this.showSnackBarMsg('数据未发生变化，不能提交');
        this.isFormSubmit = false;
        return;
      }
    }

    this.info.categoryName = this.categoryList.filter((c: any) => c.id === this.info.category)[0].name;
    if (this.info.isPublished) {
      this.info.periodicalCategoryName = this.periodicalCategoryList.filter((c: any) => c.id === this.info.periodicalCategory)[0].name;
    }

    if (!this.info.isSelf) {
      this.author.provinceName = this.provinceList.filter((p: any) => p.id === this.author.province)[0].name;
      this.author.cityName = this.cityList.filter((c: any) => c.id === this.author.city)[0].name;
      this.author.districtName = this.districtList.filter((d: any) => d.id === this.author.district)[0].name;
    }

    this.info.status = this._user.permissionGroup === PermissionGroupEnum.Director ? ManuscriptStatusEnum.Stored : ManuscriptStatusEnum.Pending;

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
        // const msg = this.info.id > 0 ? '投稿编辑成功' : (id > 0 ? '投稿成功，请等待评审结果' : '投稿失败');
        this.showSnackBarMsg(msg);

        if (id > 0 && this.info.id === 0) {
          this.info = new ManuscriptInfoModel();
          this.author = new ManuscriptAuthorModel();
        }

        // console.log('id:', id);

      }, (err: any) => {
        // console.log(err);
        this.isFormSubmit = false;
      });

  }

  onProvinceChange(e: any, city?: number, district?: number): void {
    this.cityList = this.districtList = [];
    this.author.city = this.author.district = 0;
    // this.author.provinceName = e.target.selectedOptions[0].text;
    // console.log(e.value || e)

    this.getAreaList(e.value || e, (data: any) => {
      this.cityList = data;
      if (city) {
        this.author.city = city;
        this.onCityChange(city, district);
      }
    });
  }

  onCityChange(e: any, district?: number): void {
    this.districtList = [];
    this.author.district = 0;
    // this.author.cityName = e.target.selectedOptions[0].text;

    // console.log('city change:', e, e.target.value);
    // const id = Number(e.target.value);

    this.getAreaList(e.value || e, (data: any) => {
      this.districtList = data;
      if (district) {
        this.author.district = district;
      }
      // console.log('this.author.district:', this.author.district, this.districtList);
    });
  }

  private initSelfAuthorInfo(): void {
    this.author.name = this._profile.name;
    this.author.tel = this._profile.mobile;
    this.author.email = this._profile.email;
    this.author.companyName = this._profile.companyName;
    this.author.companyAddress = this._profile.companyAddress;
    this.author.companyZipCode = this._profile.companyZipCode;
  }

  private initSelfAuthorAreaInfo(): void {
    this.author.province = this._profile.province;
    this.onProvinceChange(this.author.province, this._profile.city, this._profile.district);
  }

  private initData(): void {
    if (this.info.id > 0) {
      this.manuscriptService
        .info(this.info.id, (data: any) => {
          // console.log(data);
          if (data.data) {
            const d = JSON.parse(data.data);
            this.infoOri = this.modelTransferService.transferManuscriptInfoModel(d.info);
            this.authorOri = this.modelTransferService.transferManuscriptAuthorModel(d.author);
            this.info = this.utilsService.cloneObject(this.infoOri);
            this.author = this.utilsService.cloneObject(this.authorOri);
            this.onProvinceChange(this.authorOri.province, this.authorOri.city, this.authorOri.district);
            // console.log(this.info, this.author);
          }
        });
    }
  }

  private initProvinceList(): void {
    const c = (data: any) => {
      // console.log(data, typeof data);
      this.provinceList = data;
      if (this.info.id === 0) {
        // this.author.city = this._profile.city;
        // this.author.district = this._profile.district;
        this.initSelfAuthorAreaInfo();
      }
    };
    this.getAreaList(this._defaultAreaConfig.countryCode, c);
  }

  private initCategoryList(): void {
    this.categoryList = EnumClass.getManuscriptCategoryList();
  }

  private initPeriodicalCategoryList(): void {
    this.periodicalCategoryList = EnumClass.getPeriodicalCategoryList();
  }

  private getAreaList(pid: number, callback: any): void {
    this.areaService
      .list(pid, (data: any) => {
        if (data.data) {
          const d = this.utilsService.decryptByAES(data.data);
          if (d !== '') {
            const o = JSON.parse(d);
            callback(o);
          }
        }
      });
  }

  private verifyForm(): boolean {
    if (this.info.title === '') {
      this.showSnackBarMsg('请填写文章标题');
      return false;
    }
    if (this.info.keywords === '') {
      this.showSnackBarMsg('请填写关键字');
      return false;
    }
    if (typeof (this.info.category) === 'undefined') {
      this.showSnackBarMsg('请选择拟投栏目');
      return false;
    }
    if (this.info.file === '') {
      this.showSnackBarMsg('请上传稿件文档');
      return false;
    }
    if (typeof (this.info.isPublished) === 'undefined') {
      this.showSnackBarMsg('请选择是否已公开发表');
      return false;
    }
    if (this.info.isPublished) {
      if (typeof (this.info.periodicalCategory) === 'undefined') {
        this.showSnackBarMsg('请选择期刊栏目');
        return false;
      }
      if (this.info.periodicalSummary === '') {
        this.showSnackBarMsg('请填写期刊名、刊号等情况说明');
        return false;
      }
    }
    if (!this.info.isSelf) {
      if (typeof (this.author.province) === 'undefined' || typeof (this.author.province) === 'undefined' || typeof (this.author.province) === 'undefined') {
        this.showSnackBarMsg('请选择地区');
        return false;
      }
      if (this.author.name === '') {
        this.showSnackBarMsg('请填写作者姓名');
        return false;
      }
      if (this.author.tel === '') {
        this.showSnackBarMsg('请填写作者电话');
        return false;
      }
      if (this.author.email === '') {
        this.showSnackBarMsg('请填写作者邮箱');
        return false;
      }
      if (this.author.companyName === '') {
        this.showSnackBarMsg('请填写作者单位');
        return false;
      }
      if (this.author.companyAddress === '') {
        this.showSnackBarMsg('请填写作者单位地址');
        return false;
      }
      if (this.author.companyZipCode === '') {
        this.showSnackBarMsg('请填写作者单位邮编');
        return false;
      }
    }
    return true;
  }

  private showSnackBarMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

}