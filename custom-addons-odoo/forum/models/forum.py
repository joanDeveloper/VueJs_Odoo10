from openerp import models, fields

class TemasForum(models.Model):
    _name = 'temes.forum'

    name = fields.Char('Nombre')
    slug = fields.Char('Slug')

class Forum(models.Model):
    _name = 'forum.lawyers'

    lawyer_id = fields.Many2one('users.lawyer','id')
    client_id = fields.Many2one('users.lawyer','id')
    id_tema = fields.Many2one('temes.forum','id')
    question = fields.Char('Pregunta')
    answer = fields.Char('Respuesta')