import openerp.http as http
import json, logging
from openerp.http import request
from ...utils.credentials import Credentials

_logger = logging.getLogger("lawyer_controller")

class LawyerController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        # self._models = credential['models']
        # self._db = credential['db']
        # self._uid = credential['uid']
        # self._password = credential['password']

    @http.route('/lawyers', type="http", auth="none",website=True, cors="*")
    def getAll(self):
        _logger.info("GET_LAWYERS")
        # searchCount = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        # 'search_count',[])
        # _logger.info(searchCount)
