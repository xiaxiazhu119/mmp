import { Component, OnChanges, OnInit, SimpleChange, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-cms-manuscript-confirm-dialog',
  templateUrl: './cms-manuscript-confirm-dialog.component.html',
  styleUrls: ['./cms-manuscript-confirm-dialog.component.scss', './cms-manuscript-confirm-dialog.component.theme.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CmsManuscriptConfirmDialogComponent implements OnInit {


  @Input()
  public data: any;
  @Input()
  public config: any;

  agreement = false;

  @Output()
  inited = new EventEmitter<any>();
  @Output()
  confirmed = new EventEmitter<any>();
  @Output()
  canceled = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.inited.emit('inited');
  }

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.canceled.emit(false);
  }

}
