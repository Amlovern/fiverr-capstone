from typing import Text
from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length

class GigForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired()])
    categoryId = IntegerField('categoryId', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(),
        Length(min=1, max=50, message='Title must be less than 50 characters.')
    ])
    description = TextAreaField('description', validators=[
        Length(min=0, max=500, message='Description must be less than 500 characters.')
    ])
    price = IntegerField('price', validators=[DataRequired()])
    deliveryTimeline = IntegerField('deliveryTimeline', validators=[DataRequired()])
    returnTimeline = IntegerField('returnTimeline', validators=[DataRequired()])