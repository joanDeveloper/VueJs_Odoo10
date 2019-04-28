from openerp import models, fields

class TemasForum(models.Model):
    _name = 'temes.forum'

    name = fields.Char('Nombre')
    slug = fields.Char('Slug')

class Forum(models.Model):
    _name = 'forum.lawyers'

    user_lawyer_id = fields.Many2many('users.lawyer','id')
    user_client_id = fields.Many2many('users.lawyer','id')
    name_tema = fields.Many2one('temes.forum','Nombre Tema')
    comment = fields.Char('comment')