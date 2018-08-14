# -*- coding=utf-8 -*-
from flask import Flask, send_from_directory, request, render_template, make_response
from flask_restful import reqparse, abort, Api, Resource
from flask_cors import CORS


from utils.utils import Utils
from routes.src.wwwroot_routes import wwwroot_route
from routes.src.base_route import BaseRoute

__api_path = '/api/'

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
# app.register_blueprint(wwwroot_route, url_prefix='/')

api = Api(app)


parser = reqparse.RequestParser()

base_route = BaseRoute()
route_list = base_route.get_route_list()

for _route in route_list:
    # __path = '/' if _route.get('is_root') else '/api/'
    api.add_resource(_route['handler'], __api_path + _route['path'])



if __name__ == '__main__':
    app.run()
