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
    Confirmed = 7
    Published = 8


class MessageTypeEnum(Enum):
    Announcement = 1
    Notice = 2


class MessageScopeTypeEnum(Enum):
    All = 1
    District = 2
    Teacher = 3
    Single = 4


class EnumClass(object):
    pass
