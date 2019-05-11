from openerp import models, fields

class TemasForum(models.Model):
    _name = 'temes.forum'

    name = fields.Char('Nombre')
    slug = fields.Char('Slug')

class Forum(models.Model):
    _name = 'forum.lawyers'
    _order = "create_date desc"
    
    client_id = fields.Many2one('users.lawyer','id')
    id_tema = fields.Many2one('temes.forum','id')
    question = fields.Char('Pregunta')
    subtema = fields.Char('Subtema')
    slug_subtema = fields.Char('Slug Subtema')
    #answer_id = fields.Many2one('answer.forum','id')

class ForumAnswer(models.Model):
    _name = 'answer.forum'

    lawyer_id = fields.Many2one('users.lawyer','id')
    question_id = fields.Many2one('forum.lawyers','id')
    answer = fields.Char('Respuesta')