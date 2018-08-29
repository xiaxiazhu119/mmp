# -*- coding=utf-8 -*-

from models.models import User, UserProfile, ManuscriptInfo, ManuscriptAuthor, ManuscriptReview, ManuscriptPublish, MessageInfo


class ModelTransferHelper(object):
    keys_relation = None
    obj = None

    def transfer_to_py(self, data):
        # model = dict(map(lambda x: (x[1], '' if data.get(x[0]) is None else data[x[0]]), self.keys_relation))
        for key in self.keys_relation:
            ts_attr = key[0]
            d = data.get(ts_attr)
            setattr(self.obj, key[1], d)

        return self.obj


class UserModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('id', 'id'), ('userName', 'user_name'), ('pwd', 'pwd')]
        self.obj = User()


class UserProfileModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('userId', 'user_id'), ('name', 'name'), ('mobile', 'mobile'), ('email', 'email'),
                              ('province', 'province'), ('city', 'city'), ('district', 'district'),
                              ('provinceName', 'province_name'), ('cityName', 'city_name'), ('districtName', 'district_name'),
                              ('companyName', 'company_name'), ('companyAddress', 'company_address'), ('companyZipCode', 'company_zip_code'),
                              ('idCard', 'id_card')]
        self.obj = UserProfile()


class ManuscriptInfoModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('id', 'id'), ('title', 'title'), ('keywords', 'keywords'), ('subject', 'subject'),
                              ('result', 'result'), ('category', 'category'), ('categoryName', 'category_name'), ('file', 'file'),
                              ('isSelf', 'is_self'), ('isPublished', 'is_published'),
                              ('periodicalCategory', 'periodical_category'), ('periodicalCategoryName', 'periodical_category_name'), ('periodicalSummary', 'periodical_summary'),
                              ('userId', 'user_id'), ('editUserId', 'edit_user_id')]
        self.obj = ManuscriptInfo()


class ManuscriptAuthorModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('manuscriptId', 'manuscript_id'),
                              ('province', 'province'), ('city', 'city'), ('district', 'district'),
                              ('provinceName', 'province_name'), ('cityName', 'city_name'), ('districtName', 'district_name'),
                              ('name', 'name'), ('tel', 'tel'), ('email', 'email'),
                              ('companyName', 'company_name'), ('companyAddress', 'company_address'), ('companyZipCode', 'company_zip_code')]
        self.obj = ManuscriptAuthor()


class ManuscriptReviewModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('id', 'id'), ('manuscriptId', 'manuscript_id'),
                              ('status', 'status'), ('file', 'file'), ('expire', 'expire'),
                              ('userId', 'user_id')]
        self.obj = ManuscriptReview()


class ManuscriptPublishModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('manuscriptId', 'manuscript_id'), ('year', 'year'), ('term', 'term'), ('userId', 'user_id')]
        self.obj = ManuscriptPublish()


class MessageInfoModelTransferHelper(ModelTransferHelper):

    def __init__(self):
        self.keys_relation = [('id', 'id'), ('title', 'title'), ('type', 'type'), ('content', 'content'),
                              ('scopeType', 'scope_type'), ('scopeValue', 'scope_value'), ('userId', 'user_id')]
        self.obj = MessageInfo()
