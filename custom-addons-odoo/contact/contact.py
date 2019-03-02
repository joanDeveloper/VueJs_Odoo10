import openerp.http as http
from openerp.http import request
import json
import smtplib #email odoo
import logging
_logger = logging.getLogger("contact")

class contactController(http.Controller):

    @http.route('/contact/', type="http", auth="none", website=True, cors='*')
    def contact(self):
        _logger.info("HELLO CONTACT")