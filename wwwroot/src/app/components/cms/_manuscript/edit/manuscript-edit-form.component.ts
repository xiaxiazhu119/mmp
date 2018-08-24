import { Component, OnChanges, OnInit, SimpleChange, Input, ViewChild } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel, ManuscriptReviewModel, User, UserProfile } from '@app/models';

import { ManuscriptStatusEnum, EnumClass, PermissionGroupEnum } from '@app/enums';

@Component({
  selector: 'app-cms-manuscript-edit-form',
  templateUrl: './manuscript-edit-form.component.html',
  styleUrls: ['./manuscript-edit-form.component.scss', './manuscript-edit-form.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AreaService, AppService, ManuscriptService, ModelTransferService]
})
export class ManuscriptEditFormComponent implements OnInit {

  @Input()
  isReview = false;

  @Input()
  info: ManuscriptInfoModel;
  @Input()
  infoOri: ManuscriptInfoModel;
  @Input()
  author: ManuscriptAuthorModel;
  @Input()
  authorOri: ManuscriptAuthorModel;
  @Input()
  review: ManuscriptReviewModel;


  // infoOri: ManuscriptInfoModel = new ManuscriptInfoModel();
  // authorOri: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  provinceList: any[] = [];
  cityList: any[] = [];
  districtList: any[] = [];
  categoryList: any[] = [];
  periodicalCategoryList: any[] = [];

  manuscriptUploadBtnTxt = '稿件上传';

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

    // this.info.file = '/upload/1/ecology_201808101439094518.sql';

    this.info.id = Number(this.commonService.getParam('id')) || 0;

    if (this.info.id === 0 && this.isReview) {
      this.commonService.routerNavigate('/cms');
      return;
    }

    this.initProvinceList();
    this.initSelfAuthorInfo();
    this.initCategoryList();
    this.initPeriodicalCategoryList();

    this.initData();

    if (this.isReview) {
      this.manuscriptUploadBtnTxt = '上传修改文档';
    }
    // console.log('id:', id);

  }

  //#region file

  onManuscriptFileUpload(e: any): void {
    // console.log('onfileupload:', e)
    if (e.code < 0) {
      this.showSnackBarMsg(e.desc);
    } else {
      if (e.data) {
        const filePath = this.utilsService.decryptByAES(e.data);
        // console.log(filePath)
        this.info.file = filePath;
        this.info.fileFullPath = this.appService.getFileFullPath(this.info.file);
        this.info.fileName = this.utilsService.getFileNameByPath(this.info.file);
      }
    }

  }

  delManuscript(): void {
    this.info.file = this.info.fileName = this.info.fileFullPath = '';
  }

  //#endregion

  //#region author-type status category periodical

  onAuthorTypeChange(e: any): void {
    // console.log(e);
    if (e.value) {
      if (!this.isReview) {
        this.initSelfAuthorInfo();
        this.initSelfAuthorAreaInfo();
      } else {
        this.userService
          .getInfo(this.info.userId, (rsp: any) => {
            console.log(rsp);
          });
      }
    } else {
      this.initOtherAuthor();
    }
  }

  onCategoryChange(e: any): void {
    this.info.categoryName = this.categoryList.filter((c: any) => c.id === this.info.category)[0].name;
  }

  onPeriodicalChange(e: any): void {
    this.info.periodicalCategoryName = this.periodicalCategoryList.filter((c: any) => c.id === this.info.periodicalCategory)[0].name;
  }

  //#endregion

  //#region area

  onProvinceChange(e: any, city?: number, district?: number): void {
    this.cityList = this.districtList = [];
    this.author.city = this.author.district = 0;
    // this.author.provinceName = e.target.selectedOptions[0].text;
    // console.log(e.value || e)
    this.author.provinceName = this.provinceList.filter((p: any) => p.id === this.author.province)[0].name;

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
    this.author.cityName = this.cityList.filter((c: any) => c.id === this.author.city)[0].name;

    // console.log('city change:', e, e.target.value);
    // const id = Number(e.target.value);

    this.getAreaList(e.value || e, (data: any) => {
      this.districtList = data;
      if (district) {
        this.author.district = district;
        this.author.districtName = this.districtList.filter((d: any) => d.id === this.author.district)[0].name;
      }
      // console.log('this.author.district:', this.author.district, this.districtList);
    });
  }

  onDistrictChange(e: any): void {
    this.author.districtName = this.districtList.filter((d: any) => d.id === this.author.district)[0].name;
  }

  //#endregion

  //#region private

  //#region author

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

  private initOtherAuthor(): void {
    this.author.name = this.author.tel = this.author.email = this.author.companyName = this.author.companyAddress = this.author.companyZipCode = '';
    this.author.province = this.author.city = this.author.district = 0;
    // console.log(this.authorOri)
    // if (this.info.id === 0) {
    //   this.author.name = this.author.tel = this.author.email = this.author.companyName = this.author.companyAddress = this.author.companyZipCode = '';
    //   this.author.province = this.author.city = this.author.district = 0;
    // } else {
    //   this.author = this.utilsService.cloneObject(this.modelTransferService.transferManuscriptAuthorModel(this.authorOri), this.author);
    //   this.onProvinceChange(this.author.province, this.author.city, this.author.district);
    //   console.log(this.authorOri, this.author)
    // }
  }

  //#endregion

  private initData(): void {
    this.info.userId = this.info.editUserId = this._user.id;
    if (this.info.id > 0) {
      this.manuscriptService
        .getInfo(this.info.id, (rsp: any) => {
          // console.log(data);
          if (rsp.data) {
            const d = JSON.parse(rsp.data);
            // this.info = Object.assign(this.info, this.modelTransferService.transferManuscriptInfoModel(d.info));
            // this.author = Object.assign(this.author, this.modelTransferService.transferManuscriptAuthorModel(d.author));
            this.info = this.utilsService.cloneObject(this.modelTransferService.transferManuscriptInfoModel(d.info), this.info);
            this.author = this.utilsService.cloneObject(this.modelTransferService.transferManuscriptAuthorModel(d.author), this.author);
            // console.log(this.info, this.author);

            if (this.info.file) {
              this.info.fileName = this.utilsService.getFileNameByPath(this.info.file);
              this.info.fileFullPath = this.appService.getFileFullPath(this.info.file);
            }

            this.infoOri = this.utilsService.cloneObject(this.info);
            this.authorOri = this.utilsService.cloneObject(this.author);
            this.onProvinceChange(this.author.province, this.author.city, this.author.district);
            // console.log(this.info, this.author);
          }
        });
    }
  }

  //#region area

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

  private getAreaList(pid: number, callback: any): void {
    this.areaService
      .getList(pid, (rsp: any) => {
        if (rsp.data) {
          const d = this.utilsService.decryptByAES(rsp.data);
          if (d !== '') {
            const o = JSON.parse(d);
            callback(o);
          }
        }
      });
  }

  //#endregion

  //#region category periodical-category

  private initCategoryList(): void {
    this.categoryList = EnumClass.getManuscriptCategoryList();
  }

  private initPeriodicalCategoryList(): void {
    this.periodicalCategoryList = EnumClass.getPeriodicalCategoryList();
  }

  //#endregion

  private showSnackBarMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

  //#endregion

}
