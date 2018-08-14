# -*- coding=utf-8 -*-

from models.src.base_model import BaseModel, BaseSearchModel
from enums.enums import ManuscriptStatusEnum


class ManuscriptSearch(BaseSearchModel):
    def __init__(self, status=0, keyword=None):
        self.status = status
        self.keyword = keyword
        super().__init__()


class ManuscriptInfo(BaseModel):
  
    def __init__(self, id=None, title=None, keywords=None, subject=None, result=None, category=0, category_name=None, file=None, is_self=True, is_published=None, periodical_category=0, periodical_category_name=None, periodical_summary=None, status=ManuscriptStatusEnum.Pending, user_id=0, create_time=None, del_flag=False):
        self.id = id
        self.title = title
        self.keywords = keywords
        self.subject = subject
        self.result = result
        self.category = category
        self.category_name = category_name
        self.file = file
        self.is_self = is_self
        self.is_published = is_published
        self.status = status
        self.user_id = user_id
        self.create_time = create_time
        self.del_flag = del_flag
        self.periodical_category = periodical_category
        self.periodical_category_name = periodical_category_name
        self.periodical_summary = periodical_summary

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
        self.status = kw.get('status')
        self.user_id = kw.get('user_id')
        self.create_time = kw.get('create_time')
        self.del_flag = kw.get('del_flag')
        self.periodical_category = kw.get('periodical_category')
        self.periodical_category_name = kw.get('periodical_category_name')
        self.periodical_summary = kw.get('periodical_summary')


class ManuscriptAuthor(BaseModel):

    def __init__(self, manuscript_id=0, province=0, province_name=None, city=0, city_name=None, district=0, district_name=None, name=None, tel=None, email=None, company_name=None, company_address=None, company_zip_code=None):
        self.manuscript_id = manuscript_id
        self.province = province
        self.province_name = province_name
        self.city = city
        self.city_name = city_name
        self.district = district
        self.district_name = district_name
        self.name = name
        self.tel = tel
        self.email = email
        self.company_name = company_name
        self.company_address = company_address
        self.company_zip_code = company_zip_code

    def __init__(self, **kw):
        self.manuscript_id = kw.get('manuscript_id')
        self.province = kw.get('province')
        self.province_name = kw.get('province_name')
        self.city = kw.get('city')
        self.city_name = kw.get('city_name')
        self.district = kw.get('district')
        self.district_name = kw.get('district_name')
        self.name = kw.get('name')
        self.tel = kw.get('tel')
        self.email = kw.get('email')
        self.company_name = kw.get('company_name')
        self.company_address = kw.get('company_address')
        self.company_zip_code = kw.get('company_zip_code')


class ManuscriptDocLog(BaseModel):

    def __init__(self, id=0, manuscript_id=0, user_id=0, file=None, create_time=None):
        self.id = id
        self.manuscript_id = manuscript_id
        self.user_id = user_id
        self.file = file
        self.create_time = create_time

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.manuscript_id = kw.get('manuscript_id')
        self.user_id = kw.get('user_id')
        self.file = kw.get('file')
        self.create_time = kw.get('create_time')

