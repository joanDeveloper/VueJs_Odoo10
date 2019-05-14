from openerp import models, fields

class UserLawyerInherit(models.Model):
    _inherit = 'users.lawyer'

    credits = fields.Integer('Credits')