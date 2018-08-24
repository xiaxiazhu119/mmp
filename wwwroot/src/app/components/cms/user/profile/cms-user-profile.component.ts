import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import '@app/interfaces';

import { AppService, PassportService, UserService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService } from '@app/service/common';
import { User, UserProfile } from '@app/models';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-user-profile',
  templateUrl: './cms-user-profile.component.html',
  styleUrls: ['./cms-user-profile.component.scss', './cms-user-profile.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService]
})
export class CmsUserProfileComponent extends AppCmsBaseComponent implements OnInit {

  user: User = new User();
  profile: UserProfile = new UserProfile();

  isSubmit = false;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private userService: UserService) {
    super();

  }

  ngOnInit(): void {
  }

  save(): void {
    // console.log(this.user)
    // console.log(this.profile)

    if (this.isSubmit) {
      return;
    }

    const verifyProfileMsg = this.userService.verifyProfile(this.profile);
    if (verifyProfileMsg !== '') {
      this.snackBarService.open(verifyProfileMsg);
      return;
    }

    this.isSubmit = true;

    this.userService
      .updateProfile(this.profile, (rsp: any) => {
        let msg = '更新失败，请稍后再试';
        if (rsp.data && Number(rsp.data) > 0) {
          msg = '更新成功';
          this.passportService.putUserProfileCookie(this.profile);
        }
        this.snackBarService.open(msg);
        this.isSubmit = false;
      }, (err: any) => {
        this.isSubmit = false;
      });

  }

}
