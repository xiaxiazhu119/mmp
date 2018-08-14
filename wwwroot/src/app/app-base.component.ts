import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class AppBaseComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

  childModules: any;

  title = '';
  pageTitle = '';
  documentTitle = '';

  constructor() {

  }

  ngOnInit(): void {
    // console.log('base init')
    // document.title = this.title;
  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {

    // const windowHeight  = window.innerHeight,
    //       netHeight     = windowHeight - 104 - 160,
    //       contentHeight = document.getElementById('app-content-container').offsetHeight;

    // document.getElementById('app-body').style.height = contentHeight < netHeight ? (netHeight + 'px') : 'auto';
  }

  ngAfterContentInit(): void {
  }

  ngAfterContentChecked(): void {
  }

  setTitle(title: string): void {
    this.pageTitle = this.title = title;
  }

  setPageTitle(title: string): void {
    this.pageTitle = title;
  }

  setDocumentTitle(title: string): void {
    document.title = title;
  }

  cloneObject(type: any, data: any): any {
    return Object.assign(type, data);
  }

  resetSelectBase(compareValue: any, obj: any, key: string, newValue?: any): void {
    if (compareValue === -1) {
      obj[key] = newValue;
    }
  }

  private getEnumStr(enums: any, key: number): string {
    return enums[key].toString().toLocaleLowerCase();
  }

}
