import { Component, OnInit, AfterViewChecked, AfterViewInit, HostBinding } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { CommonService, EventAnnounceService } from '@app/service/common';
import { AppConfigService, PassportService, AppService } from '@app/service/app';
import { DialogService } from '@app/service/ui';

import { AppBaseComponent } from '@app/baseComponent';
import { User } from '@app/models';
import { Subject } from 'rxjs/Subject';

// import { fadeInAnimation } from './shared/_animations/bundle.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [PassportService, DialogService, CommonService, AppService],
  // animations: [fadeInAnimation]
})

export class AppComponent extends AppBaseComponent implements OnInit, AfterViewInit {

  // @HostBinding('@fadeInAnimation') fadeInAnimation;

  title = 'app';

  private hasOpenedDialog = false;

  constructor(private eventAnnounceService: EventAnnounceService,
    private appConfigService: AppConfigService,
    private appService: AppService,
    private commonService: CommonService,
    private dialogService: DialogService,
    private router: Router) {
    super();

    // this.routerEventSubscribe();
    this.eventSubscribe();

  }

  ngOnInit(): void {

  }

  private routerEventSubscribe(): void {

  }

  private eventSubscribe(): void {

    this.eventAnnounceService.eventConfirmed$.subscribe(
      param => {
        // console.log('param:', param);

        if (param.code < 0) {

          // this.commonService.componentLoaded();

          const errTips = param.desc ? (param.desc + '(' + param.code + ')') : 'server error';

          if (!this.hasOpenedDialog) {
            this.hasOpenedDialog = true;

            this.dialogService
              .openTipsDialog(errTips, 'Error')
              .subscribe(rsp => {
                // console.log(rsp);
                if (param.callback) {
                  param.callback();
                }
                this.hasOpenedDialog = false;
              });

          }

          return;
        }


      });

  }

}
