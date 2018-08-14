# -*- coding=utf-8 -*-

from handlers.handlers import ManuscriptEditHandler, ManuscriptListHandler


manuscript_routes = [{
    'path': r"manuscript/<int:id>",
    'handler': ManuscriptEditHandler
}, {
    'path': r"manuscript/list",
    'handler': ManuscriptListHandler
}]
