import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PassportSignInComponent } from './passport-sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [PassportSignInComponent],
  exports: [PassportSignInComponent]
})
export class PassportSignInModule {
}
