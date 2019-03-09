from openerp import models, fields

class Categories(models.Model):
    _name = 'categories.list'

    slug = fields.Char('slug', required=True)
    name = fields.Char('name', required=True)
    description = fields.Char('description', required=True)