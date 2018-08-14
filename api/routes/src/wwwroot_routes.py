# -*- coding=utf-8 -*-
import os
from flask import Blueprint, render_template, redirect, send_from_directory

from utils.utils import Utils
from bll.bll import UserBLL

# user

wwwroot_route = Blueprint('wwwroot', __name__)


__wwwroot_paths = []
__wwwroot_default_path = "index.html"
__root = "../wwwroot/dist/"

for root, subdirs, files in os.walk(__root):
    if len(root) > len(__root):
        root += "/"

    for file in files:
        relativePath = str.replace(root + file, __root, "")
        __wwwroot_paths.append(relativePath)


# Special trick to capture all remaining routes
@wwwroot_route.route('<path:path>')
@wwwroot_route.route('', defaults={'path': ''})
def wwwroot(path):
    if path not in __wwwroot_paths:
        path = __wwwroot_default_path

    return send_from_directory(__root, path)
