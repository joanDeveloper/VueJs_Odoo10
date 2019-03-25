import xmlrpclib, base64, logging
_logger = logging.getLogger("credentials")

class Credentials():
    def models(self):
        _logger.info("CREDENTIALSSSS")
        url = 'http://51.75.31.239:8069'
        db = base64.b64decode("bGliZXJ0eQ==")
        username = base64.b64decode('am9hbm1vZGF3QGdtYWlsLmNvbQ==')
        password = base64.b64decode('QW1waUpvYW5ldDMwMTExMg==')

        common = xmlrpclib.ServerProxy('{}/xmlrpc/2/common'.format(url))
        uid = common.authenticate(db, username, password, {})
        models = xmlrpclib.ServerProxy('{}/xmlrpc/2/object'.format(url))

        credentials = {
            "db":db,
            "password":password,
            "uid":uid,
            "models":models
        }
        
        return credentials