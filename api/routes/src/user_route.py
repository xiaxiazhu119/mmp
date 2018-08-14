# -*- coding=utf-8 -*-

from handlers.handlers import UserHandler, UserSignInHandler, UserSignUpHandler, UserPwdHandler


user_routes = [{
    'path': r"user",
    'handler': UserHandler
}, {
    'path': r"user/sign-in",
    'handler': UserSignInHandler
}, {
    'path': r"user/sign-up",
    'handler': UserSignUpHandler
}, {
    'path': r"user/pwd",
    'handler': UserPwdHandler
}]
