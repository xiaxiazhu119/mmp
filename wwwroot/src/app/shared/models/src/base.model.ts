

export class BaseSearch {
  pageIndex?: number;
  pageSize?: number;

  constructor() {
    this.pageIndex = 1;
    this.pageSize = 10;
  }
}
