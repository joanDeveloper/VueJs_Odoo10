from openerp import models, fields, api

class Comment(models.Model):
    _name = 'comment.items'

    user_lawyer_id = fields.Many2one('users.lawyer','id')
    user_client_id = fields.Many2one('users.lawyer','id')
    comment = fields.Char('comment')