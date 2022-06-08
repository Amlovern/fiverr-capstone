from crypt import methods
from flask import Blueprint, request
from flask_login import login_required
from app.models import Gig, db
from app.forms import GigForm
from .utils import validation_errors_to_error_messages

gig_routes = Blueprint('gig', __name__)

# Get All Gigs
@gig_routes.route('/')
def get_all_gigs():
    gigs = Gig.query.all()

    # list of gig dictionaries
    gigs_dict_list = [gig.to_dict() for gig in gigs]

    # normalize gig dictionaries by gigId
    gigs_by_gigId = {gig['id']: gig for gig in gigs_dict_list}

    return {'gigsByGigId': gigs_by_gigId}


# Get One Gig by Gig ID
@gig_routes.route('/<int:id>')
def get_one_gig(id):
    gig = Gig.query.get(id)
    return gig.to_dict()


# Create a New Gig
@gig_routes.route('/', methods=['POST'])
@login_required
def create_new_gig():

    form = GigForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = dict(
            ownerId=form.data['ownerId'],
            categoryId=form.data['categoryId'],
            queue=0,
            description=form.data['description'],
            price=form.data['price'],
            deliveryTimeline=form.data['deliveryTimeline'],
            returnTimeline=form.data['returnTimeline']
        )

        new_gig = Gig(**params)
        db.session.add(new_gig)
        db.session.commit()

        return new_gig.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# Update One Gig
@gig_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_gig(id):

    form = GigForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        session_gig = Gig.query.get(id)

        session_gig.ownerId = form.data['ownerId']
        session_gig.categoryId = form.data['categoryId']
        session_gig.description = form.data['description']
        session_gig.price = form.data['price']
        session_gig.deliveryTimeline = form.data['deliveryTimeline']
        session_gig.returnTimeline = form.data['returnTimeline']

        db.session.commit()

        return session_gig.to_dict()
    
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# Delete One Gig
@gig_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_gig(id):
    gig = Gig.query.get(id)
    db.session.delete(gig)
    db.session.commit()
    return {'message': 'Success'}