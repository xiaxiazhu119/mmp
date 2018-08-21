# -*- coding=utf-8 -*-

from enum import Enum


class MethodEnum(Enum):
    GET = 1
    POST = 2
    PUT = 3
    DELETE = 4


class ManuscriptStatusEnum(Enum):
    Pending = 1
    Canceled = 2
    Passed = 3
    Return = 4
    Edited = 5
    Refused = 6
    Stored = 7
    Published = 8


class EnumClass(object):

    @staticmethod
    def get_news_category_list():
        pass

    @staticmethod
    def get_news_category_name(cid):
        pass
