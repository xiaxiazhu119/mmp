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
    Return = 3
    Edited = 4
    Refused = 5
    Stored = 6
    Published = 7


class EnumClass(object):

    @staticmethod
    def get_news_category_list():
        pass

    @staticmethod
    def get_news_category_name(cid):
        pass
