import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewEncapsulation } from '@angular/core';

import { AppNavItem } from '@app/models';

@Component({
  selector: 'app-cms-sidebar-nav-item',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: [],
  providers: [],
  encapsulation: ViewEncapsulation.None
})
export class CmsSidebarNavItemComponent implements OnInit, OnChanges {

  @Input()
  navItem: AppNavItem = new AppNavItem();

  @Output()
  activated = new EventEmitter<any>();

  hasChildNav = false;

  tooltipPosition = 'below';

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.hasChildNav = typeof this.navItem.childNavList !== 'undefined' && this.navItem.childNavList.length > 0;
  }

  goTo(navItem: AppNavItem): void {
    this.activated.emit(navItem);
  }

}
