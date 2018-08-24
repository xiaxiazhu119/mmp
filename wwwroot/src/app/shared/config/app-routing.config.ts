

export const appRouteConfig = {
  path: './components/',
  _default: {
    link: '/',
    path: '',
    redirectTo: 'passport/sign-in',
    // redirectTo: 'project/list',
    pathMatch: 'prefix'
  },
  modules: {
    web: {
      path: '',
      link: '/',
      params: '',
      module: './components/web/web-layout.module#WebLayoutModule',
      modules: {
        home: {
          path: 'home',
          modules: {
            _default: {
              documentTitle: '首页',
              pageTitle: '首页',
              title: '首页',
              link: '/',
              path: 'default',
              params: '',
              module: './components/web/home/default/web-home-default.module#WebHomeDefaultModule'
            },
          }
        },
      }
    },
    passport: {
      path: 'passport',
      link: '/passport/sign-in',
      params: '',
      module: './components/passport/passport-layout.module#PassportLayoutModule',
      modules: {
        oauth: {
          documentTitle: 'oauth',
          pageTitle: 'oauth',
          title: 'oauth',
          link: '/passport/oauth',
          path: 'oauth',
          params: '',
          module: './passport/oauth/passport-oauth.module#PassportOAuthModule'
        },
        signIn: {
          documentTitle: 'Sign In',
          pageTitle: 'Sign In',
          title: 'Sign In',
          link: '/passport/sign-in',
          path: 'sign-in',
          params: '',
          module: './passport/sign-in/passport-sign-in.module#PassportSignInModule'
        },
        signOut: {
          documentTitle: 'Sign Out',
          pageTitle: 'Sign Out',
          title: 'Sign Out',
          link: '/passport/sign-out',
          path: 'sign-out',
          params: '',
          module: './passport/sign-out/passport-sign-out.module#PassportSignOutModule'
        }
      }
    },
    cms: {
      id: 'app-cms-home',
      documentTitle: '稿件管理平台',
      pageTitle: '稿件管理平台',
      path: 'cms',
      link: '/cms',
      params: '',
      module: './components/cms/cms-layout.module#CmsLayoutModule',
      modules: {
        home: {
          path: 'home',
          modules: {
            dashboard: {
              id: 'app-cms-home',
              documentTitle: '稿件管理平台',
              pageTitle: 'CMS Dashboard',
              title: 'dashboard',
              toolTipTitle: '首页',
              icon: 'home',
              link: '/cms',
              path: '',
              params: '',
              module: './components/cms/home/dashboard/cms-home-dashboard.module#CmsHomeDashboardModule'
            }
          }
        },
        manuscript: {
          path: 'manuscript',
          modules: {
            list: {
              id: 'app-cms-manuscript',
              documentTitle: '我的投稿,投稿管理',
              pageTitle: '我的投稿,投稿管理',
              title: '我的投稿,投稿管理',
              toolTipTitle: '我的投稿,投稿管理',
              icon: 'view_list',
              link: '/cms/manuscript/list',
              path: 'list',
              params: '',
              module: './manuscript/list/cms-manuscript-list.module#CmsManuscriptListModule',
            },
            info: {
              id: 'app-cms-manuscript',
              documentTitle: '稿件详情',
              pageTitle: '稿件详情',
              title: '稿件详情',
              link: '/cms/manuscript/info',
              path: 'info',
              params: '/:id',
              module: './manuscript/info/cms-manuscript-info.module#CmsManuscriptInfoModule',
            },
            edit: {
              id: 'app-cms-manuscript',
              documentTitle: '稿件编辑',
              pageTitle: '稿件编辑',
              title: '稿件编辑',
              link: '/cms/manuscript/edit',
              path: 'edit',
              params: '/:id',
              module: './manuscript/edit/cms-manuscript-edit.module#CmsManuscriptEditModule',
            },
            create: {
              id: 'app-cms-manuscript',
              documentTitle: '新建投稿',
              pageTitle: '新建投稿',
              title: '新建投稿',
              link: '/cms/manuscript/create',
              path: 'create',
              params: '',
              module: './manuscript/edit/cms-manuscript-edit.module#CmsManuscriptEditModule',
            },
            review: {
              id: 'app-cms-manuscript',
              documentTitle: '稿件评审',
              pageTitle: '稿件评审',
              title: '稿件评审',
              link: '/cms/manuscript/review',
              path: 'review',
              params: '/:id',
              module: './manuscript/review/cms-manuscript-review.module#CmsManuscriptReviewModule',
            }
          }
        },
        magazine: {
          path: 'magazine',
          modules: {
            list: {
              id: 'app-cms-magazine',
              documentTitle: '杂志库',
              pageTitle: '杂志库',
              title: '杂志库',
              toolTipTitle: '杂志库',
              icon: 'assignment_turned_in',
              link: '/cms/magazine/list',
              path: 'list',
              params: '',
              module: './magazine/list/cms-magazine-list.module#CmsMagazineListModule',
            },
            info: {
              id: 'app-cms-magazine',
              documentTitle: '稿件详情',
              pageTitle: '稿件详情',
              title: '稿件详情',
              link: '/cms/magazine/info',
              path: 'info',
              params: '/:id',
              module: './magazine/info/cms-magazine-info.module#CmsMagazineInfoModule',
            },
          }
        },
        candidate: {
          path: 'candidate',
          modules: {
            list: {
              id: 'app-cms-candidate',
              documentTitle: '候选库',
              pageTitle: '候选库',
              title: '候选库',
              toolTipTitle: '候选库',
              icon: 'assignment',
              link: '/cms/candidate/list',
              path: 'list',
              params: '',
              module: './candidate/list/cms-candidate-list.module#CmsCandidateListModule',
            },
            info: {
              id: 'app-cms-candidate',
              documentTitle: '候选稿件详情',
              pageTitle: '候选稿件详情',
              title: '候选稿件详情',
              link: '/cms/candidate/info',
              path: 'info',
              params: '/:id',
              module: './candidate/info/cms-candidate-info.module#CmsCandidateInfoModule',
            },
          }
        },
        user: {
          path: 'user',
          modules: {
            pwd: {
              documentTitle: '密码修改',
              pageTitle: '密码修改',
              title: '密码修改',
              link: '/cms/user/pwd',
              path: 'pwd',
              params: '',
              module: './user/pwd/cms-user-pwd.module#CmsUserPwdModule',
            },
            profile: {
              id: 'app-cms-user-profile',
              documentTitle: '个人信息',
              pageTitle: '个人信息',
              title: '个人信息',
              toolTipTitle: '个人信息',
              icon: 'account_box',
              link: '/cms/user/profile',
              path: 'profile',
              params: '',
              module: './user/profile/cms-user-profile.module#CmsUserProfileModule',
            },
          }
        },
        announcement: {
          path: 'announcement',
          modules: {
            list: {
              id: 'app-cms-announcement',
              documentTitle: '通知公告',
              pageTitle: '通知公告',
              title: '通知公告',
              toolTipTitle: '通知公告',
              icon: 'announcement',
              link: '/cms/announcement/list',
              path: 'list',
              params: '',
              module: './announcement/list/cms-announcement-list.module#CmsAnnouncementListModule',
            },
            info: {
              id: 'app-cms-announcement',
              documentTitle: '信息详情',
              pageTitle: '信息详情',
              title: '信息详情',
              link: '/cms/announcement/info',
              path: 'info',
              params: '/:id',
              module: './announcement/info/cms-announcement-info.module#CmsAnnouncementInfoModule',
            },
            edit: {
              id: 'app-cms-announcement',
              documentTitle: '新建公告,公告编辑',
              pageTitle: '新建公告,公告编辑',
              title: '新建公告,公告编辑',
              link: '/cms/announcement/edit',
              path: 'edit',
              params: '',
              module: './announcement/edit/cms-announcement-edit.module#CmsAnnouncementEditModule',
            },
          }
        },
      }
    },
  }
};
