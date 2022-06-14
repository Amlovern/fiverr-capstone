from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, DateField, TextAreaField
from wtforms.validators import DataRequired, Length

class OrderForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired(message='Please enter a valid User ID')])
    gigId = IntegerField('gigId', validators=[DataRequired(message='Please enter a valid Gig ID')])
    deliveryInstructions = TextAreaField('deliveryInstructions', validators=[
        Length(min=0, max=400, message='Delivery Instructions must be less than 400 characters.')
    ])
    placed = TextAreaField('placed', validators=[DataRequired(message='Please enter a valid Order Placed Date')])
    due = TextAreaField('due', validators=[DataRequired(message='Please enter a valid Order Due Date')])
