import openerp.http as http
import json,logging
from openerp import models, fields, api
from openerp.http import request
from ...utils.credentials import Credentials
_logger = logging.getLogger("forum_controller")

class ForumController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']
    
    @http.route('/get-temesForum', type="http", auth="none",website=True, cors="*")
    def getTemesForum(self):
        _logger.info("TEMES_FORUM")
        search = self._models.execute_kw(self._db, self._uid, self._password,'temes.forum',
        'search_read',[[]])
        _logger.info(search)
        return json.dumps(search)

    @http.route('/create-commentForum', type="json", auth="none",website=True, cors="*")
    def writeCommentForum(self):
        _logger.info("COMENTARIOS_FORUM")
        data = request.jsonrequest
        _logger.info(data)

        # return json.dumps({"comments":search})