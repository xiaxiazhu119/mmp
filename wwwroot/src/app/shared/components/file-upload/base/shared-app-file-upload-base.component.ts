import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';

import { AppFileUploadConfig } from '@app/models/ui';

@Component({
  selector: 'app-file-upload-base',
  template: `
    <input #fileUploadIpt type="file" name="file" ng2FileSelect [uploader]="uploader" />
  `,
  providers: []
})
export class SharedAppFileUploadBaseComponent implements OnInit, OnChanges {

  @Input()
  fileUploadConfig: AppFileUploadConfig;

  @Output()
  fileUploaded = new EventEmitter<any>();

  @ViewChild('fileUploadIpt')
  fileUploadIpt: any;

  public uploader: FileUploader;
  private options: FileUploaderOptions;

  constructor() {

    this.options = {
      // headers: [{
      //   name: this.tokenIdHeaderKey,
      //   value: this.tokenId
      // }],
      // disableMultipart: true,
      // allowedFileType: validation.fileType,
      queueLimit: 1,
      removeAfterUpload: true,
      autoUpload: true,
      // maxFileSize: validation.maxSize,
      // isHTML5: false
    };

    // this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
    //   console.log('after add, fileitem:', fileItem)
    // };
    //
    // this.uploader.onAfterAddingAll = (fileItems: any) => {
    //   console.log('after add all, fileItems:', fileItems)
    // };

  }

  ngOnInit(): void {

    // this.options.headers = [{name: 'x-custom-header-tokenId', value: this.tokenId}];
    // console.log('this.options.headers:', typeof this.options.headers, this.options.headers)

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    if (this.fileUploadConfig.customHeaders.length > 0) {
      this.options.headers = this.fileUploadConfig.customHeaders;
    }

    this.options.url = this.fileUploadConfig.url;

    if (this.fileUploadConfig.allowedMimeType.length > 0) {
      this.options.allowedMimeType = this.fileUploadConfig.allowedMimeType;
    }

    if (this.fileUploadConfig.allowedMimeType.length === 0 && this.fileUploadConfig.allowedFileType.length > 0) {
      this.options.allowedFileType = this.fileUploadConfig.allowedFileType;
    }

    if (this.fileUploadConfig.maxFileSize > 0) {
      this.options.maxFileSize = this.fileUploadConfig.maxFileSize;
    }

    this.uploader = new FileUploader(this.options);
    // console.log('this.uploader:', this.uploader)
    this.initUploadEvent();

  }

  upload(): void {

    // console.log(this.uploader);

    // console.log('this.uploader.queue:', this.uploader.queue, 'file:', this.uploader.queue[0].file, ' filename:', this.uploader.queue[0].file.name);

    if (this.uploader.queue && this.uploader.queue.length > 0) {
      if (this.uploader.queue[0].file) {
        const item = this.uploader.queue[0];
        item.headers = [{
          name: 'Content-Type',
          value: 'multipart/form-data'
        }];


        if (this.fileUploadConfig.customHeaders.length > 0) {
          for (let i = 0, j = this.fileUploadConfig.customHeaders.length; i < j; i++) {
            const customHeader = this.fileUploadConfig.customHeaders[i];
            this.options.headers.push(customHeader);
          }

        }

        item.upload();
      }
    }

  }

  private resetFileInput(): void {
    // console.log('before reset:', this.fileUploadIpt.nativeElement.files);
    this.fileUploadIpt.nativeElement.value = '';
    // console.log('after reset:', this.fileUploadIpt.nativeElement.files);
  }

  private initUploadEvent(): void {

    this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
      // console.log('item:', item, ',filter:', filter, ',options:', options);
      let rsp = this.fileUploadConfig.responseConfig.other;
      switch (filter.name) {
        case 'fileType':
          rsp = this.fileUploadConfig.responseConfig.F_U_0X99999;
          break;
        case 'mimeType':
          rsp = this.fileUploadConfig.responseConfig.F_U_0X99999;
          break;
        case 'fileSize':
          rsp = this.fileUploadConfig.responseConfig.F_U_0X99998;
          break;
        default:
          break;
      }
      this.resetFileInput();
      this.fileUploaded.emit(rsp);
    };

    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
      // console.log('onBuildItemForm fileItem:', fileItem)
      // const data = this.utilsService.encryptByAES({
      //   tokenId: this.tokenId
      // });
      // console.log('ddd:', data)
      if (this.fileUploadConfig.formData) {
        form.append('data', this.fileUploadConfig.formData);
      }
    };

    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      // console.log('onBeforeUploadItem fileItem:', fileItem)

      fileItem.withCredentials = false;

      this.fileUploaded.emit(0);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      // console.log('onCompleteItem:', item, response, status);
      // console.log('response:', response)

      let emit: any = response;

      if (response) {

        const rsp: any = JSON.parse(response);

        emit = rsp;
      }

      this.fileUploaded.emit(emit);

      // console.log('upload item complete')
    };

    this.uploader.onCompleteAll = () => {

      // console.log('upload complete all')

      this.resetFileInput();

    };

  }
}
