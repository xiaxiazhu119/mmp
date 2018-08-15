

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
              icon: 'home',
              link: '/cms/manuscript/list',
              path: 'list',
              params: '',
              module: './manuscript/list/cms-manuscript-list.module#CmsManuscriptListModule',
            },
            detail: {
              id: 'app-cms-manuscript',
              documentTitle: '稿件详情',
              pageTitle: '稿件详情',
              title: '稿件详情',
              link: '/cms/manuscript/detail',
              path: 'detail',
              params: '/:id',
              module: './manuscript/detail/cms-manuscript-detail.module#CmsManuscriptDetailModule',
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
              icon: 'home',
              link: '/cms/magazine/list',
              path: 'list',
              params: '',
              module: './magazine/list/cms-magazine-list.module#CmsMagazineListModule',
            },
            detail: {
              id: 'app-cms-magazine',
              documentTitle: '稿件详情',
              pageTitle: '稿件详情',
              title: '稿件详情',
              link: '/cms/magazine/detail',
              path: 'detail',
              params: '/:id',
              module: './magazine/detail/cms-magazine-detail.module#CmsMagazineDetailModule',
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
              icon: 'home',
              link: '/cms/candidate/list',
              path: 'list',
              params: '',
              module: './candidate/list/cms-candidate-list.module#CmsCandidateListModule',
            },
            detail: {
              id: 'app-cms-candidate',
              documentTitle: '候选稿件详情',
              pageTitle: '候选稿件详情',
              title: '候选稿件详情',
              link: '/cms/candidate/detail',
              path: 'detail',
              params: '/:id',
              module: './candidate/detail/cms-candidate-detail.module#CmsCandidateDetailModule',
            },
          }
        },
        user: {
          path: 'user',
          modules: {
            profile: {
              path: 'profile',
              modules: {
                info: {
                  documentTitle: '信息修改',
                  pageTitle: '信息修改',
                  title: '信息修改',
                  link: '/cms/user/profile',
                  path: '',
                  params: '',
                  module: './user/profile/info/cms-user-profile-info.module#CmsUserProfileInfoModule',
                },
                pwd: {
                  documentTitle: '密码修改',
                  pageTitle: '密码修改',
                  title: '密码修改',
                  link: '/cms/user/profile/pwd',
                  path: 'pwd',
                  params: '',
                  module: './user/profile/pwd/cms-user-profile-pwd.module#CmsUserProfilePwdModule',
                }
              }
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
              icon: 'home',
              link: '/cms/announcement/list',
              path: 'list',
              params: '',
              module: './announcement/list/cms-announcement-list.module#CmsAnnouncementListModule',
            },
            detail: {
              id: 'app-cms-announcement',
              documentTitle: '信息详情',
              pageTitle: '信息详情',
              title: '信息详情',
              link: '/cms/announcement/detail',
              path: 'detail',
              params: '/:id',
              module: './announcement/detail/cms-announcement-detail.module#CmsAnnouncementDetailModule',
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
