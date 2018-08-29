import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatTabsModule } from '@angular/material';

import { CmsMessageListRoutingModule } from './cms-message-list-routing.module';
import { CmsMessageListComponent } from './cms-message-list.component';

import { MessageTabItemModule } from './tab-item/message-tab-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule, MatTabsModule,
    MessageTabItemModule,
    CmsMessageListRoutingModule
  ],
  declarations: [CmsMessageListComponent],
  exports: [CmsMessageListComponent],
  entryComponents: [],
  schemas: []
})
export class CmsMessageListModule {
}
