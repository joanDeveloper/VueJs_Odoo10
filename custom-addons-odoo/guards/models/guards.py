from openerp import models, fields

class Turns(models.Model):
    _name = 'turn.lawyers'

    name = fields.Char('Turno', required=True)

class Zone(models.Model):
    _name = 'zone.lawyers'

    name = fields.Char('Zonas', required=True)

class Guards(models.Model):
    _name = 'guards.lawyers'

    user_lawyer = fields.Many2one('users.lawyer','nombre_abogado')
    nombre_zonas = fields.Many2one('zone.lawyers','name_zone')
    nombre_turno = fields.Many2one('turn.lawyers','name_turno')
    date_attendance = fields.Char('Fecha asistencia', required=True)
    delivered = fields.Boolean('Entregado', required=True)