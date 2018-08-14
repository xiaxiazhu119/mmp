import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import '@app/interfaces';

import { AppService, PassportService, UserService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService } from '@app/service/common';
import { User, KeyValuePair, UserPwd } from '@app/models';
import { DialogConfig } from '@app/models/ui';
import { appRouteConfig } from '@app/routing';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-user-profile-pwd',
  templateUrl: './cms-user-profile-pwd.component.html',
  styleUrls: ['./cms-user-profile-pwd.component.scss', './cms-user-profile-pwd.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService]
})
export class CmsUserProfilePwdComponent extends AppCmsBaseComponent implements OnInit {

  up: UserPwd = new UserPwd();

  invalid: any = {};

  si: any = {
    op: false,
    np: false,
    cp: false
  };

  isSubmit = false;

  private user: User = new User();

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private userService: UserService) {
    super();

    this.user = passportService.getUserCookie();

  }

  ngOnInit(): void {
  }

  savePwd(): void {

    const verify = this.validateForm();
    if (!verify) {
      this.isSubmit = false;
      return;
    }

    this.isSubmit = true;

    const pwd = this.utilsService.encryptByMD5(this.up.originalPwd);
    const newPwd = this.utilsService.encryptByMD5(this.up.newPwd);
    const d = { data: pwd + '_' + newPwd };

    this.userService
      .updatePwd(d, (res) => {

        this.isSubmit = false;
        this.snackBarService.open('更新成功');
        this.up = new UserPwd();

      }, () => {
        this.isSubmit = false;
        // this.snackBarService.open('更新失败');
      });

  }

  switchIpt(key: string): void {
    this.si[key] = !this.si[key];
  }

  private validateForm(): boolean {
    if (typeof this.up.originalPwd === 'undefined' || this.up.originalPwd.trim() === '') {
      this.invalid.originalPwd = '请输入原密码';
      return false;
    }
    this.invalid.originalPwd = '';

    if (typeof this.up.newPwd === 'undefined' || this.up.newPwd.trim() === '') {
      this.invalid.newPwd = '请输入新密码';
      return false;
    }
    this.invalid.newPwd = '';

    if (typeof this.up.confirmPwd === 'undefined' || this.up.confirmPwd.trim() === '') {
      this.invalid.confirmPwd = '请输入确认密码';
      return false;
    }
    this.invalid.confirmPwd = '';

    if (this.up.confirmPwd !== this.up.newPwd) {
      this.invalid.confirmPwd = '新密码与确认密码不一致';
      return false;
    }
    this.invalid.confirmPwd = '';

    return true;
  }

}
