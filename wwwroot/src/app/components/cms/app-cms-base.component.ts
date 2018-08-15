import { Component, OnInit } from '@angular/core';

import { AppBaseComponent } from '@app/baseComponent';

export class AppCmsBaseComponent extends AppBaseComponent {

  isSignInPage = false;

  noDataTxt = '未找到符合条件的数据';

  constructor() {
    super();
  }

}
