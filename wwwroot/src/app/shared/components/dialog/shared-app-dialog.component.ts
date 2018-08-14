import { Component, OnInit, ViewEncapsulation, OnChanges, SimpleChange, ViewChild, ViewContainerRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfig } from '@app/models/ui';

import { ComponentLoadService } from '@app/service/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './shared-app-dialog.component.html',
  styleUrls: ['./shared-app-dialog.component.scss', './shared-app-dialog.component.theme.scss'],
  providers: [ComponentLoadService],
  encapsulation: ViewEncapsulation.None
})
export class SharedAppDialogComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('dynamicComponentContainer', {
    read: ViewContainerRef
  }) dynamicComponentContainer: ViewContainerRef;

  config: DialogConfig = new DialogConfig();

  html: SafeHtml;

  @Output()
  dialogInitialized = new EventEmitter<any>();
  @Output()
  dialogAfterViewInitEmitter = new EventEmitter<any>();

  private _this = this;

  private handledDynamicComponent = false;

  constructor(public dialogRef: MatDialogRef<SharedAppDialogComponent>,
    private componentLoadService: ComponentLoadService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.dialogInitialized.emit(this._this);

    this.handledDynamicComponent = false;
    this.initDynamicComponent();
    if (typeof this.config.data === 'string') {
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.config.data);
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    // console.log(this.config)

    this.initDynamicComponent();

  }

  ngAfterViewInit(): void {
    this.dialogAfterViewInitEmitter.emit(this._this);
  }

  confirm(): void {
    if (typeof this.config.onConfirm === 'undefined') {
      this.close(true);
      return;
    }

    this.config.onConfirm(this.dialogRef, this.config.data);
  }

  cancel(): void {
    if (typeof this.config.onCancel === 'undefined') {
      this.close(false);
      return;
    }

    this.config.onCancel(this.dialogRef);
  }

  private close(e: any): void {
    this.dialogRef.close(e);
  }

  private initDynamicComponent(): void {

    if (!this.handledDynamicComponent && this.config.useComponent && typeof this.config.component !== 'undefined') {

      const c = this.componentLoadService.loadComponent(this.dynamicComponentContainer, this.config.component, this.config.data, (e) => {
        if (typeof this.config.onDynamicComponentLoaded === 'function') {
          this.config.onDynamicComponentLoaded(e);
        }
      });

      this.handledDynamicComponent = true;

    }

  }

}
