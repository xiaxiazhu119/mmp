
export class ModulePath {
  id: number;
  module: string;
  documentTitle: string;
  pageTitle: string;
  path: string;
  autoLoaded: boolean;
  action?: any[];

  constructor() {
    this.id = -1;
    this.module = this.path = this.documentTitle = this.pageTitle = '';
    this.autoLoaded = false;
    this.action = [];
  }
}

export class AppNavItem {
  id?: string;
  module?: string;
  title: string;
  toolTipTitle?: string;
  link: string;
  icon?: string;
  childNavList?: AppNavItem[];
  active?: boolean;

  constructor() {
    this.childNavList = [];
    this.active = false;
  }
}
