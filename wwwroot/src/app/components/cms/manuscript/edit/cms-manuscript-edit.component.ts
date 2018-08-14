import { Component, OnChanges, OnInit, SimpleChange, Input } from '@angular/core';

import { AppService, PassportService, UserService, AreaService, ManuscriptService } from '@app/service/app';
import { DialogService, SnackBarService, DialogBaseService } from '@app/service/ui';
import { CommonService, UtilsService } from '@app/service/common';
import { ManuscriptInfoModel, ManuscriptAuthorModel } from '@app/models';
import { DialogConfig } from '@app/models/ui';

import { AppCmsBaseComponent } from '@app/cmsBaseComponent';
import { ManuscriptStatusEnum } from '@app/enums';

@Component({
  selector: 'app-cms-manuscript-edit',
  templateUrl: './cms-manuscript-edit.component.html',
  styleUrls: ['./cms-manuscript-edit.component.scss', './cms-manuscript-edit.component.theme.scss'],
  providers: [CommonService, SnackBarService, UserService, AreaService, ManuscriptService]
})
export class CmsManuscriptEditComponent extends AppCmsBaseComponent implements OnInit {

  info: ManuscriptInfoModel = new ManuscriptInfoModel();
  author: ManuscriptAuthorModel = new ManuscriptAuthorModel();

  isFormSubmit = false;
  isSubmitted = false;
  agreement: boolean;
  provinceList: any[] = [];
  cityList: any[] = [];
  districtList: any[] = [];

  constructor(private commonService: CommonService,
    private utilsService: UtilsService,
    private snackBarService: SnackBarService,
    private areaService: AreaService,
    private passportService: PassportService,
    private userService: UserService,
    private manuscriptService: ManuscriptService) {
    super();

  }

  ngOnInit(): void {
    this.initProvinceList();
    // this.author.province = 310000;

    // const a = '427BDD98CD299D4B0800488DEAEADAA432D466B772F8C23D64857401F8A94A3310B2B134021FA31564BABAE7A1E31D98';
    // console.log('adafsafs:', this.utilsService.decryptByAES(a));

    this.info.file = '/upload/1/ecology_201808101439094518.sql';

  }

  onFileUpload(e: any): void {
    // console.log('onfileupload:', e)
    if (e.code < 0) {
      this.showSnackMsg(e.desc);
    } else {
      if (e.data) {
        const filePath = this.utilsService.decryptByAES(e.data);
        // console.log(filePath)
        this.info.file = filePath;
      }
    }

  }

  delAttachment(): void {

  }

  onAuthorTypeChange(e: any): void {
    // console.log(e);
    if (e.value) {
      this.author.name = '1231231';
    } else {
      this.author = new ManuscriptAuthorModel();
    }
  }

  submit(): void {

    if (this.isFormSubmit) {
      return;
    }

    if (!this.verifyForm()) {
      return;
    }

    this.isFormSubmit = true;

    console.log(this.info);
    console.log(this.author);

    this.info.categoryName = this.info.periodicalCategoryName = '12313';

    if (!this.info.isSelf) {
      this.author.provinceName = this.provinceList.filter((p: any) => p.id === this.author.province)[0].name;
      this.author.cityName = this.cityList.filter((c: any) => c.id === this.author.city)[0].name;
      this.author.districtName = this.districtList.filter((d: any) => d.id === this.author.district)[0].name;
    }

    this.manuscriptService
      .edit(this.info, this.author, (data: any) => {
        this.isFormSubmit = false;
        const id = Number(this.utilsService.decryptByAES(data.data));

        const msg = id > 0 ? '投稿成功，请等待评审结果' : '投稿失败';
        this.showSnackMsg(msg);

        if (id > 0) {
          this.info = new ManuscriptInfoModel();
          this.author = new ManuscriptAuthorModel();
        }

        console.log('id:', id);

      }, (err: any) => {
        console.log(err);
        this.isFormSubmit = false;
      });

  }

  onProvinceChange(e: any): void {
    this.cityList = this.districtList = [];
    this.author.city = this.author.district = 0;
    // this.author.provinceName = e.target.selectedOptions[0].text;

    // console.log('province change:', e);

    // const id = Number(e.target.value);

    this.getAreaList(e.value, (data: any) => {
      this.cityList = data;
    });
  }

  onCityChange(e: any): void {
    this.districtList = [];
    this.author.district = 0;
    // this.author.cityName = e.target.selectedOptions[0].text;

    // console.log('city change:', e, e.target.value);
    // const id = Number(e.target.value);

    this.getAreaList(e.value, (data: any) => {
      this.districtList = data;
    });
  }

  goBack(): void {
    this.commonService.goBack();
  }

  private initProvinceList(): void {
    const c = (data: any) => {
      // console.log(data, typeof data);
      this.provinceList = data;
    };
    this.getAreaList(86, c);
  }

  private getAreaList(pid: number, callback: any): void {
    this.areaService
      .list(pid, (data: any) => {
        if (data.data) {
          const d = this.utilsService.decryptByAES(data.data);
          if (d !== '') {
            const o = JSON.parse(d);
            callback(o);
          }
        }
      });
  }

  private verifyForm(): boolean {
    if (this.info.title === '') {
      this.showSnackMsg('请填写文章标题');
      return false;
    }
    if (this.info.keywords === '') {
      this.showSnackMsg('请填写关键字');
      return false;
    }
    if (typeof (this.info.category) === 'undefined') {
      this.showSnackMsg('请选择拟投栏目');
      return false;
    }
    if (this.info.file === '') {
      this.showSnackMsg('请上传稿件文档');
      return false;
    }
    if (typeof (this.info.isPublished) === 'undefined') {
      this.showSnackMsg('请选择是否已公开发表');
      return false;
    }
    if (this.info.isPublished) {
      if (typeof (this.info.periodicalCategory) === 'undefined') {
        this.showSnackMsg('请选择期刊栏目');
        return false;
      }
      if (this.info.periodicalSummary === '') {
        this.showSnackMsg('请填写期刊名、刊号等情况说明');
        return false;
      }
    }
    if (!this.info.isSelf) {
      if (typeof (this.author.province) === 'undefined' || typeof (this.author.province) === 'undefined' || typeof (this.author.province) === 'undefined') {
        this.showSnackMsg('请选择地区');
        return false;
      }
      if (this.author.name === '') {
        this.showSnackMsg('请填写作者姓名');
        return false;
      }
      if (this.author.tel === '') {
        this.showSnackMsg('请填写作者电话');
        return false;
      }
      if (this.author.email === '') {
        this.showSnackMsg('请填写作者邮箱');
        return false;
      }
      if (this.author.companyName === '') {
        this.showSnackMsg('请填写作者单位');
        return false;
      }
      if (this.author.companyAddress === '') {
        this.showSnackMsg('请填写作者单位地址');
        return false;
      }
      if (this.author.companyZipCode === '') {
        this.showSnackMsg('请填写作者单位邮编');
        return false;
      }
    }
    return true;
  }

  private showSnackMsg(msg: string): void {
    this.snackBarService.open(msg);
  }

}