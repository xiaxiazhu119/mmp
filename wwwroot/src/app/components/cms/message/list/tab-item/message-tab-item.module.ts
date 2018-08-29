import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { MessageTabItemComponent } from './message-tab-item.component';
import { AppPaginationModule } from '@app/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule,
    AppPaginationModule
  ],
  declarations: [MessageTabItemComponent],
  exports: [MessageTabItemComponent],
  entryComponents: [],
  schemas: []
})
export class MessageTabItemModule {
}
