import openerp.http as http
import json, logging, xmlrpclib, base64
from openerp.http import request
from ...utils.credentials import Credentials

_logger = logging.getLogger("profile_controller")

class ProfileController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/charge-money-profile', type="json", auth="none",website=True, cors="*")
    def chargeMoney(self):
        _logger.info("CHARGE_MONEY")
        data = request.jsonrequest
        _logger.info(data['currentUser']['id'])
        _logger.info(data['credits'])
        
        searchCredits = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['id', '=', int(data['currentUser']['id'])]]])
        #_logger.info(searchCredits['credits'])
        _logger.info(searchCredits[0]['credits'])

        if int(searchCredits[0]['credits']) > 0:
            data['credits'] = searchCredits[0]['credits'] + data['credits']
            _logger.info("*** CREDITS ******")
            _logger.info(data['credits'])

        try:
            writeUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer', 'write', [[int(data['currentUser']['id'])], {
                'credits': data['credits']
            }])
        except Exception as e:
            _logger.info(e)
            return json.dumps({"error":"Ha habido algun problema al actualizar algun dato"})
        
        #fields = ['slug','name','apellidos','num_colegiado','cod_postal','email','ejerciente','direccion','fax','telefono']
        searchTotalCredits = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['id', '=', int(data['currentUser']['id'])]]])
        _logger.info(searchTotalCredits)

        return json.dumps(searchTotalCredits)