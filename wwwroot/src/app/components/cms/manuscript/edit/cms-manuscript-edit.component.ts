import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { CommonService } from '@app/service/common';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';

@Component({
  selector: 'app-cms-manuscript-edit',
  templateUrl: './cms-manuscript-edit.component.html',
  styleUrls: ['./cms-manuscript-edit.component.scss', './cms-manuscript-edit.component.theme.scss'],
  providers: [CommonService]
})
export class CmsManuscriptEditComponent extends AppCmsBaseComponent implements OnInit {


  constructor(private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {

  }

  submit(): void { }

  goBack(): void {
    this.commonService.goBack();
  }

}
