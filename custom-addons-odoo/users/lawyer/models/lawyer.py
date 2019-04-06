from openerp import models, fields

class Lawyer(models.Model):
    _name = 'users.lawyer'

    slug = fields.Char('slug')
    categories_slug = fields.Many2one('categories.list','slug_categories')
    num_colegiado = fields.Integer('numero colegiado')
    ejerciente = fields.Boolean('ejerciente', required=True)
    # nombre = fields.Char('nombre')
    name = fields.Char('nombre')
    apellidos = fields.Char('apellidos')
    cod_postal = fields.Char('codigo postal')
    seguro_res_civil = fields.Boolean('seguro responsabilidad civil', required=True)
    direccion = fields.Char('direccion')
    email = fields.Char('email', required=True)
    password = fields.Char('password', required=True)
    telefono = fields.Integer('telefono')
    fax = fields.Integer('fax')
    verificar = fields.Boolean('verificar', required=True)