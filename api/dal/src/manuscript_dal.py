# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL

from utils.utils import Utils


class ManuscriptDAL(object):
    __base = BaseDAL()

    def __init__(self, *args):
        pass

    def create(self, info, author):

        # sql = """INSERT INTO mmp_manuscript (title,keywords,subject,result,category,category_name,file,is_self,is_published,status,user_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id;"""
        params = (info.title, info.keywords, info.subject, info.result, info.category, info.category_name, info.file, info.is_self, info.is_published, info.periodical_category, info.periodical_category_name, info.periodical_summary, info.status, info.user_id,
                  author.province, author.province_name, author.city, author.city_name, author.district, author.district_name, author.name, author.tel, author.email, author.company_name, author.company_address, author.company_zip_code)
        rst = self.__base.callproc('create_manuscript', params)
        return 0 if len(rst) == 0 else rst[0][0]

    def edit(self, info, author):
        pass

    def get_list(self, sc):
        params = []
        condition = """ WHERE 1=1 """

        if sc.get('keyword') is not None:
            condition += """ AND title LIKE %s """
            params.append("""%""" + sc['keyword'] + """%""")

        if sc.get('status') is not None and sc['status'] != '0':
            condition += """ AND status = %s """
            params.append(sc['status'])

        cnt_sql = """SELECT COUNT(1) AS cnt FROM mmp__v_manuscript """ + condition + """;"""
        rst = self.__base.fetch_one(cnt_sql, params)
        cnt = rst['cnt']

        sql = """SELECT id,title,category_name,status,user_id,user_name,create_time,province_name,city_name,district_name,author_name,company_name FROM mmp__v_manuscript """
        sql += condition
        sql += """ ORDER BY id DESC """
        sql += """ LIMIT %s OFFSET %s ; """

        page_size = int(sc['pageSize'])
        page_index = int(sc['pageIndex'])-1

        params.append(page_size)
        params.append(page_size*page_index)

        rst = self.__base.fetch_all(sql, params)

        return rst, cnt

    def create_manuscript_doc_log(self, manuscript_id, user_id, file):
        sql = """INSERT INTO mmp_manuscript_doc_log (manuscript_id,user_id,file) VALUES (%s,%s) RETURNING id;"""
        rst = self.__base.fetch_all(sql, (manuscript_id, user_id, file))[0]
        return rst[0]['id'] if len(rst) > 0 else 0

    def update_manuscript_doc_log_mid(self, id, manuscript_id):
        sql = """UPDATE mmp_manuscript_doc_log SET manuscript_id = %s WHERE id = %s;"""
        return self.__base.fetch_rowcount(sql, (manuscript_id, id))
