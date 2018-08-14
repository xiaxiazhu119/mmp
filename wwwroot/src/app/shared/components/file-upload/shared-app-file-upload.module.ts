import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MatInputModule, MatButtonModule, MatIconModule} from '@angular/material';

import {SharedAppFileUploadComponent} from './shared-app-file-upload.component';

import {SharedAppFileUploadBaseModule} from './base/shared-app-file-upload-base.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule, MatButtonModule, MatIconModule,
    SharedAppFileUploadBaseModule
  ],
  declarations: [SharedAppFileUploadComponent],
  exports: [SharedAppFileUploadComponent]
})
export class SharedAppFileUploadModule {
}
