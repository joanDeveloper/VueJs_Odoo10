import openerp.http as http
from openerp.http import Response
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
    
    @http.route('/post-asociacioness', type="json", auth="none",website=True, cors="*")
    def postAsociaciones(self):
        _logger.info("**** POST ASOCIACIONES *******")
        # data = request.jsonrequest
        # _logger.info(data)
        # comprobar si ya esta inscrito
        # searchCount = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        # 'search_count',[[{
        #     'user_lawyer',"=", data['payload']['id_user'],
        #     'user_asociation',"=", data['payload']['id_asociacion']}
        # ]])
        # _logger.info(searchCount)
        # if searchCount == 0:
        #     try:
        #         self._models.execute_kw(self._db, self._uid, self._password, 'asociaciones.lawyer', 'create', [{
        #             'user_lawyer': data['payload']['id_user'],
        #             'user_asociation': data['payload']['id_asociacion']}])
        #     except Exception as e:
        #         return json.dumps({"error":{"message":"error al crear relacion con la asociacion"}})

        #     return json.dumps({"message":"Te has inscrito correctamente"})
        # else:
        #     return json.dumps({"message":"Ya estas inscrito a esta asociacion"})
    @http.route('/getLawyers-interesados/<id_associacion>', type="http", auth="none",website=True, cors="*")
    def getLawyersInteresados(self,**post):
        _logger.info("**** LAWYERS INTERESADOS *******")
        _logger.info(post['id_associacion'])
        search = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_read',[[['user_asociation', '=',int(post['id_associacion'])]]])
        
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=',user['user_lawyer'][0]]]])
            user['userDetail'] = searchUser[0]

        return json.dumps(search)
    
    @http.route('/postLawyer-interesado', type="json", auth="none",website=True, cors="*")
    def postAsociaciones(self):
        _logger.info("**** POST LAWYER INTERESADO *******")
        data = request.jsonrequest
        _logger.info(data)
        
        searchCount = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_count',[
            [['user_asociation', '=', int(data['payload']['id_asociacion'])],
            ['selected', '=', True]]])
        _logger.info(searchCount)

        if searchCount == 0:
            try:
                writeInteresado = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer', 'write', [[int(data['payload']['id_interesado'])], {
                    'selected': True
                }])
            except Exception as e:
                _logger.info(e)
                return json.dumps({"error":"Ha habido algun problema al actualizar algun dato"})
            
            search = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
            'search_read',[[['user_asociation', '=',int(data['payload']['id_asociacion'])]]])
            
            for user in search:
                searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
                'search_read',[[['id', '=',user['user_lawyer'][0]]]])
                user['userDetail'] = searchUser[0]
            
            return json.dumps(search)
        else:
            return json.dumps({"message":"No puedes elegir 2 abogados"})
    
    @http.route('/delete-interesado', type="json", auth="none",website=True, cors="*")
    def deleteInteresados(self,**post):
        _logger.info("**** DELETE INTERESADOS *******")
        data = request.jsonrequest
        _logger.info(data['payload']['id_asociacion'])
        try:
            writeInteresado = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer', 'write', [[int(data['payload']['id_interesado'])], {
                'selected': False
            }])
        except Exception as e:
            _logger.info(e)
            return json.dumps({"error":"Ha habido algun problema al actualizar algun dato"})
        
        search = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_read',[[['user_asociation', '=',int(data['payload']['id_asociacion'])]]])
        
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=',user['user_lawyer'][0]]]])
            user['userDetail'] = searchUser[0]

        return json.dumps(search)

    @http.route('/postInteresado', type="json", auth="none",website=True, cors="*")
    def postAsociacionesInteresado(self,**post):
        _logger.info("**** POST__INTERESADOS *******")
        data = request.jsonrequest
        #comprobar si ya esta inscrito
        searchCount = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_count',[
            [['user_asociation', '=', int(data['payload']['id_asociacion'])],
            ['user_lawyer', '=', int(data['payload']['id_user'])]]])
        _logger.info(searchCount)
        if searchCount == 0:
            try:
                self._models.execute_kw(self._db, self._uid, self._password, 'asociaciones.lawyer', 'create', [{
                    'user_lawyer': data['payload']['id_user'],
                    'user_asociation': data['payload']['id_asociacion']}])
            except Exception as e:
                return json.dumps({"error":{"message":"error al crear relacion con la asociacion"}})

            return json.dumps({"message":"Te has inscrito correctamente"})
        else:
            return json.dumps({"message":"Ya estas inscrito a esta asociacion"})
    
    @http.route('/post-desuscribe', type="json", auth="none",website=True, cors="*")
    def postDesuscribe(self,**post):
        _logger.info("**** POST__DESUSCRIBE *******")
        data = request.jsonrequest
        #comprobar si ya esta inscrito
        searchCount = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_count',[
            [['user_asociation', '=', int(data['payload']['id_asociacion'])],
            ['user_lawyer', '=', int(data['payload']['id_interesado'])]]
        ])
        _logger.info(searchCount)
        if searchCount > 0:
            try:
                search = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
                'search_read',[[
                    ['user_asociation', '=',int(data['payload']['id_asociacion'])],
                    ['user_lawyer', '=', int(data['payload']['id_interesado'])]
                ]])
                _logger.info(search)
                _logger.info(search[0]['id'])
                self._models.execute_kw(self._db, self._uid, self._password, 'asociaciones.lawyer', 'unlink', [[int(search[0]['id'])]])
            except Exception as e:
                return json.dumps({"error":{"message":"error al eliminar datos"}})

            return json.dumps({"message":"Te has desuscrito correctamente"})
        else:
            return json.dumps({"message":"No estas inscrito a esta asociacion"})
    
    @http.route('/getAsociaciones-interesados/<id_lawyer>', type="http", auth="none",website=True, cors="*")
    def getAsociacionesInteresados(self,**post):
        _logger.info("**** ASOCIACIONES INTERESADAS *******")
        _logger.info(post['id_lawyer'])
        search = self._models.execute_kw(self._db, self._uid, self._password,'asociaciones.lawyer',
        'search_read',[[
            ['user_lawyer', '=',int(post['id_lawyer'])],
            ['selected', '=',True]
        ]])
        _logger.info(search)
        # searchAsociacion = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        # 'search_read',[[
        #     ['id', '=',int(search[0]['user_asociation'])]
        # ]])
        return json.dumps(search)