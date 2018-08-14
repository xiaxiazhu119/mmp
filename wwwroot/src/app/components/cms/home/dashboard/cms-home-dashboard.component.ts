import { Component, OnInit } from '@angular/core';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { CommonService } from '@app/service/common';
import { DialogService } from '@app/service/ui';

@Component({
  selector: 'app-cms-home-dashboard',
  templateUrl: './cms-home-dashboard.component.html',
  providers: []
})
export class CmsHomeDashboardComponent extends AppCmsBaseComponent implements OnInit {

  constructor(private commonService: CommonService,
    private dialogService: DialogService) {
    super();


    this.commonService.componentLoaded();
  }

  ngOnInit(): void {


  }

  goToSignIn(): void {
    this.commonService.routerNavigate('/web/passport/sign-in');
  }

  goToWeb(): void {
    this.commonService.routerNavigate('/');
  }

}
