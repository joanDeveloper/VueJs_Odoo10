from openerp import models, fields

class Visitors(models.Model):
    _name = 'visitors.web'
    _order = "num_visitors desc"

    num_visitors = fields.Integer('Numero Visitantes')
    ip_visitor = fields.Char('Ip Visitante')
    date_visitor = fields.Date('Data Visitante')