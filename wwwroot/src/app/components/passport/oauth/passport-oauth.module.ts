import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PassportOAuthComponent } from './passport-oauth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [PassportOAuthComponent],
  exports: [PassportOAuthComponent]
})
export class PassportOAuthModule {
}
