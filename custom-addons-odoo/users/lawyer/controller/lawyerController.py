import openerp.http as http
import json, logging, xmlrpclib, base64
from openerp.http import request
#from ...utils.credentials import Credentials

_logger = logging.getLogger("lawyer_controller")

class LawyerController(http.Controller):
    def __init__(self):
        url = 'http://51.75.31.239:8069'
        db = base64.b64decode("bGliZXJ0eQ==")
        username = base64.b64decode('am9hbm1vZGF3QGdtYWlsLmNvbQ==')
        password = base64.b64decode('QW1waUpvYW5ldDMwMTExMg==')

        common = xmlrpclib.ServerProxy('{}/xmlrpc/2/common'.format(url))
        uid = common.authenticate(db, username, password, {})
        models = xmlrpclib.ServerProxy('{}/xmlrpc/2/object'.format(url))
        #credential = Credentials().models()
        self._models = models
        self._db = db
        self._uid = uid
        self._password = password

    @http.route('/lawyers', type="http", auth="none",website=True, cors="*")
    def getAll(self):
        _logger.info("GET_LAWYERS")
        searchRead = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        'search_read',[[]])
        _logger.info(searchRead)
        return json.dumps(searchRead)
