import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule } from '@angular/material';

import { CmsAnnouncementListRoutingModule } from './cms-announcement-list-routing.module';
import { CmsAnnouncementListComponent } from './cms-announcement-list.component';
import { AppPaginationModule } from '@app/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule,
    AppPaginationModule,
    CmsAnnouncementListRoutingModule
  ],
  declarations: [CmsAnnouncementListComponent],
  exports: [CmsAnnouncementListComponent],
  entryComponents: [],
  schemas: []
})
export class CmsAnnouncementListModule {
}
