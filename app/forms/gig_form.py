from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, Regexp, NumberRange

class GigForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired(message='Please enter a valid Owner ID.')])
    categoryId = IntegerField('categoryId', validators=[DataRequired(message='Please enter a valid Category ID.')])
    title = StringField('title', validators=[DataRequired(message='Please enter a valid Title.'),
        Length(min=1, max=50, message='Title must be less than 50 characters.')
    ])
    imageUrl = StringField('imageUrl', validators=[DataRequired(message='Please enter a valid image URL.'),
        Length(min=1, max=255, message='Image URL must be less than 255 characters.'),
        Regexp('(http)?s?:?(\/\/[^"\']*\.(?:png|jpg|jpeg|gif|png|svg))',
            message='Please enter a valid image URL. Acceptable image types are: .png, .jpg, .jpeg, .gif, .png, .svg.')
    ])
    description = TextAreaField('description', validators=[
        Length(min=0, max=500, message='Description must be less than 500 characters.')
    ])
    price = IntegerField('price', validators=[DataRequired(message='Please enter a valid Price.')])
    deliveryTimeline = IntegerField('deliveryTimeline', validators=[DataRequired(message='Please enter a valid Delivery Timeline in days.')])
    returnTimeline = IntegerField('returnTimeline', validators=[DataRequired(message='Please enter a valid Cancellation Timeline in days. This can be 0.'),
        NumberRange(min=0, max=100, message='Please select a cancellation timeline between 0 and 100 days.')
    ])