import { Component, OnChanges, OnInit, SimpleChange, Input, Output, EventEmitter } from '@angular/core';

import { DialogService, SnackBarService } from '@app/service/ui';
import { CommonService, UtilsService, ModelTransferService } from '@app/service/common';
import { ManuscriptListModel } from '@app/models';
import { DialogConfig } from '@app/models/ui';
import { ManuscriptStatusEnum } from '@app/enums';

@Component({
  selector: 'app-cms-manuscript-list-operation',
  template: `
  <div class="app-operation-container">
    <a class="op-item normal" (click)="view()">查看</a>
    <a class="op-item normal" *ngIf="canEdit" (click)="edit()">修改</a>
    <a class="op-item danger" *ngIf="canCancel" (click)="cancel()">取消</a>
    <a class="op-item success" *ngIf="canConfirm" (click)="confirm()">确认</a>
    <a class="op-item success" *ngIf="canReview" (click)="review()">评审</a>
  </div>
  `,
  // styleUrls: ['./cms-manuscript-list.component.scss', './cms-manuscript-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, DialogService]
})
export class ManuscriptListOperationComponent implements OnInit, OnChanges {

  @Input()
  data: ManuscriptListModel;
  @Input()
  permissions: any;
  @Output()
  operationEmitted = new EventEmitter<any>();

  status = ManuscriptStatusEnum;

  canEdit = false;
  canCancel = false;
  canConfirm = false;
  canReview = false;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.checkPermissions();
  }

  //#region operation

  view(): void {
    this.operate('view');
  }

  edit(): void {
    this.operate('edit');
  }

  cancel(): void {
    this.operate('cancel');
  }

  upload(): void {
    this.operate('upload');
  }

  confirm(): void {
    this.operate('confirm');
  }

  review(): void {
    this.operate('review');
  }

  //#endregion

  private operate(key: string): void {
    this.operationEmitted.emit({
      key: key,
      data: this.data
    });
  }

  private checkPermissions(): void {
    this.canEdit = this.permissions.canEdit && (this.data.status === ManuscriptStatusEnum.Pending || this.data.status === ManuscriptStatusEnum.Return);
    this.canCancel = this.permissions.canCancel && (this.data.status === ManuscriptStatusEnum.Pending);
    this.canConfirm = this.permissions.canConfirm && (this.data.status === ManuscriptStatusEnum.Stored && !this.data.isStored);
    this.canReview = this.permissions.canReview && (this.data.status === ManuscriptStatusEnum.Pending);
  }


}
