# -*- coding=utf-8 -*-

from models.src.base_model import BaseModel


class Area(BaseModel):

    def __init__(self, id=None, pid=None, name=None):
        self.id = id
        self.pid = pid
        self.name = name

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.pid = kw.get('pid')
        self.name = kw.get('name')
