import openerp.http as http
import json, logging, xmlrpclib, base64
from openerp.http import request
from ...utils.credentials import Credentials

_logger = logging.getLogger("categories_controller")

class CategoriesController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/categories', type="http", auth="none",website=True, cors="*")
    def getAll(self):
        _logger.info("GET_CATEGORIES")
        searchRead = self._models.execute_kw(self._db,self._uid,self._password,'categories.list',
        'search_read',[[]])
        _logger.info(searchRead)
        return json.dumps(searchRead)