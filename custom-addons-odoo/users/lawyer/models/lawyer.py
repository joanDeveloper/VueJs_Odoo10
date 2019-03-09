from openerp import models, fields

class Lawyer(models.Model):
    _name = 'users.lawyer'

    slug = fields.Char('slug', required=True)
    categories_slug = fields.Many2one('categories.list','slug_categories')
    num_colegiado = fields.Integer('numero colegiado', required=True)
    ejerciente = fields.Boolean('ejerciente', required=True)
    nombre = fields.Char('nombre', required=True)
    apellidos = fields.Char('apellidos', required=True)
    cod_postal = fields.Char('codigo postal', required=True)
    seguro_res_civil = fields.Boolean('seguro responsabilidad civil', required=True)
    direccion = fields.Char('direccion', required=True)
    email = fields.Char('email', required=True)
    telefono = fields.Integer('telefono', required=True)
    fax = fields.Integer('fax', required=True)