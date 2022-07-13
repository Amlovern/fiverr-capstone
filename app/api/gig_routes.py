from flask import Blueprint, request
from flask_login import login_required
from app.models import Gig, User, Category, db
from app.forms import GigForm
from app.s3_helpers import allowed_file, get_unique_filename, upload_file_to_s3
from .utils import validation_errors_to_error_messages

gig_routes = Blueprint('gig', __name__)

# Get All Gigs
@gig_routes.route('')
def get_all_gigs():
    gigs = Gig.query.all()

    # list of gig dictionaries
    gigs_dict_list = [gig.to_dict() for gig in gigs]

    # normalize gig dictionaries by gigId
    gigs_by_gigId = {gig['id']: gig for gig in gigs_dict_list}

    gigs_by_ownerId = {}
    for gig in gigs_dict_list:
        if gig['ownerId'] in gigs_by_ownerId:
            gigs_by_ownerId[gig['ownerId']].append(gig)
        else:
            gigs_by_ownerId[gig['ownerId']] = []
            gigs_by_ownerId[gig['ownerId']].append(gig)

    
    gigs_by_category_id = {}
    for gig in gigs_dict_list:
        if gig['categoryId'] in gigs_by_category_id:
            gigs_by_category_id[gig['categoryId']].append(gig)
        else:
            gigs_by_category_id[gig['categoryId']] = []
            gigs_by_category_id[gig['categoryId']].append(gig)

    return {
        'gigsByOwnerId': gigs_by_ownerId,
        'gigsByCategoryId': gigs_by_category_id,
        'gigsByGigId': gigs_by_gigId
    }


# Get One Gig by Gig ID
@gig_routes.route('/<int:id>')
def get_one_gig(id):
    gig = Gig.query.get(id)
    return gig.to_dict()


# Create a New Gig
@gig_routes.route('', methods=['POST'])
@login_required
def create_new_gig():

    form = GigForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if "image" not in request.files:
            return {"errors": ["type: Please choose an Image file"]}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": ["type: File type not permitted (Only .png, .jpg, .jpeg, .gif permitted)"]}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]


        params = dict(
            ownerId=form.data['ownerId'],
            categoryId=form.data['categoryId'],
            title=form.data['title'],
            image=url,
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
        session_gig.title=form.data['title']
        session_gig.image=form.data['imageUrl']
        session_gig.price = form.data['price']
        session_gig.deliveryTimeline = form.data['deliveryTimeline']
        session_gig.returnTimeline = form.data['returnTimeline']

        db.session.commit()

        return session_gig.to_dict()
    
    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# Update Gig Image
@gig_routes.route('/<int:id>/image', methods=['POST'])
@login_required
def upload_gig_image(id):

    if "image" not in request.files:
        return {"errors": ["Please choose an Image file"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["File type not permitted (Only .png, .jpg, .jpeg, .gif permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    current_gig = Gig.query.get(id)
    current_gig.image = url
    db.session.commit()

    return {"url": url}


# Delete One Gig
@gig_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_gig(id):
    gig = Gig.query.get(id)
    db.session.delete(gig)
    db.session.commit()
    return {'message': 'Success'}


# TEST ROUTES

# GET ALL GIGS
# fetch('/api/gig').then(res=> res.json()).then(data=> console.log(data))

# GET ONE GIG
# fetch('/api/gig/2').then(res=> res.json()).then(data=> console.log(data))

# POST NEW GIG
# fetch('/api/gig', {
#     method: 'POST',
#     headers: {"Content-Type": "application/json"},
#     body: JSON.stringify({
#         ownerId: 1,
#         categoryId: 2,
#         description: 'This is a new Test Gig.',
#         price: 22,
#         deliveryTimeline: 8,
#         returnTimeline: 1
#     })
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))

# PATCH UPDATE GIG
#Check if login required works
# fetch('api/gig/5', {
#     method: 'PATCH',
#     headers: {"Content-Type": "application/json"},
#     body: JSON.stringify({
#         ownerId: 1,
#         categoryId: 2,
#         description: 'This is a test to make sure the update works!',
#         price: 14,
#         deliveryTimeline: 18,
#         returnTimeline: 6
#     })
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))


# DELETE GIG
# fetch('/api/gig/5', {
#     method: "DELETE"
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))
