
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, NavigationError, Router, RouterEvent } from '@angular/router';

import { appRouteConfig } from '@app/routing';

@Injectable()
export class AppRoutingService {

  constructor() {
  }

  getRouteConfig(): any {
    return appRouteConfig;
  }

  getCmsRouteConfig(): any {
    return appRouteConfig.modules.cms;
  }

  subscribeRouterEvents(router: Router, onNavigationStart: any, onNavigationEnd: any): any {

    return router.events.subscribe((event: RouterEvent) => {

      if (event instanceof NavigationStart) {
        if (typeof (onNavigationStart) !== 'undefined') {
          onNavigationStart(event);
        }
      }

      if (event instanceof NavigationEnd) {
        if (typeof (onNavigationEnd) !== 'undefined') {
          onNavigationEnd(event);
        }
      }

      if (event instanceof NavigationError) {
        console.log(event.error);
      }

    });
  }

  getRouterModuleByUrl(url: string): any {
    const keys = url.split('/');
    let routerModule = this.getRouteConfig();
    for (let i = 0, j = keys.length; i < j; i++) {
      const key = keys[i];
      if (key === '' || !isNaN(Number(key))) {
        continue;
      }
      routerModule = routerModule.modules[key];
    }
    return routerModule;
  }


}
