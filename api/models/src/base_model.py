# -*- coding=utf-8 -*-


class BaseModel(object):
    def __init__(self):
        pass


class BaseSearchModel(BaseModel):
    def __init__(self, page_index=0, page_size=10):
        self.page_index = page_index
        self.page_size = page_size
        super().__init__()
