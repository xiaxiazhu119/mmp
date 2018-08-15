export enum ManuscriptStatusEnum {
  Pending = 1,
  Canceled,
  Return,
  Edited,
  Refused,
  Stored,
  Published
}

export enum ManuscriptSearchTypeEnum {
  Manuscript = 1,
  Candidate,
  Magazine,
}

export enum ManuscriptCategoryEnum {
  Special = 1,
  Focus,
  Research,
  Vision,
  Practice,
  Family,
  Forum,
  Report,
  Community
}

export enum PeriodicalCategoryEnum {
  Public = 1,
  Internal
}


export enum PermissionGroupEnum {
  SA = 9999,
  Teacher = 1,
}

export class EnumClass {

  static getManuscriptStatusName(status: ManuscriptStatusEnum): string {

    switch (status) {
      case ManuscriptStatusEnum.Pending:
        return '待评审';
      case ManuscriptStatusEnum.Canceled:
        return '已取消';
      case ManuscriptStatusEnum.Return:
        return '退回修改';
      case ManuscriptStatusEnum.Edited:
        return '完成修改';
      case ManuscriptStatusEnum.Refused:
        return '不予采用';
      case ManuscriptStatusEnum.Stored:
        return '已入库';
      case ManuscriptStatusEnum.Published:
        return '已刊登';
      default:
        return '-';
    }

  }

  static getManuscriptStatusList(): any {
    const list = [];

    for (const status in ManuscriptStatusEnum) {
      if (!isNaN(Number(status))) {
        const s = Number(status);
        // console.log(this.getManuscriptStatusName(s))
        list.push({
          id: s,
          name: this.getManuscriptStatusName(s)
        });

      }
    }
    return list;
  }

  static getManuscriptCategoryName(category: ManuscriptCategoryEnum): string {

    switch (category) {
      case ManuscriptCategoryEnum.Special:
        return '本刊特稿';
      case ManuscriptCategoryEnum.Focus:
        return '热点关注';
      case ManuscriptCategoryEnum.Research:
        return '探索研究';
      case ManuscriptCategoryEnum.Vision:
        return '人文视野';
      case ManuscriptCategoryEnum.Practice:
        return '课程实践';
      case ManuscriptCategoryEnum.Family:
        return '家庭教育';
      case ManuscriptCategoryEnum.Forum:
        return '专题论坛';
      case ManuscriptCategoryEnum.Report:
        return '调研报告';
      case ManuscriptCategoryEnum.Community:
        return '社区教育要闻';
      default:
        return '-';
    }

  }

  static getManuscriptCategoryList(): any {
    const list = [];

    for (const category in ManuscriptCategoryEnum) {
      if (!isNaN(Number(category))) {
        const c = Number(category);
        // console.log(this.getManuscriptStatusName(s))
        list.push({
          id: c,
          name: this.getManuscriptCategoryName(c)
        });

      }
    }
    return list;
  }

  static getPeriodicalCategoryName(category: PeriodicalCategoryEnum): string {

    switch (category) {
      case PeriodicalCategoryEnum.Public:
        return '公开期刊';
      case PeriodicalCategoryEnum.Internal:
        return '内刊';
      default:
        return '-';
    }

  }

  static getPeriodicalCategoryList(): any {
    const list = [];

    for (const category in PeriodicalCategoryEnum) {
      if (!isNaN(Number(category))) {
        const c = Number(category);
        list.push({
          id: c,
          name: this.getPeriodicalCategoryName(c)
        });

      }
    }
    return list;
  }

}
