import openerp.http as http
import json,logging
from openerp import models, fields, api
from openerp.http import request
from ...utils.credentials import Credentials
_logger = logging.getLogger("forum_controller")

class ForumController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']
    
    @http.route('/get-temesForum', type="http", auth="none",website=True, cors="*")
    def getTemesForum(self):
        _logger.info("TEMES_FORUM")
        search = self._models.execute_kw(self._db, self._uid, self._password,'temes.forum',
        'search_read',[[]])
        _logger.info(search)
        return json.dumps(search)

    @http.route('/create-commentForum', type="json", auth="none",website=True, cors="*")
    def writeCommentForum(self):
        _logger.info("COMENTARIOS_FORUM")
        data = request.jsonrequest
        _logger.info(data['payload']['currentUser']['id'])
        _logger.info(data['payload']['question'])
        _logger.info(data['payload']['id_tema'])
        try:
            self._models.execute_kw(self._db, self._uid, self._password, 'forum.lawyers', 'create', [{
                'id_tema':data['payload']['id_tema'],
                'question': data['payload']['question'],
                'client_id': data['payload']['currentUser']['id']
            }])
        except Exception as e:
            _logger.info(e)
            return json.dumps({"error":{"message":"error al crear pregunta en el forum"}})
        
        fields = ['question','client_id']
        search = self._models.execute_kw(self._db, self._uid, self._password,'forum.lawyers',
        'search_read',[[['id_tema', '=', data['payload']['id_tema']]],fields])
        _logger.info(search)
        #obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['client_id'][0]]],['email']])
            search[cont]['client_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"questions":search})