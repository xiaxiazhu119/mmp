# -*- coding=utf-8 -*-

from handlers.handlers import ManuscriptEditHandler, ManuscriptListHandler,  ManuscriptReviewHandler, ManuscriptLatestReviewHandler, ManuscriptStoreHandler, ManuscriptConfirmHandler, ManuscriptPublishHandler


manuscript_routes = [{
    'path': r"manuscript/<int:id>",
    'handler': ManuscriptEditHandler
}, {
    'path': r"manuscript/list",
    'handler': ManuscriptListHandler
}, {
    'path': r"manuscript/review",
    'handler': ManuscriptReviewHandler
}, {
    'path': r"manuscript/review/latest/<int:manuscript_id>",
    'handler': ManuscriptLatestReviewHandler
}, {
    'path': r"manuscript/store",
    'handler': ManuscriptStoreHandler
}, {
    'path': r"manuscript/confirm",
    'handler': ManuscriptConfirmHandler
}, {
    'path': r"manuscript/publish",
    'handler': ManuscriptPublishHandler
}]
