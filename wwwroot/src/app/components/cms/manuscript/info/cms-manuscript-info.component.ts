import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService } from '@app/service/common';
import { KeyValuePair } from '@app/models';
import { DialogConfig } from '@app/models/ui';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-manuscript-info',
  templateUrl: './cms-manuscript-info.component.html',
  styleUrls: ['./cms-manuscript-info.component.scss', './cms-manuscript-info.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService]
})
export class CmsManuscriptInfoComponent extends AppCmsBaseComponent implements OnInit {


  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private passportService: PassportService,
    private userService: UserService) {
    super();

  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.commonService.goBack();
  }

}
