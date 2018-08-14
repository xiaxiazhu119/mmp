import { AppConfigService } from '@app/service/app';


export class AppPaginationSize {
  // public static sm: string= 'modal-sm';
  // public static md: string='modal-md';
  // public static lg: string='modal-lg';

  sm: string;
  md: string;
  lg: string;

  constructor() {
    this.sm = 'pagination-sm';
    this.md = 'pagination-md';
    this.lg = 'pagination-lg';
  }

}

export class AppPaginationConfig {

  maxSize?: number;
  totalItems: number;
  boundaryLinks?: boolean;
  numPages?: number;
  rotate?: boolean;
  customClass?: string;
  currentPage?: number;
  size?: string;
  previousText?: string;
  nextText?: string;
  firstText?: string;
  lastText?: string;
  pageBtnClass?: string;
  itemsPerPage?: number;
  hasPageSizeSelection?: boolean;
  pageSizeSelection?: number[];

  private appPaginationSize: AppPaginationSize = new AppPaginationSize();
  private appConfigService: AppConfigService = new AppConfigService();

  constructor() {

    const pagination: any = this.appConfigService.getConfig().pagination;

    this.boundaryLinks = true;
    this.rotate = false;
    this.size = this.appPaginationSize.md;
    this.currentPage = 1;
    this.previousText = pagination.btnDesc.previous;
    this.nextText = pagination.btnDesc.next;
    this.firstText = pagination.btnDesc.first;
    this.lastText = pagination.btnDesc.last;
    this.itemsPerPage = pagination.defaultPageSize;
    this.maxSize = pagination.pageMaxSize;
    this.hasPageSizeSelection = false;
    this.pageSizeSelection = pagination.pageSizeSelection;
  }

}

export class AppFileUploadConfig {

  url: string;
  allowedFileType?: string[];
  allowedMimeType?: string[];
  deniedFileType?: string[];
  deniedMimeType?: string[];
  maxFileSize?: number;
  customHeaders: any[];
  formData?: string;
  responseConfig?: any;

  constructor() {
    this.allowedFileType = [];
    this.allowedMimeType = [];
    this.deniedFileType = [];
    this.deniedMimeType = [];
    this.customHeaders = [];
    this.maxFileSize = 0;
  }

}

export class AppFileUploadEventConfig {

  onSuccess?: any;
  onFailed?: any;
  onCompleted?: any;

}

export class DialogConfig {
  title?: string;
  content?: string;
  hasAction?: boolean;
  hasConfirmBtn?: boolean;
  hasCancelBtn?: boolean;
  confirmBtnTxt?: string;
  cancelBtnTxt?: string;
  useComponent?: boolean;
  component?: any;
  data?: any;

  styleConfig?: DialogStyleConfig;

  onInit?: any;
  afterDialogViewInit?: any;

  onConfirm?: any;
  onCancel?: any;

  onDynamicComponentLoaded?: any;

  constructor() {
    this.title = '信息';
    this.content = '';

    this.hasAction = this.hasConfirmBtn = this.hasCancelBtn = true;
    this.confirmBtnTxt = '确定';
    this.cancelBtnTxt = '取消';

    this.useComponent = false;

    this.onCancel = (dialogRef: any, e: any) => {
      dialogRef.close();
    };

  }

}

export class DialogStyleConfig {
  width?: string;
  height?: string;
}

export class SnackBarConfig {
  msg: string;
  action?: string;
  duration: number;
  extraClasses?: string[];

  constructor() {
    this.action = '×';
    this.duration = 2000;
    this.extraClasses = ['mat-simple-snackbar-icon-action'];
  }
}
