# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL

from utils.utils import Utils


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

        if sc.get('keyword') is not None:
            condition += """ AND title LIKE %s """
            params.append("""%""" + sc['keyword'] + """%""")

        if sc.get('authorName') is not None:
            condition += """ AND author_name LIKE %s """
            params.append("""%""" + sc['authorName'] + """%""")

        if sc.get('companyName') is not None:
            condition += """ AND company_name LIKE %s """
            params.append("""%""" + sc['companyName'] + """%""")

        if sc.get('status') is not None and sc['status'] != '0':
            condition += """ AND status = %s """
            params.append(sc['status'])

        if sc.get('userId') is not None and sc['userId'] != '0':
            condition += """ AND user_id = %s """
            params.append(sc['userId'])

        if sc.get('type') == 2:
            condition += """ AND store_id != 0 """
        elif sc.get('type') == 3:
            condition += """ AND publish_id != 0 """
        else:
            print('normal')

        if sc.get('isConfirm') is not None:
            operator = '=' if sc.get('isConfirm') == 0 else '>'
            condition += """ AND confirm_id """+operator+""" 0 """

        cnt_sql = """SELECT COUNT(1) AS cnt FROM mmp__v_manuscript """ + condition + """;"""
        rst = self.__base.fetch_one(cnt_sql, params)
        cnt = rst['cnt']

        sql = """SELECT id,title,category_name,status,user_id,user_name,create_time,province_name,city_name,district_name,author_name,company_name,confirm_id,publish_id,store_id FROM mmp__v_manuscript """
        sql += condition
        sql += """ ORDER BY id DESC """
        sql += """ LIMIT %s OFFSET %s ; """

        page_size = int(sc['pageSize'])
        page_index = int(sc['pageIndex'])-1

        params.append(page_size)
        params.append(page_size*page_index)

        rst = self.__base.fetch_all(sql, params)

        return rst, cnt

    def update_status(self, id, status):
        sql = """UPDATE mmp_manuscript SET status = %s WHERE id = %s AND del_flag = False;"""
        rst = self.__base.fetch_rowcount(sql, (str(status), str(id)))
        return rst

    def create_manuscript_store_log(self, manuscript_id, user_id):
        sql = """INSERT INTO mmp_manuscript_store_log (manuscript_id, user_id)VALUES(%s,%s);"""
        rst = self.__base.fetch_rowcount(sql, (str(manuscript_id), str(user_id)))
        return rst

    def create_manuscript_doc_log(self, manuscript_id, user_id, file):
        sql = """INSERT INTO mmp_manuscript_doc_log (manuscript_id,user_id,file) VALUES (%s,%s) RETURNING id;"""
        rst = self.__base.fetch_all(sql, (manuscript_id, user_id, file))[0]
        return rst[0]['id'] if len(rst) > 0 else 0

    def update_manuscript_doc_log_mid(self, id, manuscript_id):
        sql = """UPDATE mmp_manuscript_doc_log SET manuscript_id = %s WHERE id = %s;"""
        return self.__base.fetch_rowcount(sql, (manuscript_id, id))
