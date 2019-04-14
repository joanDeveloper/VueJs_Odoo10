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
    def getAssociaciones(self):
        _logger.info("**** ASSOCIACIONES *******")
        fields = ['user_client','surname_client','phone_client','email_client','nombre_zonas','nombre_turno','description','delivered','import_','user_lawyer']
        search = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['categories_slug', '=',6]]])
        _logger.info(search)

        return json.dumps(search)
    
    @http.route('/post-asociaciones', type="json", auth="none",website=True, cors="*")
    def postAsociaciones(self):
        _logger.info("**** POST ASOCIACIONES *******")
        data = request.jsonrequest
        _logger.info(data)
        #comprobar si ya esta inscrito
        try:
            self._models.execute_kw(self._db, self._uid, self._password, 'asociaciones.lawyer', 'create', [{
                'user_lawyer': data['payload']['id_user'],
                'user_asociation': data['payload']['id_asociacion']}])
        except Exception as e:
            return json.dumps({"error":{"message":"error al crear relacion con la asociacion"}})

        # fields = ['user_client','surname_client','phone_client','email_client','nombre_zonas','nombre_turno','description','delivered','import_','user_lawyer']
        # search = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        # 'create',[[['categories_slug', '=',6]]])
        # _logger.info(search)

        return json.dumps({"message":"Te has inscrito correctamente"})

    @http.route('/getLawyers-interesados/<id_associacion>', type="http", auth="none",website=True, cors="*")
    def getLawyersInteresados(self,**post):
        _logger.info("**** LAWYERS INTERESADOS *******")
        _logger.info(post['id_associacion'])
        # fields = ['user_client','surname_client','phone_client','email_client','nombre_zonas','nombre_turno','description','delivered','import_','user_lawyer']
        search = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_read',[[['user_asociation', '=',int(post['id_associacion'])]]])
        _logger.info(search)

        return json.dumps(search)