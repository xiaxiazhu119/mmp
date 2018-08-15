# -*- coding=utf-8 -*-

API_CONF = {
    'auth': {
        'secret_key': '12345678abcdefg',
        'token_expire': 24*60*60
    },
    'response': {
        'common': {
            'request-invalid': {
                'code': -99999999,
                'msg': 'request data invalid'
            },
            'auth-invalid': {
                'code': -99999998,
                'msg': 'auth invalid'
            },
            'area-list-success': {
                'code': 90000000,
                'msg': 'get area list success'
            },
            'file-upload-success': {
                'code': 90100000,
                'msg': 'file upload success'
            },
            'file-upload-failed': {
                'code': -90100000,
                'msg': 'file upload failed'
            }
        },
        'user': {
            'sign-in': {
                'success': {
                    'code': 10000000,
                    'msg': 'sign in success'
                },
                'failed': {
                    'code': -10000000,
                    'msg': 'sign in failed'
                }
            },
            'sign-up': {
                'success': {
                    'code': 10000002,
                    'msg': 'sign up success'
                },
                'failed': {
                    'code': -10000002,
                    'msg': 'sign up failed'
                },
                'repeat': {
                    'code': -10000003,
                    'msg': 'repeat user name'
                }
            },
            'pwd': {
                'success': {
                    'code': 10000001,
                    'msg': 'update pwd success'
                },
                'failed': {
                    'code': -10000001,
                    'msg': 'update pwd failed'
                }
            }
        },
        'manuscript': {
            'list': {
                'success': {
                    'code': 20000000,
                    'msg': 'manuscript list success'
                },
                'failed': {
                    'code': -20000000,
                    'msg': 'manuscript list failed'
                }
            },
            'create': {
                'success': {
                    'code': 20000001,
                    'msg': 'manuscript create success'
                },
                'failed': {
                    'code': -20000001,
                    'msg': 'manuscript create failed'
                }
            },
            'edit': {
                'success': {
                    'code': 20000003,
                    'msg': 'manuscript edit success'
                },
                'failed': {
                    'code': -20000003,
                    'msg': 'manuscript edit failed'
                }
            },
            'info': {
                'success': {
                    'code': 20000002,
                    'msg': 'manuscript get info success'
                },
            },
        }
    }
}


class ApiConf(object):
    __api_conf = API_CONF

    @staticmethod
    def get_api_conf():
        return ApiConf.__api_conf

    @staticmethod
    def get_auth_conf():
        return ApiConf.__api_conf['auth']

    @staticmethod
    def get_response(keys):
        conf = ApiConf.get_api_conf()['response']
        for key in keys:
            conf = conf[key]
        return conf
