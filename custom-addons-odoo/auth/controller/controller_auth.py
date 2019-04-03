import openerp.http as http
import json, logging
from openerp.http import request
from openerp.http import Response 
from ...utils.credentials import Credentials
import xmlrpclib, base64
from controller_middleware import Middleware
_logger = logging.getLogger("auth_controller")

class Auth(http.Controller):
    def __init__(self):
        credential = Credentials().models()
        self._models = credential['models']
        self._db = credential['db']
        self._uid = credential['uid']
        self._password = credential['password']
    
    @http.route('/register', type="json", auth="none",website=True, cors="*")
    def register(self):
        _logger.info("REGISTER")
        data = request.jsonrequest

        searchCount = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        'search_count',[[['email', '=', data['credentials']['email']]]])

        if searchCount == 0:
            self._models.execute_kw(self._db, self._uid, self._password, 'users.lawyer', 'create', [{
                'categories_slug': data['credentials']['typeUser'],
                'email': data['credentials']['email'],
                'password': base64.b64encode(data['credentials']['password'])
            }])

            if data['credentials']['typeUser'] == "1":
                return json.dumps({"message":"Has sido registrado correctamente. Seras verificado en breve. Gracias"})
            else:
                return json.dumps({"message":"Has sido registrado correctamente. Gracias"})

        else:
            return json.dumps({"error":{"message":"el email ya existe"}})
        
    @http.route('/signin', type="json", auth="none",website=True, cors="*")
    def login(self):
        data = request.jsonrequest
    
        searchEmail = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
        'search_count',[[['email', '=', data['credentials']['email']]]])

        if searchEmail == 0:
            _logger.info("el email no existe")
            return {"error":{"message":"el email no existe"}}
            
        else:
            _logger.info("email correcto")
            passwordEncode = base64.b64encode(data['credentials']['password'])
            searchPasswd = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
            'search_count',[ [['email', '=', data['credentials']['email']], ['password', '=', passwordEncode] ]])

            if searchPasswd >= 1:
                _logger.info("usuario y passwd correcto")
                fields = ['id','email','nombre','apellidos','categories_slug','password']
                searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
                'search_read',[[['email', '=', data['credentials']['email']]],fields])

                if searchUser[0]['categories_slug'][0] == 1:
                    searchLawyerActivate = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
                    'search_count',[[['email', '=', data['credentials']['email']], ['verificar','=',True] ]])
                    _logger.info("*****SEARCH_ACTIVATE******")
                    _logger.info(searchLawyerActivate)
                    if searchLawyerActivate == 0:
                        Response.status = "400 Bad Request" 
                        return json.dumps({"error":{"message":"Aun no has sido verificado como abogado"}})

                _logger.info("*****SEARCH_USER******")
                _logger.info(searchUser)
                dataToEncode = {
                    "credentials":{
                        "email":searchUser[0]['email'],
                        "password":searchUser[0]['password'],
                        "typeUser":searchUser[0]['categories_slug'][0]}
                }
                token = Middleware().encode(dataToEncode)
                _logger.info("*****TOKEN_ENCODED*******")
                _logger.info(token)

                return {
                    "user":{
                        "token":token,
                        "currentUser":{
                            "nombre":searchUser[0]['nombre'],
                            "apellidos":searchUser[0]['apellidos'],
                            "email":searchUser[0]['email']
                        }
                     }
                }
            else:
                _logger.info("PASSWORD INCORRECTO")
                return {"error":{"message":"password incorrecto"}}
                
    @http.route('/verify', type="json", auth="none", website=True, cors="*" )
    def authToken(self):
        _logger.info("VERIFY-TOKEN")
        _logger.info(request.jsonrequest)
        # print(request.httprequest.headers)
        data = request.jsonrequest
        decToken = Middleware().decode(data['Token'])
        _logger.info(decToken)
        if decToken == 0:
            _logger.info("token invalido o expirado")
            Response.status = "400 Bad Request" 
            return json.dumps({"error":{"message":"token invalido o expirado"}})

        else:
            dataDecoded = json.loads(decToken)
            searchCount = self._models.execute_kw(self._db,self._uid,self._password,'users.lawyer',
            'search_count',[[['email', '=', dataDecoded['email']]]])

            if searchCount >=1:
                fields = ['id','email','nombre','apellidos','categories_slug','password']
                searchUser = self._models.execute_kw(self._db, self._uid, self._password,'users.lawyer',
                'search_read',[[['email', '=', dataDecoded['email']]],fields])
                return {"user":{
                    'token':data['Token'],
                    "currentUser":{
                                "id":searchUser[0]['id'],
                                "nombre":searchUser[0]['nombre'],
                                "apellidos":searchUser[0]['apellidos'],
                                "email":searchUser[0]['email']
                            }}}
            else:
                Response.status = "400 Bad Request" 
                return json.dumps({"error":{"message":"fallo autentificacion del token"}})