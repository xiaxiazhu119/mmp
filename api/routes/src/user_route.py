# -*- coding=utf-8 -*-

from handlers.handlers import UserHandler, UserSignInHandler, UserSignUpHandler, UserPwdHandler, UserProfileHandler


user_routes = [{
    'path': r"user/<int:id>",
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
}, {
    'path': r"user/profile",
    'handler': UserProfileHandler
}]
