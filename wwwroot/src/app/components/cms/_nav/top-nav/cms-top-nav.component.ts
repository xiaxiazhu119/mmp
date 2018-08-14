import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {appRouteConfig} from '@app/routing';

import {CommonService} from '@app/service/common';

import {User} from '@app/models';

@Component({
  selector: 'app-cms-top-nav',
  templateUrl: './cms-top-nav.component.html',
  styleUrls: ['./cms-top-nav.component.scss'],
  providers: []
})
export class CmsTopNavComponent implements OnInit {

  @Input()
  user: User = new User();

  @Output()
  signOuted = new EventEmitter<any>();

  private userModule: any;

  constructor(private commonService: CommonService) {
    // this.userModule = appRouteConfig.modules.user;
  }

  ngOnInit(): void {
  }

  goToProfile(): void {
    // this.commonService.routerNavigate(this.userModule.modules.profile.link);
  }

  editPwd(): void {
    this.commonService.routerNavigate(appRouteConfig.modules.cms.modules.user.modules.profile.modules.pwd.link);
  }

  signOut(): void {
    this.signOuted.emit();
  }

}
