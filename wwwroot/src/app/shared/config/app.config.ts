const _domain = '//127.0.0.1:5000/';
// const _domain = '//207.246.114.214:8088/';
const _wordDividerChar = '_';

const _appConfig = {
  domain: _domain,
  apiPath: 'api',
  siteName: '',
  apis: {
    customHeaders: {
      auth: 'x-custom-header-tokenId'
    },
    common: {
      path: '/common',
      modules: {
        fileUpload: '/file/upload',
      }
    },
    user: {
      path: '/user',
      modules: {
        signIn: '/sign-in',
        signUp: '/sign-up',
        info: '/{id}',
        updatePwd: '/pwd'
      },
    },
    manuscript: {
      path: '/manuscript',
      modules: {
        list: '/list',
        info: '/{id}',
        edit: '/0',
        updateStatus: '/status'
      }
    },
    area: {
      path: '/area',
      modules: {
        list: '/list/{pid}',
      }
    }
  },
  cookies: {
    prefix: _domain + _wordDividerChar,
    keys: {
      user: 'user',
      userProfile: 'user-profile',
      imgCaptcha: 'img-captcha',
      smsCaptcha: 'sms-captcha',
      remember: {
        mobile: {
          key: 'remember-mobile',
          expires: 180  // day
        }
      }
    }
  },
  site: {
    homepage: {
      wwwroot: '',
      cms: 'cms/'
    },
    officeWebViewer: 'https://view.officeapps.live.com/op/view.aspx?src='
  },
  timer: {
    zero: 0,
    min: 60,
    sec: 1000,
    halfSec: 500
  },
  validation: {
    regex: {
      mobile: /^1[3|4|5|7|8]\d{9}$/,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      number: /^[0-9]*$/
    },
    minLen: {
      imgCaptcha: 4,
      smsCaptcha: 5,
      pwd: 6
    },
    upload: {
      common: {
        maxSize: 5 * 1024 * 1024,
        allowedFileType: [],
        allowedMimeType: [],
        deniedFileType: ['exe'],
        deniedMimeType: []
      }
    }
  },
  pagination: {
    defaultPageSize: 10,
    pageMaxSize: 5,
    btnDesc: {
      previous: '&lsaquo;',
      next: '&rsaquo;',
      first: '&laquo;',
      last: '&raquo;'
    },
    pageSizeSelection: [10, 20, 50, 100]
  },
  response: {
    RSP500: {
      code: -500,
      desc: 'server error'
    },
    fileUpload: {
      F_U_0X99999: {
        code: -99999,
        desc: '文件格式好像不对哦。'
      },
      F_U_0X99998: {
        code: -99998,
        desc: '文件太大啦，换个小点的试试吧。'
      },
      other: {
        code: -99997,
        desc: '0X99999999。上传错误。'
      }
    }
  },
};

export const appConfig = _appConfig;
