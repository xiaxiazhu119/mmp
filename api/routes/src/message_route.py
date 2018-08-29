# -*- coding=utf-8 -*-

from handlers.handlers import MessageEditHandler, MessageListHandler


message_routes = [{
    'path': r"message/<int:id>",
    'handler': MessageEditHandler
}, {
    'path': r"message/list",
    'handler': MessageListHandler
}]
