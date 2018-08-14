import { Injectable, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/observable';

import { DialogConfig } from '@app/models/ui';

@Injectable()
export class DialogBaseService {

  constructor(public dialog: MatDialog) {
  }

  public openDialogBase<T>(config: any, component: any): any {


    const _default = new DialogConfig(),
      _t = typeof config,
      _st = typeof config.styleConfig;

    switch (_t) {
      case 'string':
        _default.content = config;

        config = _default;
        break;
      case 'object':
        config = Object.assign(_default, config);
        break;
    }

    // console.log('dialog config:', config)

    let dialogRef: MatDialogRef<T>;

    dialogRef = this.dialog.open(component, config);

    dialogRef.componentInstance['config'] = config;

    if (config.data) {
      dialogRef.componentInstance['data'] = config.data;
    }

    if (dialogRef.componentInstance.hasOwnProperty('onInit')) {
      dialogRef.componentInstance['onInit'].subscribe((e: any) => {
        if (typeof config.onInit === 'function') {
          config.onInit(dialogRef, e);
        }
        // console.log('dialog on init emitter:', e);
      });
    }

    if (dialogRef.componentInstance.hasOwnProperty('confirmed')) {
      dialogRef.componentInstance['confirmed'].subscribe((e: any) => {
        if (typeof config.onConfirm === 'function') {
          config.onConfirm(dialogRef, e);
        }
        // console.log('dialog on init emitter:', e);
      });
    }

    if (dialogRef.componentInstance.hasOwnProperty('canceled')) {
      dialogRef.componentInstance['canceled'].subscribe((e: any) => {
        if (typeof config.onCancel === 'function') {
          config.onCancel(dialogRef, e);
        }
        // console.log('dialog on init emitter:', e);
      });
    }


    return dialogRef.afterClosed();
  }

}

export interface DynamicDialogComponentInterface {
  data: any;
  inited: EventEmitter<any>;
  confirmed: EventEmitter<any>;
  canceled: EventEmitter<any>;
}
