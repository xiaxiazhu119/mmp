import { Component, OnInit } from '@angular/core';

import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { PassportService, UserService, AppService, AppConfigService } from '@app/service/app';
import { DialogService } from '@app/service/ui';
import { AppPassportBaseComponent } from '@app/passportBaseComponent';
import { User } from '@app/models';
import { appRouteConfig } from '@app/routing';

@Component({
  selector: 'app-passport-sign-in',
  templateUrl: './passport-sign-in.component.html',
  styleUrls: ['./passport-sign-in.component.scss', './passport-sign-in.component.theme.scss'],
  providers: [CommonService, UserService, DialogService, AppService, ModelTransferService]
})
export class PassportSignInComponent extends AppPassportBaseComponent implements OnInit {

  user: User = new User();
  isSubmit = false;

  defaultSignInBtnTxt = '登录';

  signInBtnTxt = '';

  private _cmsHomePage = appRouteConfig.modules.cms.link;

  constructor(private commonService: CommonService,
    private passportService: PassportService,
    private modelTransferService: ModelTransferService,
    private userService: UserService,
    private dialogService: DialogService,
    private utilsService: UtilsService,
    private appService: AppService,
    private appConfigService: AppConfigService) {
    super();

  }

  ngOnInit(): void {

    this.signInBtnTxt = this.defaultSignInBtnTxt;
    this.commonService.componentLoaded();
  }

  signIn(): void {
    // this.commonService.routerNavigate(this._cmsHomePage);

    if (this.isSubmit) {
      return;
    }

    if (this.user.userName && this.user.pwdOri) {

      this.signInBtnTxt = '登录中...';

      this.user.pwd = this.utilsService.encryptByMD5(this.user.pwdOri);
      // console.log(this.user.pwd)

      this.isSubmit = true;

      this.userService
        .signIn(this.user, (data: any) => {

          const decryptData = this.utilsService.decryptByAES(data.data);

          if (decryptData === '') {
            this.resetSubmitBtn();
            return;
          }

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


  }

  goToSignUp(): void {

    this.commonService.routerNavigate('/passport/sign-up');

  }

  private resetSubmitBtn(): void {
    this.signInBtnTxt = this.defaultSignInBtnTxt;
    this.isSubmit = false;
  }



}
