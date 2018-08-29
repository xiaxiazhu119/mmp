# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL
from utils.utils import Utils
from enums.enums import ManuscriptStatusEnum


class ManuscriptDAL(object):
    __base = BaseDAL()

    def __init__(self, *args):
        pass

    def get_info(self, id):
        sql = """SELECT * FROM mmp__v_manuscript WHERE id = %s;"""
        rst = self.__base.fetch_all(sql, (str(id),))
        return None if len(rst) == 0 else rst[0]

    def create(self, info, author):

        # sql = """INSERT INTO mmp_manuscript (title,keywords,subject,result,category,category_name,file,is_self,is_published,status,user_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id;"""
        # params = (info.title, info.keywords, info.subject, info.result, info.category, info.category_name, info.file, info.is_self, info.is_published, info.periodical_category, info.periodical_category_name, info.periodical_summary, info.status, info.user_id,
        #           author.province, author.province_name, author.city, author.city_name, author.district, author.district_name, author.name, author.tel, author.email, author.company_name, author.company_address, author.company_zip_code)
        # rst = self.__base.callproc('create_edit_manuscript', params)
        # return 0 if len(rst) == 0 else rst[0][0]
        return self.create_edit(info, author)

    def edit(self, info, author):
        # sql = """UPDATE mmp_manuscript SET title = %s, keywords = %s, subject = %s, result = %s, category = %s, category_name = %s, file = %s, is_self = %s, is_published = %s, periodical_category = %s, periodical_category_name = %s, periodical_summary = %s, status = %s WHERE id = %s;"""
        # sql += """UPDATE mmp_manuscript_author SET province = %s, province_name = %s, city = %s, city_name = %s, district = %s, district_name = %s, name = %s, tel = %s, email = %s, company_name = %s, company_address = %s, company_zip_code = %s WHERE manuscript_id = %s;"""
        # rst = self.__base.fetch_rowcount(sql, (info.title, info.keywords, info.subject, info.result, info.category, info.category_name, info.file, info.is_self, info.is_published, info.periodical_category, info.periodical_category_name, info.periodical_summary, info.status, info.id,
        #                                        author.province, author.province_name, author.city, author.city_name, author.district, author.district_name, author.name, author.tel, author.email, author.company_name, author.company_address, author.company_zip_code, info.id))
        # return rst
        return self.create_edit(info, author)

    def create_edit(self, info, author):
        params = (info.id, info.title, info.keywords, info.subject, info.result, info.category, info.category_name, info.file, info.is_self, info.is_published, info.periodical_category, info.periodical_category_name, info.periodical_summary, info.user_id, info.edit_user_id,
                  author.province, author.province_name, author.city, author.city_name, author.district, author.district_name, author.name, author.tel, author.email, author.company_name, author.company_address, author.company_zip_code)
        rst = self.__base.callproc('create_edit_manuscript', params)
        return 0 if len(rst) == 0 else rst[0][0]

    def get_list(self, sc):
        params = []
        condition = """ WHERE 1=1 """
        status_condition = ''

        if sc.get('keyword') is not None:
            condition += """ AND title LIKE %s """
            params.append("""%""" + sc['keyword'] + """%""")

        if sc.get('category') is not None:
            condition += """ AND category = %s """
            params.append(sc['category'])

        if sc.get('authorName') is not None:
            condition += """ AND author_name LIKE %s """
            params.append("""%""" + sc['authorName'] + """%""")

        if sc.get('companyName') is not None:
            condition += """ AND company_name LIKE %s """
            params.append("""%""" + sc['companyName'] + """%""")

        if sc.get('status') is not None and sc['status'] != '0':
            status_condition = """ AND status = """ + str(sc['status'])
            # condition += """ AND status = %s """
            # params.append(sc['status'])

        if sc.get('userId') is not None and sc['userId'] != '0':
            condition += """ AND user_id = %s """
            params.append(sc['userId'])

        if sc.get('type') == 2:
            condition += """  """
            status_condition = """ AND status IN (""" + str(ManuscriptStatusEnum.Stored.value)+""","""+str(ManuscriptStatusEnum.Confirmed.value)+""")"""

            if sc.get('isConfirm') is not None:
                v = ManuscriptStatusEnum.Stored.value if sc.get('isConfirm') == 0 else ManuscriptStatusEnum.Confirmed.value
                status_condition = """ AND status = """ + str(v)

            # if sc.get('isConfirm') is not None:
            #     operator = '=' if sc.get('isConfirm') == 0 else '>'
            #     condition += """ AND confirm_id """+operator+""" 0 """

        elif sc.get('type') == 3:
            condition += """ AND publish_id != 0 """
        else:
            print('normal')

        condition += status_condition

        cnt_sql = """SELECT COUNT(1) AS cnt FROM mmp__v_manuscript """ + condition + """;"""
        rst = self.__base.fetch_one(cnt_sql, params)
        cnt = rst['cnt']

        sql = """SELECT id,title,category_name,status,user_id,user_name,create_time,province_name,city_name,district_name,author_name,company_name,confirm_id,publish_id,store_id,store_time,review_file FROM mmp__v_manuscript """
        sql += condition
        sql += """ ORDER BY id DESC """
        sql += """ LIMIT %s OFFSET %s ; """

        page_size = int(sc['pageSize'] if sc['pageSize'] is not None else 10)
        page_index = int(sc['pageIndex'] if sc['pageIndex'] is not None else 1 )-1

        params.append(page_size)
        params.append(page_size*page_index)

        rst = self.__base.fetch_all(sql, params)

        return rst, cnt

    def update_status(self, id, status):
        sql = """UPDATE mmp_manuscript SET status = %s WHERE id = %s AND del_flag = False;"""
        rst = self.__base.fetch_rowcount(sql, (str(status), str(id)))
        return rst

    def review(self, review):
        sql = """INSERT INTO mmp_manuscript_review_log(manuscript_id,status,file,expire,user_id)VALUES(%s,%s,%s,%s,%s) RETURNING id;"""
        rst = self.__base.fetch_all(sql, (review.manuscript_id, review.status, review.file, review.expire, review.user_id))
        id = self.__base.get_returning_id(rst)
        return id

    def get_latest_review(self, manuscript_id):
        sql = """SELECT id, manuscript_id,status,file,expire,user_id FROM mmp_manuscript_review_log WHERE del_flag = False AND manuscript_id = %s ORDER BY id DESC LIMIT 1;"""
        rst = self.__base.fetch_all(sql, (str(manuscript_id),))
        return None if len(rst) == 0 else rst[0]

    def store(self, manuscript_id, user_id):
        sql = """INSERT INTO mmp_manuscript_store_log(manuscript_id,user_id)VALUES(%s,%s);"""
        return self.__base.fetch_rowcount(sql, (manuscript_id, user_id))

    def confirm(self, manuscript_id, user_id):
        sql = """INSERT INTO mmp_manuscript_confirm_log(manuscript_id,user_id)VALUES(%s,%s);"""
        return self.__base.fetch_rowcount(sql, (manuscript_id, user_id))

    def publish(self, pub):
        sql = """INSERT INTO mmp_manuscript_publish_log(manuscript_id,year,term,user_id)VALUES(%s,%s,%s,%s);"""
        return self.__base.fetch_rowcount(sql, (pub.manuscript_id, pub.year, pub.term, pub.user_id))

    def get_original_info(self, manuscript_id):
        sql = """SELECT * FROM mmp_manuscript_edit_log WHERE manuscript_id = %s ORDER BY id LIMIT 1;"""
        rst = self.__base.fetch_all(sql, (str(manuscript_id),))
        return None if len(rst) == 0 else rst[0]
