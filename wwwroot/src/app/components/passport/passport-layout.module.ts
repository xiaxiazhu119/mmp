import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PassportLayoutRoutingModule } from './passport-layout-routing.module';
import { PassportLayoutComponent } from './passport-layout.component';

import { PassportOAuthModule } from './oauth/passport-oauth.module';
import { PassportSignInModule } from './sign-in/passport-sign-in.module';
import { PassportSignUpModule } from './sign-up/passport-sign-up.module';
import { PassportSignOutModule } from './sign-out/passport-sign-out.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PassportLayoutRoutingModule,
    PassportOAuthModule, PassportSignInModule, PassportSignUpModule, PassportSignOutModule,
  ],
  declarations: [PassportLayoutComponent],
  exports: [PassportLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PassportLayoutModule {
}

