from openerp import models, fields

class Casos(models.Model):
    _name = 'casos.lawyer'

    user_lawyer = fields.Many2one('users.lawyer','name_lawyer')
    user_client = fields.Char('name_client')
    surname_client = fields.Char('surname_client')
    dni_client = fields.Char('dni_client')
    phone_client = fields.Integer('phone_client')
    email_client = fields.Char('email_client')
    nombre_zonas = fields.Many2one('zone.lawyers','name_zone')
    nombre_turno = fields.Many2one('turn.lawyers','name_turno')
    description = fields.Char('description')
    delivered = fields.Boolean('Entregado', required=True)
    import_ = fields.Integer('Importe')