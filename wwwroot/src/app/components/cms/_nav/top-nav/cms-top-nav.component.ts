import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AppRoutingService } from '@app/service/app';

import { CommonService } from '@app/service/common';

import { User } from '@app/models';

@Component({
  selector: 'app-cms-top-nav',
  templateUrl: './cms-top-nav.component.html',
  styleUrls: ['./cms-top-nav.component.scss'],
  providers: [AppRoutingService]
})
export class CmsTopNavComponent implements OnInit {

  @Input()
  user: User = new User();

  @Output()
  signOuted = new EventEmitter<any>();

  private userModule: any;

  constructor(private commonService: CommonService, private appRoutingService: AppRoutingService) {
    const appRouteConfig = appRoutingService.getCmsRouteConfig();
    this.userModule = appRouteConfig.modules.user;
  }

  ngOnInit(): void {
  }

  goToProfile(): void {
    this.commonService.routerNavigate(this.userModule.modules.profile.link);
  }

  editPwd(): void {
    this.commonService.routerNavigate(this.userModule.modules.pwd.link);
  }

  signOut(): void {
    this.signOuted.emit();
  }

}
