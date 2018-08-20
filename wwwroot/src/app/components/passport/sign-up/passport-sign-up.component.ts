import { Component, OnInit } from '@angular/core';

import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { PassportService, UserService, AppService, AppConfigService, AreaService } from '@app/service/app';
import { DialogService, SnackBarService } from '@app/service/ui';
import { AppPassportBaseComponent } from '@app/passportBaseComponent';
import { User, UserProfile } from '@app/models';
import { appRouteConfig } from '@app/routing';

@Component({
  selector: 'app-passport-sign-up',
  templateUrl: './passport-sign-up.component.html',
  styleUrls: ['./passport-sign-up.component.scss', './passport-sign-up.component.theme.scss'],
  providers: [CommonService, UserService, DialogService, SnackBarService, AppService, ModelTransferService, AreaService]
})
export class PassportSignUpComponent extends AppPassportBaseComponent implements OnInit {

  user: User = new User();
  userProfile: UserProfile = new UserProfile();
  isSubmit = false;

  pwd = '';
  confirmPwd = '';

  defaultSignUpBtnTxt = '注册';
  signUpBtnTxt = '';

  provinceList: any[] = [];
  cityList: any[] = [];
  districtList: any[] = [];

  private _cmsHomePage = appRouteConfig.modules.cms.link;
  private _defaultAreaConfig;

  constructor(private commonService: CommonService,
    private passportService: PassportService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private utilsService: UtilsService,
    private appService: AppService,
    private areaService: AreaService,
    private appConfigService: AppConfigService) {
    super();

    this._defaultAreaConfig = appService.getAppDefaultAreaConfig();

  }

  ngOnInit(): void {

    this.signUpBtnTxt = this.defaultSignUpBtnTxt;
    this.initProvinceList();

    this.commonService.componentLoaded();
  }

  signUp(): void {

    if (this.isSubmit) {
      return;
    }

    if (!this.verifyForm()) { return; }

    this.user.pwd = this.utilsService.encryptByMD5(this.pwd);

    this.isSubmit = true;

    this.userService
      .signUp(this.user, this.userProfile, (data: any) => {

        const decryptData = this.utilsService.decryptByAES(data.data);

        if (decryptData === '') {
          this.resetSubmitBtn();
          return;
        }
        // console.log(decryptData);

        const obj = JSON.parse(decryptData);
        const _user = this.modelTransferService.transferUserModel(obj['user']);
        const _userProfile = this.modelTransferService.transferUserProfileModel(obj['profile']);
        console.log('o & u & p:', obj, _user, _userProfile);
        this.passportService.putUserCookie(_user);
        this.passportService.putUserProfileCookie(_userProfile);

        this.resetSubmitBtn();
        // this.appService.goToAdminDashboard();

        this.commonService.routerNavigate(this._cmsHomePage);

      }, (data) => {
        // console.log('sign-in rst:', data);
        this.resetSubmitBtn();
      });

  }

  goToSignIn(): void {
    this.commonService.routerNavigate('/passport/sign-in');
  }

  //#region area event

  onProvinceChange(e: any): void {
    this.cityList = this.districtList = [];
    this.userProfile.city = this.userProfile.district = 0;

    const useDefault = typeof e === 'number';
    let id = 0, name = '';
    if (useDefault) {
      id = e;
      name = this._defaultAreaConfig.province.name;
    } else {
      name = e.target.selectedOptions[0].text;
      id = Number(e.target.value);
    }
    this.userProfile.provinceName = name;

    this.getAreaList(id, (data: any) => {
      this.cityList = data;
      if (useDefault) {
        this.userProfile.city = this._defaultAreaConfig.city.id;
        this.onCityChange(this.userProfile.city);
      }
    });
  }

  onCityChange(e: any): void {
    this.districtList = [];
    this.userProfile.district = 0;

    let id = 0, name = '';
    if (typeof e === 'number') {
      id = e;
      name = this._defaultAreaConfig.city.name;
    } else {
      name = e.target.selectedOptions[0].text;
      id = Number(e.target.value);
    }
    this.userProfile.cityName = name;

    this.getAreaList(id, (data: any) => {
      this.districtList = data;
    });
  }

  onDistrictChange(e: any): void {
    this.userProfile.districtName = e.target.selectedOptions[0].text;
  }

  //#endregion

  private resetSubmitBtn() {
    this.signUpBtnTxt = this.defaultSignUpBtnTxt;
    this.isSubmit = false;
  }

  private verifyForm(): boolean {

    // console.log(this.user, this.userProfile);

    if (!this.user.userName) {
      this.snackBarService.open('请填写用户名');
      return false;
    }

    if (!this.pwd) {
      this.snackBarService.open('请填写密码');
      return false;
    }

    if (!this.confirmPwd) {
      this.snackBarService.open('请填写密码');
      return false;
    }

    if (this.pwd !== this.confirmPwd) {
      this.snackBarService.open('密码与确认密码不一致');
      return false;
    }

    if (!this.userProfile.name) {
      this.snackBarService.open('请填写真实姓名');
      return false;
    }

    if (!this.userProfile.mobile) {
      this.snackBarService.open('请填写手机号码');
      return false;
    }

    if (!this.userProfile.email) {
      this.snackBarService.open('请填写电子邮件');
      return false;
    }

    if (this.userProfile.province === 0) {
      this.snackBarService.open('请选择省/直辖市信息');
      return false;
    }

    if (this.userProfile.city === 0) {
      this.snackBarService.open('请选择市信息');
      return false;
    }

    if (this.userProfile.district === 0) {
      this.snackBarService.open('请选择区信息');
      return false;
    }

    if (!this.userProfile.companyName) {
      this.snackBarService.open('请填写单位名称');
      return false;
    }

    if (!this.userProfile.companyAddress) {
      this.snackBarService.open('请填写单位地址');
      return false;
    }

    if (!this.userProfile.companyZipCode) {
      this.snackBarService.open('请填写单位邮编');
      return false;
    }

    return true;

  }

  private initProvinceList(): void {
    const c = (data: any) => {
      // console.log(data, typeof data);
      this.provinceList = data;
      this.userProfile.province = this._defaultAreaConfig.province.id;
      this.onProvinceChange(this.userProfile.province);
    };
    this.getAreaList(this._defaultAreaConfig.countryCode, c);
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

}
