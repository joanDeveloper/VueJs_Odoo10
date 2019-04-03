import openerp.http as http
import json,logging
from openerp import models, fields, api
from openerp.http import request
from ...utils.credentials import Credentials
_logger = logging.getLogger("comentarios_controller")

class CommentsController(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']

    @http.route('/create-comments', type="json", auth="none",website=True, cors="*")
    def writeComment(self):
        _logger.info("COMENTARIOS")
        data = request.jsonrequest
        _logger.info(data)
        _logger.info(data['payload']['id'])
        _logger.info(data['payload']['currentUser']['id'])
        _logger.info(data['payload']['comment'])
        
        try:
            self._models.execute_kw(self._db, self._uid, self._password, 'comment.items', 'create', [{
                'user_lawyer_id': data['payload']['id'],
                'user_client_id': data['payload']['currentUser']['id'],
                'comment': data['payload']['comment']}])
        except Exception as e:
            return json.dumps({"error":{"message":"error al crear comentario " + e}})

        fields = ['comment','user_lawyer_id','user_client_id','email']
        search = self._models.execute_kw(self._db, self._uid, self._password,'comment.items',
        'search_read',[[['user_lawyer_id', '=', data['payload']['id']]],fields])
        _logger.info(search)
        # obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['user_client_id'][0]]],['nombre','email']])
            search[cont]['user_client_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"comments":search})
    
    @http.route('/get-comments/<numCol>', type="http", auth="none",website=True, cors="*")
    def getComment(self,**post):
        _logger.info(post['numCol'])
        num_colegiado = post['numCol']

        searchId = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
        'search_read',[[['num_colegiado', '=', num_colegiado]],['id']])

        _logger.info(searchId)
        fields = ['comment','user_lawyer_id','user_client_id']
        searchComments = self._models.execute_kw(self._db, self._uid, self._password,'comment.items',
        'search_read',[[['user_lawyer_id', '=', searchId[0]['id']]],fields])
        # obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in searchComments:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['user_client_id'][0]]],['nombre','email']])
            searchComments[cont]['user_client_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"comments":searchComments})