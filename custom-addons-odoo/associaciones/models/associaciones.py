from openerp import models, fields

class Casos(models.Model):
    _name = 'associaciones.lawyer'

    user_lawyer = fields.Many2one('users.lawyer','name_lawyer')
    cif = fields.Char('cif_associacion')
    name = fields.Char('name_associacion')
    nombre_zonas = fields.Many2one('zone.lawyers','name_zone')
    email = fields.Char('email_associacion')
    phone = fields.Integer('phone')