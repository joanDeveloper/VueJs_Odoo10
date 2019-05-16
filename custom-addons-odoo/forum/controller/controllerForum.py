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
        _logger.info(data['payload']['subteme'])
        _logger.info(data['payload']['id_tema'])
        try:
            self._models.execute_kw(self._db, self._uid, self._password, 'forum.lawyers', 'create', [{
                'id_tema':data['payload']['id_tema'],
                'question': data['payload']['question'],
                'client_id': data['payload']['currentUser']['id'],
                'subtema': data['payload']['subteme'],
                'slug_subtema':data['payload']['subteme'].lower().replace(' ','-')
            }])
        except Exception as e:
            _logger.info(e)
            return json.dumps({"error":{"message":"error al crear pregunta en el forum"}})
        
        fields = ['question','client_id','subtema','slug_subtema','create_date']
        search = self._models.execute_kw(self._db, self._uid, self._password,'forum.lawyers',
        'search_read',[[['id_tema', '=', data['payload']['id_tema']]],fields])
        _logger.info(search)

        if data['payload']['currentUser']['credits']:
            data['payload']['currentUser']['credits'] = int(data['payload']['currentUser']['credits']) - 500

        try:
            writeUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer', 'write', [[int(data['payload']['currentUser']['id'])], {
                'credits': data['payload']['currentUser']['credits']
            }])
        except Exception as e:
            _logger.info(e)
            return json.dumps({"error":"Ha habido algun problema al actualizar algun dato"})
        
        lista_nueva = []
        contSubteme = 0
        for subteme in search:
            if subteme['subtema'] in lista_nueva:
                _logger.info("*****REPETIDO*******")
                _logger.info(contSubteme)
                search[contSubteme]['display_name'] = 0
            contSubteme +=1
            lista_nueva.append(subteme['subtema'])
            
        #obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['client_id'][0]]],['email']])
            search[cont]['client_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"questions":search})
    
    @http.route('/get-questionForum/<id_tema>', type="http", auth="none",website=True, cors="*")
    def getQuestionForum(self,**post):
        _logger.info("QUESTIONSS_FORUM")
        _logger.info(post['id_tema'])
        
        search = self._models.execute_kw(self._db, self._uid, self._password,'forum.lawyers',
        'search_read',[[['id_tema', '=', int(post['id_tema'])]]])
        _logger.info(search)

        lista_nueva = []
        contSubteme = 0
        for subteme in search:
            if subteme['subtema'] in lista_nueva:
                _logger.info("*****REPETIDO*******")
                _logger.info(contSubteme)
                search[contSubteme]['display_name'] = 0
            contSubteme +=1
            lista_nueva.append(subteme['subtema'])

        #obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['client_id'][0]]],['email']])
            search[cont]['client_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"questions":search})

    @http.route('/get-all-questions/<slug_subtema>', type="http", auth="none",website=True, cors="*")
    def getAllQuestionsForum(self,**post):
        _logger.info("ALL_BY_SLUGSUBTEMA_QUESTIONSS_FORUM")
        
        search = self._models.execute_kw(self._db, self._uid, self._password,'forum.lawyers',
        'search_read',[[['slug_subtema', '=', post['slug_subtema']]]])
        _logger.info(search)
        #obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['client_id'][0]]],['email']])
            search[cont]['client_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"questions":search})
    
    @http.route('/create-answer', type="json", auth="none",website=True, cors="*")
    def postAnswerForum(self):
        _logger.info("ANSWERS_FORUM")
        data = request.jsonrequest

        try:
            self._models.execute_kw(self._db, self._uid, self._password, 'answer.forum', 'create', [{
                'answer': data['payload']['answer'],
                'lawyer_id': data['payload']['userLawyer']['id'],
                'question_id':data['payload']['id_question']
            }])
        except Exception as e:
            _logger.info(e)
            return json.dumps({"error":"Ha habido algun problema al crear algun dato"})
        
        search = self._models.execute_kw(self._db, self._uid, self._password,'answer.forum',
        'search_read',[[['question_id', '=', int(data['payload']['id_question'])]]])
        _logger.info(search)
        #obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['lawyer_id'][0]]],['email']])
            search[cont]['lawyer_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"answers":search})
    
    @http.route('/get-answer/<id_question>', type="http", auth="none",website=True, cors="*")
    def getAnswerForum(self,**post):
        _logger.info("GET_ANSWERS_FORUM")
        
        search = self._models.execute_kw(self._db, self._uid, self._password,'answer.forum',
        'search_read',[[['question_id', '=', int(post['id_question'])]]])
        _logger.info(search)
        #obtener nombre usuario para pintar quien ha escrito el comentario
        cont = 0
        for user in search:
            searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
            'search_read',[[['id', '=', user['lawyer_id'][0]]],['email']])
            search[cont]['lawyer_id'] = searchUser[0]['email']
            cont +=1

        return json.dumps({"answers":search})