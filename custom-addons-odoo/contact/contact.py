import openerp.http as http
from openerp.http import request
import json
import smtplib #email odoo
import logging
import base64
_logger = logging.getLogger("contact")

class contactController(http.Controller):

    @http.route('/contact/', type="json", auth="none", website=True, cors='*')
    def contact(self):
        _logger.info("HELLO CONTACT")
        data = request.jsonrequest
        _logger.info(data['data'])
        email = data['data']['email']
        name = data['data']['name']
        subject = data['data']['subject']
        comment = data['data']['comment']

        if email is "":
            _logger.info("NOT EMAIL")
            return json.dumps({"error":{"message":"not email"}})
        elif subject is "":
            _logger.info("NOT subject")
            return json.dumps({"error":{"message":"not subject"}})
        elif name is "":
            _logger.info("NOT name")
            return json.dumps({"error":{"message":"not name"}})
        elif comment is "":
            _logger.info("NOT comment")
            return json.dumps({"error":{"message":"not comment"}})
        else:
            try:
                sender = "joanmodaw@gmail.com"
                receivers = email
                message ="Hola "+name+" su mensaje ha sido recibido, en breve le contestaremos referente al tema "+subject+". Developer Odoo."
                _logger.info(message)
                smtpObj = smtplib.SMTP(host='smtp.gmail.com', port=587)
                smtpObj.ehlo()
                smtpObj.starttls()
                smtpObj.ehlo()
                passwd = "**************"
                _logger.info(passwd)
                smtpObj.login(user="joanmodaw@gmail.com", password=passwd)
                smtpObj.sendmail(sender, receivers, message)
                return json.dumps({"message":"successfully sent email"})
            except ValueError:
                return json.dumps({"error":{"message":"error to send email: "+ValueError}})

        #return json.dumps({"asd":"sddssss"})