from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError


def delivery_instructions_length(form, field):
    # Checking that field is less than 400 characters
    delivery_instructions = field.data

    if len(delivery_instructions) > 400:
        raise ValidationError('Delivery Instructions must be less than 400 characters.')

class OrderForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired(message='Please enter a valid User ID')])
    gigId = IntegerField('gigId', validators=[DataRequired(message='Please enter a valid Gig ID')])
    deliveryInstructions = TextAreaField('deliveryInstructions', validators=[delivery_instructions_length])
    placed = TextAreaField('placed', validators=[DataRequired(message='Please enter a valid Order Placed Date')])
    due = TextAreaField('due', validators=[DataRequired(message='Please enter a valid Order Due Date')])
