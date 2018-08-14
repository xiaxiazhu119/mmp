# -*- coding=utf-8 -*-
import os
from flask import Blueprint, render_template, redirect, send_from_directory

from handlers.src.base_handler import BaseHandler


class WebHandler(BaseHandler):
    __wwwroot_default_path = "index.html"
    __root = "../wwwroot/dist/"

    def get(self):
        return send_from_directory(self.__root, self.__wwwroot_default_path)
