from cryptography.fernet import Fernet
import json, logging, base64
from datetime import datetime, timedelta
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
_logger = logging.getLogger("middleware_controller")

SECRET='colegio_abogados_liberty_2019_BY_JOAN_MONTES'
JWT_EXP_DELTA_DAYS = 1
class Middleware_passwd():
    def genera_key(self,passwd):
        digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
        if (len(SECRET)>1):
            _logger.info("SECRET")
            digest.update(passwd)
            return base64.urlsafe_b64encode(digest.finalize())
        else:
            _logger.info("SECRET_ERROR")
            key = Fernet.generate_key()
            return key

class Middleware():
    def encode(self,searchUser):
        _logger.info("MIDDLEWARE")
        time_exp = datetime.now() + timedelta(days=JWT_EXP_DELTA_DAYS)
        payload = {
            'email':searchUser['credentials']['email'],
            'password':searchUser['credentials']['password'],
            'typeUser':searchUser['credentials']['typeUser'],
        }
        payload['exp'] = str(time_exp)
        key = Middleware_passwd().genera_key(SECRET)
        cipher_suite = Fernet(key)
        token = cipher_suite.encrypt(json.dumps(payload).encode('utf-8'))
        _logger.info("ENCRIPT")
        _logger.info(token)
        return token

    def decode(self,data):
        key = Middleware_passwd().genera_key(SECRET)

        try:
            cipher_suite = Fernet(key)
            _logger.info("****dataDecode****")
            _logger.info(data)
            decToken = cipher_suite.decrypt(bytes(data))
            _logger.info("****dataDecrypt****")
            _logger.info(decToken)
            time_exp = json.loads(decToken)
            time_exp = time_exp['exp']
            if time_exp >= str(datetime.now()):
                _logger.info("time_exp_OK")
                return decToken
            else:
                _logger.info("time_exp_EERROR")
                return 0

        except Exception as e:
            _logger.info("token_ERROR")
            _logger.info(e)
            return 0