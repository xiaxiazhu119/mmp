import { Injectable } from '@angular/core';
import { KeyValuePair } from '@app/models';


import { CommonService } from '@app/service/common';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  constructor(private commonService: CommonService) {
  }

  getAppDefaultAreaConfig(): any {
    return {
      countryCode: 86,
      province: {
        id: 310000,
        name: '上海市'
      },
      city: {
        id: 310100,
        name: '上海市'
      }
    };
  }

  getEnumStr(enums: any, key: number): string {
    return enums[key].toString().toLocaleLowerCase();
  }

  initTabInkBar(tabGroup: any): void {
    const t = setInterval(() => {
      if (typeof tabGroup !== 'undefined') {
        const labelWidth = tabGroup._elementRef.nativeElement.querySelectorAll('.mat-tab-label')[0].offsetWidth;
        if (labelWidth > 0) {
          tabGroup._elementRef.nativeElement.querySelector('.mat-ink-bar').style.width = tabGroup._elementRef.nativeElement.querySelectorAll('.mat-tab-label')[0].offsetWidth + 'px';
          clearInterval(t);
        }
      }
    }, 500);
  }

}
