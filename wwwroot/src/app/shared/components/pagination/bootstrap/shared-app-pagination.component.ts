import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewEncapsulation } from '@angular/core';
import { AppPaginationConfig } from '@app/models/ui';

@Component({
  selector: 'app-pagination',
  templateUrl: './shared-app-pagination.component.html',
  styleUrls: ['./shared-app-pagination.component.scss', './shared-app-pagination.component.theme.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class SharedAppPaginationComponent implements OnInit, OnChanges {

  @Input()
  appPaginationConfig: AppPaginationConfig = new AppPaginationConfig();

  @Output()
  pageChanged = new EventEmitter<number>();

  @Output()
  pageSizeChanged = new EventEmitter<number>();

  // public numPages: number       = 0;

  constructor() {

    // console.log('this.appPaginationConfig:',this.appPaginationConfig)
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    // console.log('page changes:', changes)

  }

  onPageSizeChange(e: any): void {
    this.pageSizeChanged.emit(Number(e.target.value));
  }

  public onPageChange(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
    this.pageChanged.emit(event.page);
  }

}
