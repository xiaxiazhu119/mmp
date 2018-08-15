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
    <a class="op-item normal" *ngIf="data.status === status.Pending" (click)="edit()">修改</a>
    <a class="op-item danger" *ngIf="data.status === status.Pending" (click)="cancel()">取消</a>
    <a class="op-item normal" *ngIf="data.status === status.Return" (click)="upload()">上传修改文档</a>
    <a class="op-item success" *ngIf="data.status === status.Stored && !data.isStored" (click)="confirm()">确认</a>
  </div>
  `,
  // styleUrls: ['./cms-manuscript-list.component.scss', './cms-manuscript-list.component.theme.scss'],
  providers: [CommonService, SnackBarService, DialogService]
})
export class ManuscriptListOperationComponent implements OnInit, OnChanges {

  @Input()
  data: ManuscriptListModel;
  @Output()
  operationEmitted = new EventEmitter<any>();

  status = ManuscriptStatusEnum;

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
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

  private operate(key: string): void {
    this.operationEmitted.emit({
      key: key,
      data: this.data
    });
  }

}
