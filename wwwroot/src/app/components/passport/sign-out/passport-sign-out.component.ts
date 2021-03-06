import { Component, OnInit } from '@angular/core';

import { AppPassportBaseComponent } from '@app/passportBaseComponent';
import { CommonService } from '@app/service/common';
import { DialogService } from '@app/service/ui';

@Component({
  selector: 'app-passport-sign-out',
  templateUrl: './passport-sign-out.component.html',
  providers: []
})
export class PassportSignOutComponent extends AppPassportBaseComponent implements OnInit {

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
