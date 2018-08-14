import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/observable';

import { SharedAppDialogComponent } from '../../components/dialog/shared-app-dialog.component';
import { DialogConfig } from '@app/models/ui';

import { DialogBaseService } from './dialog-base.service';

@Injectable()
export class DialogService extends DialogBaseService {

  constructor(public dialog: MatDialog) {
    super(dialog);
  }

  public openTipsDialog(tips: string, title?: string): Observable<boolean> {

    return this.openDialog({ title: typeof title === 'undefined' ? '信息' : title, content: tips, confirmBtnTxt: '关闭', hasCancelBtn: false });

  }


  public openConfirmDialog(config: any, confirm?: any): Observable<boolean> {

    let cfg: DialogConfig = new DialogConfig();
    if (typeof config === 'string') {
      cfg.content = config;
    } else {
      cfg = Object.assign({}, config);
    }

    cfg.confirmBtnTxt = '确认';
    cfg.onConfirm = (dialogRef: any, data?: any) => {

      if (typeof confirm === 'function') {
        confirm(dialogRef, data);
      }

    };

    return this.openDialog(cfg);

  }

  public openDialog(config: any): Observable<boolean> {

    return this.openDialogBase<SharedAppDialogComponent>(config, SharedAppDialogComponent);

  }

}
