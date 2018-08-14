import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {FileUploadModule} from 'ng2-file-upload';

import {SharedAppFileUploadBaseComponent} from './shared-app-file-upload-base.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule
  ],
  declarations: [SharedAppFileUploadBaseComponent],
  exports: [SharedAppFileUploadBaseComponent]
})
export class SharedAppFileUploadBaseModule {
}
