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
  selector: 'app-cms-user-profile-info',
  templateUrl: './cms-user-profile-info.component.html',
  styleUrls: ['./cms-user-profile-info.component.scss', './cms-user-profile-info.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService]
})
export class CmsUserProfileInfoComponent extends AppCmsBaseComponent implements OnInit {


  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private userService: UserService) {
    super();

  }

  ngOnInit(): void {
  }

}
