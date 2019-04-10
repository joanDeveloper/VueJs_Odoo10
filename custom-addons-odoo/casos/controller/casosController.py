import openerp.http as http
import json,logging
from openerp import models, fields, api
from openerp.http import request
from ...utils.credentials import Credentials
_logger = logging.getLogger("casos_controller")

class CasosController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/get-casos/<idLawyer>', type="http", auth="none",website=True, cors="*")
    def getCasos(self,**post):
        _logger.info("**** CASOS *******")
        _logger.info(post['idLawyer'])
        fields = ['user_client','surname_client','phone_client','email_client','nombre_zonas','nombre_turno','description','delivered','import_','user_lawyer']
        search = self._models.execute_kw(self._db, self._uid, self._password,'casos.lawyer',
        'search_read',[[['user_lawyer', '=',int(post['idLawyer'])]],fields])
        _logger.info(search)

        return json.dumps(search)