# -*- coding=utf-8 -*-

from models.src.base_model import BaseModel, BaseSearchModel
from enums.enums import ManuscriptStatusEnum


class ManuscriptSearch(BaseSearchModel):
    def __init__(self, status=0, keyword=None):
        self.status = status
        self.keyword = keyword
        super().__init__()


class ManuscriptInfo(BaseModel):

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.title = kw.get('title')
        self.keywords = kw.get('keywords')
        self.subject = kw.get('subject')
        self.result = kw.get('result')
        self.category = kw.get('category')
        self.category_name = kw.get('category_name')
        self.file = kw.get('file')
        self.is_self = kw.get('is_self')
        self.is_published = kw.get('is_published')
        self.user_id = kw.get('user_id')
        self.user_name = kw.get('user_name')
        self.edit_user_id = kw.get('edit_user_id')
        self.create_time = kw.get('create_time')
        self.del_flag = kw.get('del_flag')
        self.periodical_category = kw.get('periodical_category')
        self.periodical_category_name = kw.get('periodical_category_name')
        self.periodical_summary = kw.get('periodical_summary')


class ManuscriptAuthor(BaseModel):

    def __init__(self, **kw):
        self.manuscript_id = kw.get('manuscript_id')
        self.province = kw.get('province')
        self.province_name = kw.get('province_name')
        self.city = kw.get('city')
        self.city_name = kw.get('city_name')
        self.district = kw.get('district')
        self.district_name = kw.get('district_name')
        self.name = kw.get('author_name') if kw.get('name') is None else kw.get('name')
        self.tel = kw.get('tel')
        self.email = kw.get('email')
        self.company_name = kw.get('company_name')
        self.company_address = kw.get('company_address')
        self.company_zip_code = kw.get('company_zip_code')


