import openerp.http as http
import json, logging, xmlrpclib, socket
from openerp.http import request
from ...utils.credentials import Credentials
from datetime import datetime

_logger = logging.getLogger("visitors_controller")

class VisitorsController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/calculate-visitors', type="http", auth="none",website=True, cors="*")
    def calculateVisitors(self):
        _logger.info("CALCULATE_VISITORS")

        date_now = datetime.today().date()
        ip_visitor = request.httprequest.headers.environ['REMOTE_ADDR']
        
        search = self._models.execute_kw(self._db, self._uid, self._password,'visitors.web',
        'search_count',[[['ip_visitor', '=', ip_visitor],['date_visitor','=',str(date_now)]]])
        _logger.info(search)

        if search == 0:
            search_num_visitors = self._models.execute_kw(self._db, self._uid, self._password,'visitors.web',
            'search_read',[[['date_visitor', '=', str(date_now)]]])
            _logger.info(search_num_visitors)

            num_visitors = 0
            if len(search_num_visitors) != 0:
                num_visitors = search_num_visitors[0]['num_visitors']

            try:
                # solo elimina 1 fila de la fecha de hoy
                for visitors in search_num_visitors:
                    self._models.execute_kw(self._db, self._uid, self._password, 'visitors.web', 'unlink', [[int(visitors['id'])]])

                self._models.execute_kw(self._db, self._uid, self._password, 'visitors.web', 'create', [{
                    'ip_visitor': ip_visitor,
                    'num_visitors': num_visitors + 1,
                    'date_visitor':str(date_now)
                }])
            except Exception as e:
                _logger.info(e)
                return json.dumps({"error":"Ha habido algun problema al crear algun dato"})

        return json.dumps({"message":True})