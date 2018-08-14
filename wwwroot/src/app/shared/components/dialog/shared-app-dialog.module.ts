import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { DialogService } from '@app/service/ui';

import { SharedAppDialogComponent } from './shared-app-dialog.component';

@NgModule({
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatDialogModule, MatInputModule,
  ],
  declarations: [SharedAppDialogComponent],
  exports: [SharedAppDialogComponent],
  entryComponents: [SharedAppDialogComponent],
  providers: [DialogService]
})

export class SharedAppDialogModule {
}
