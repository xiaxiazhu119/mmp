# -*- coding=utf-8 -*-

from enum import Enum


class MethodEnum(Enum):
    GET = 1
    POST = 2
    PUT = 3
    DELETE = 4


class NewsCategoryEnum(Enum):
    C1 = 1
    C2 = 2


class ManuscriptStatusEnum(Enum):
    Pending = 1
    Return = 2
    Edited = 3
    Refused = 4
    Stored = 5
    Published = 6


class EnumClass(object):

    @staticmethod
    def get_news_category_list():
        pass

    @staticmethod
    def get_news_category_name(cid):
        pass
