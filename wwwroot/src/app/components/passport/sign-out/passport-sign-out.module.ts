import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PassportSignOutComponent } from './passport-sign-out.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [PassportSignOutComponent],
  exports: [PassportSignOutComponent]
})
export class PassportSignOutModule {
}
