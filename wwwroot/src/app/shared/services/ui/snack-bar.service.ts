import {Injectable} from '@angular/core';

import {MatSnackBar} from '@angular/material';
import {SnackBarConfig} from '@app/models/ui';

@Injectable()
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) {
  }

  open(config: any): void {

    let _default = new SnackBarConfig();

    const _t = typeof config;

    switch (_t) {
      case 'string':
        _default.msg = config;
        break;
      case 'object':
        _default = Object.assign(_default, config);
        break;
    }

    this.matSnackBar.open(_default.msg, _default.action, {
      duration: _default.duration,
      extraClasses: _default.extraClasses
    });

  }


}
