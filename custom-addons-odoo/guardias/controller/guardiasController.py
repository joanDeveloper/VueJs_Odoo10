import openerp.http as http
import json, logging, xmlrpclib, base64
from openerp.http import request
from ...utils.credentials import Credentials
from fpdf import FPDF

_logger = logging.getLogger("guards_controller")

class GuardiasController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/getGuards/<idUser>', type="http", auth="none",website=True, cors="*")
    def getGuardia(self,**post):
        _logger.info("GET_GUARDS")
        _logger.info(post)
        _logger.info(post['idUser'])
        fields = ['user_lawyer','nombre_zonas','nombre_turno','date_attendance','delivered']
        search = self._models.execute_kw(self._db, self._uid, self._password,'guards.lawyers',
        'search_read',[[['user_lawyer', '=', int(post['idUser'])]]])
        _logger.info(search)
        return json.dumps(search)