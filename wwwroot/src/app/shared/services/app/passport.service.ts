import { Inject, Injectable } from '@angular/core';

import { AjaxService, CommonService, AppCookieService, CryptoJsService } from '@app/service/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { AppConfigService } from './app.config.service';

import { User, UserProfile } from '@app/models';

@Injectable()
export class PassportService {

  private userCookieKey: string;
  private userProfileCookieKey: string;
  private appConfig: any;

  readonly extAuthorityItemSeparator = '-';
  readonly extAuthorityKVSeparator = '|';

  private readonly extAuthorityKey = 'ext_a_';

  private _user = new Subject<User>();
  private _userProfile = new Subject<UserProfile>();

  constructor(private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private commonService: CommonService,
    private cryptoJsService: CryptoJsService) {

    this.appConfig = this.appConfigService.getConfig();
    this.userCookieKey = this.appConfig.cookies.keys.user;
    this.userProfileCookieKey = this.appConfig.cookies.keys.userProfileCookieKey;

  }

  signOut(url?: string): void {
    this.removeUserCookie();
    setTimeout(() => {
      this.commonService.routerNavigate(url || '/');
    }, this.appConfig.timer.halfSec);
  }

  getUserCookie(): User {
    return this.appCookieService.getObject(this.userCookieKey) as User || new User();
  }

  getUserProfileCookie(): UserProfile {
    return this.appCookieService.getObject(this.userProfileCookieKey) as UserProfile || new UserProfile();
  }

  putUserCookie(user: User): void {
    this.appCookieService.putObject(this.userCookieKey, user);
    this._user.next(user);
  }

  putUserProfileCookie(userProfile: UserProfile): void {
    this.appCookieService.putObject(this.userProfileCookieKey, userProfile);
    this._userProfile.next(userProfile);
  }

  removeUserCookie(): void {
    this.appCookieService.remove(this.userCookieKey);
  }

  updateUserTokenIdCookie(tokenId: string): void {
    const c = this.getUserCookie();
    c.tokenId = tokenId;
    this.putUserCookie(c);
  }

  checkSigned(): boolean {
    const user: User = this.getUserCookie();
    return typeof user !== 'undefined' && typeof user.tokenId !== 'undefined' && user.tokenId !== '';
  }

  getUserId(): number {
    return this.getUserCookie().id || 0;
  }

  onUserCookieChange(): Subject<User> {
    return this._user;
  }

  onUserProfileCookieChange(): Subject<UserProfile> {
    return this._userProfile;
  }

}
