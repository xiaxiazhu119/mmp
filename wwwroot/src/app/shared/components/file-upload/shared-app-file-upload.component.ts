import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewEncapsulation } from '@angular/core';
import { AppFileUploadConfig } from '@app/models/ui';
import { CommonService, UtilsService } from '@app/service/common';
import { PassportService, AppConfigService } from '@app/service/app';

@Component({
  selector: 'app-file-upload',
  template: `
    <span class="file-upload-container btn-upload">
      <button id="project-attachment" mat-raised-button class="mat-bs-primary-btn" [disabled]="disabled">{{btnTxt}}</button>
      <app-file-upload-base (fileUploaded)="onFileUpload($event)" [fileUploadConfig]="fileUploadConfig"></app-file-upload-base>
    </span>
  `,
  styleUrls: ['./shared-app-file-upload.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class SharedAppFileUploadComponent implements OnInit, OnChanges {

  @Input()
  btnTxt = '上传';
  @Input()
  useCustomMaxSize = false;
  @Input()
  customMaxSize = 1024 * 1024;
  @Input()
  disabled = false;

  @Output()
  fileUploaded = new EventEmitter<any>();

  fileUploadConfig: AppFileUploadConfig = new AppFileUploadConfig();

  private rsp: any;

  private appConfig: any;

  constructor(private appConfigService: AppConfigService,
    private passportService: PassportService,
    private commonService: CommonService,
    private utilsService: UtilsService) {

    this.appConfig = appConfigService.getConfig();

    this.fileUploadConfig.url = window.location.protocol + this.appConfig.domain + this.appConfig.apiPath + this.appConfig.apis.common.path + this.appConfig.apis.common.modules.fileUpload;

    const customHeadersConf = this.appConfig.apis.customHeaders;
    const userCookie = passportService.getUserCookie();
    const tokenId = userCookie ? (userCookie.tokenId || '') : '';

    this.fileUploadConfig.customHeaders.push({ name: customHeadersConf.auth, value: tokenId });

    this.fileUploadConfig.formData = utilsService.encryptByAES({
      tokenId: tokenId
    });

    this.fileUploadConfig.responseConfig = this.appConfig.response.fileUpload;

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    const validation = this.appConfig.validation.upload.common;
    this.rsp = this.appConfig.response;

    const maxSize = this.useCustomMaxSize ? this.customMaxSize : validation.maxSize;

    this.fileUploadConfig.deniedFileType = validation.deniedFileType;
    if (validation.deniedMimeType && validation.deniedMimeType.length > 0) {
      this.fileUploadConfig.deniedMimeType = validation.deniedMimeType;
    }
    this.fileUploadConfig.maxFileSize = maxSize;
    // console.log('fileUploadConfig:', this.fileUploadConfig)

  }

  onFileUpload(rsp: any): void {

    this.fileUploaded.emit(rsp);

  }

}
