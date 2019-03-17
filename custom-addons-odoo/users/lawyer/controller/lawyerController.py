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

    @http.route('/users/', type="json", auth="none",website=True, cors="*")
    def get(self):
        data = request.jsonrequest
        _logger.info(data['data'])
        fields = ['slug','nombre','apellidos','num_colegiado','cod_postal','email','ejerciente']

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
        ['nombre', 'ilike', data['data']['name']],
        ['apellidos', 'ilike', data['data']['surname']],
        ['email', 'ilike', data['data']['email']]
        ]],
        {"limit":data['data']['page']['filters']['limit'],
        "offset":data['data']['page']['filters']['offset']})
        _logger.info(search)

        searchCount = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_count',[[['categories_slug', '=',  data['data']['page']['category']], 
        ['nombre', 'ilike', data['data']['name']],
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
        fields = ['slug','nombre','apellidos','num_colegiado','cod_postal','email','ejerciente','direccion','fax','telefono']
        searchDetail = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['num_colegiado', '=', data['data']]],fields])

        _logger.info(searchDetail)
        return json.dumps(searchDetail)