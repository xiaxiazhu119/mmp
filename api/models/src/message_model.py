# -*- coding=utf-8 -*-

from models.src.base_model import BaseModel, BaseSearchModel


class MessageInfo(BaseModel):

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.type = kw.get('type')
        self.title = kw.get('title')
        self.content = kw.get('content')
        self.scope_type = kw.get('scope_type')
        self.scope_value = kw.get('scope_value')
        self.user_id = kw.get('user_id')
        self.user_name = kw.get('user_name')
        self.create_time = kw.get('create_time')
        self.del_flag = kw.get('del_flag')
