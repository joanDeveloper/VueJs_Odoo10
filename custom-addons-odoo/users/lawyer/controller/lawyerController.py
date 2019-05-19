import openerp.http as http
import json, logging, xmlrpclib, base64
from openerp.http import request
from ....utils.credentials import Credentials

_logger = logging.getLogger("lawyer_controller")

class LawyerController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/users/', type="json", auth="none",website=True, cors="*")
    def get(self):
        data = request.jsonrequest
        _logger.info(data['data'])
        fields = ['slug','name','apellidos','num_colegiado','cod_postal','email','ejerciente']

        search = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['categories_slug', '=', data['data']['category']]],fields],
        {"limit":data['data']['filters']['limit'],"offset":data['data']['filters']['offset']})

        searchCount = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_count',[[['categories_slug', '=', data['data']['category']]]])

        _logger.info(search)
        dataJson = {
            "users":search,
            "usersCount":searchCount
        }
        return json.dumps(dataJson)

    @http.route('/userFilter/', type="json", auth="none",website=True, cors="*")
    def getUserFiltered(self):
        data = request.jsonrequest
        _logger.info(data['data'])

        search = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['categories_slug', '=',  data['data']['page']['category']], 
        ['name', 'ilike', data['data']['name']],
        ['apellidos', 'ilike', data['data']['surname']],
        ['email', 'ilike', data['data']['email']]
        ]],
        {"limit":data['data']['page']['filters']['limit'],
        "offset":data['data']['page']['filters']['offset']})
        _logger.info(search)

        searchCount = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_count',[[['categories_slug', '=',  data['data']['page']['category']], 
        ['name', 'ilike', data['data']['name']],
        ['apellidos', 'ilike', data['data']['surname']],
        ['email', 'ilike', data['data']['email']]
        ]])

        _logger.info(search)
        dataJson = {
            "users":search,
            "usersCount":searchCount
        }
        return json.dumps(dataJson)

    @http.route('/detail/', type="json", auth="none",website=True, cors="*")
    def getDetail(self):
        data = request.jsonrequest
        _logger.info(data['data'])
        fields = ['slug','name','apellidos','num_colegiado','cod_postal','email','ejerciente','direccion','fax','telefono']
        searchDetail = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['num_colegiado', '=', data['data']]],fields])

        _logger.info(searchDetail)
        return json.dumps(searchDetail)
    
    @http.route('/count-all-users/', type="http", auth="none",website=True, cors="*")
    def getAllusers(self):
        countUsers = {}
        _logger.info("**** ALL_USERS ****")

        # countLawyer = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        # 'search_count',[['categories_slug','=','1']])

        countLawyer = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        'search_count',[[['categories_slug', '=', 1]]])

        countClient = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        'search_count',[[['categories_slug', '=', 4]]])

        countAsociation = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        'search_count',[[['categories_slug', '=', 6]]])

        _logger.info(countLawyer)
        _logger.info(countClient)
        _logger.info(countAsociation)

        countUsers['countLawyer'] = countLawyer
        countUsers['countClient'] = countClient
        countUsers['countAsociation'] = countAsociation

        return json.dumps({"countUsers":countUsers})