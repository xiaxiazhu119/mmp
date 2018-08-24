import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import '@app/interfaces';

import { AppService, PassportService, UserService, AreaService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { User, UserProfile } from '@app/models';
import { DialogConfig } from '@app/models/ui';


@Component({
  selector: 'app-cms-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss', './user-info.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, ModelTransferService, AreaService]
})
export class UserInfoComponent implements OnInit {

  @Input()
  user: User;
  @Input()
  profile: UserProfile;

  area: any;

  invalid = {
    name: '',
    mobile: '',
    email: '',
    companyName: '',
    companyAddress: '',
    companyZipCode: ''
  };

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private areaService: AreaService,
    private modelTransferService: ModelTransferService,
    private passportService: PassportService,
    private userService: UserService) {

  }

  ngOnInit(): void {

    this.user.id = Number(this.commonService.getParam('id') || this.passportService.getUserCookie().id);
    if (this.user.id === 0) {
      this.commonService.routerNavigate('/');
      return;
    }
    this.initUser();

  }

  onAreaChange(e: any): void {
    for (const k in e) {
      if (e.hasOwnProperty(k)) {
        const v = e[k];
        this.profile[k] = v;
      }
    }
  }

  private initUser(): void {
    this.userService
      .getInfo(this.user.id, (rsp: any) => {
        if (rsp.data) {
          const d = JSON.parse(this.utilsService.decryptByAES(rsp.data));
          this.user = this.utilsService.cloneObject(this.modelTransferService.transferUserModel(d.user), this.user);
          this.profile = this.utilsService.cloneObject(this.modelTransferService.transferUserProfileModel(d.profile), this.profile);
          this.area = {
            province: this.profile.province,
            provinceName: this.profile.provinceName,
            city: this.profile.city,
            cityName: this.profile.cityName,
            district: this.profile.district,
            districtName: this.profile.districtName
          };
        }
      });
  }

}
