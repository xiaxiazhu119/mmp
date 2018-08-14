import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatListModule, MatMenuModule, MatIconModule, MatButtonModule, MatLineModule } from '@angular/material';

import { CookieModule } from 'ngx-cookie';

import { AjaxBaseService, AjaxService, AppCookieService, EventAnnounceService, CommonService, UtilsService, CryptoJsService, MessageService } from '@app/service/common';
import { PassportService, AppService, AppConfigService } from '@app/service/app';

import { AppRoutingModule } from './app-routing.modules';

import { AppComponent } from './app.component';
import { SharedAppDialogModule } from './shared/components/dialog/shared-app-dialog.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatLineModule,
    SharedAppDialogModule,
    AppRoutingModule,
    CookieModule.forRoot(),
  ],
  providers: [
    AjaxBaseService,
    AjaxService,
    AppCookieService,
    AppConfigService,
    EventAnnounceService,
    CommonService,
    UtilsService,
    CryptoJsService,
    MessageService,
    PassportService,
    AppService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
