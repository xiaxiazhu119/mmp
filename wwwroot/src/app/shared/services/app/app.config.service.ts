import { Injectable } from '@angular/core';

import { appConfig } from '@app/config';

@Injectable()
export class AppConfigService {

  constructor() {
  }

  getConfig(): any {
    return appConfig;
  }

  getApiDomain(): string {
    return this.getConfig().domain;
  }

}
