import { Component, OnChanges, OnInit, SimpleChange, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-cms-manuscript-publish-dialog',
  templateUrl: './cms-manuscript-publish-dialog.component.html',
  styleUrls: ['./cms-manuscript-publish-dialog.component.scss', './cms-manuscript-publish-dialog.component.theme.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CmsManuscriptPublishDialogComponent implements OnInit {


  @Input()
  public data: any;
  @Input()
  public config: any;

  termList = [1, 2, 3, 4, 5, 6];

  @Output()
  initialized = new EventEmitter<any>();
  @Output()
  confirmed = new EventEmitter<any>();
  @Output()
  canceled = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.initialized.emit('initialized');
  }

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.canceled.emit(false);
  }

}
