from typing import Text
from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length

class GigForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
    categoryId = IntegerField('categoryId', validators=[DataRequired()])
    description = TextAreaField('description', validators=[
        Length(min=0, max=500, message='Description must be less than 500 characters.')
    ])
    price = IntegerField('price', validators=[DataRequired()])
    deliveryTimeline = IntegerField('deliveryTimeline', validators=[DataRequired()])
    returnTimeline = IntegerField('returnTimeline', validators=[DataRequired()])