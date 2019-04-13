import openerp.http as http
import json,logging
from openerp import models, fields
from openerp.http import request
from ...utils.credentials import Credentials
_logger = logging.getLogger("associaciones_controller")

class AssociacionesController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/get-associaciones', type="http", auth="none",website=True, cors="*")
    def getAssociaciones(self,**post):
        _logger.info("**** ASSOCIACIONES *******")
        fields = ['user_client','surname_client','phone_client','email_client','nombre_zonas','nombre_turno','description','delivered','import_','user_lawyer']
        search = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['categories_slug', '=',6]]])
        _logger.info(search)

        return json.dumps(search)