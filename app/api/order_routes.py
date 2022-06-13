from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Order
from app.forms import OrderForm
from .utils import validation_errors_to_error_messages

order_routes = Blueprint('order', __name__)

# Get All Orders for One User
@order_routes.route('/user/<int:userId>')
def get_users_orders(userId):
    orders = Order.query.filter_by(userId=userId).all()

    # list of order dictionaries
    orders_dict_list = [order.to_dict() for order in orders]

    #normalize order dictionaries by orderId
    orders_by_orderId = {order['id']: order for order in orders_dict_list}

    return {
        'ordersByOrderId': orders_by_orderId
    }


# Get One Order by Order ID
@order_routes.route('/<int:id>')
def get_one_order(id):
    order = Order.query.get(id)
    return order.to_dict()


# Create a New Order
@order_routes.route('', methods=['POST'])
@login_required
def create_new_order():

    form=OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = dict(
            userId=form.data['userId'],
            gigId=form.data['gigId'],
            deliveryInstructions = form.data['deliveryInstructions'],
            placed=form.data['placed'],
            due=form.data['due']
        )

        new_order = Order(**params)
        db.session.add(new_order)
        db.session.commit()

        return new_order.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# Update One Order
@order_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_order(id):

    form=OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        session_order = Order.query.get(id)

        session_order.userId = form.data['userId']
        session_order.gigId = form.data['gigId']
        session_order.deliveryInstructions = form.data['deliveryInstructions']
        session_order.placed = form.data['placed']
        session_order.due = form.data['due']

        db.session.commit()

        return session_order.to_dict()

    if form.errors:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 418


# Delete One Order
@order_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_order(id):
    order = Order.query.get(id)
    db.session.delete(order)
    db.session.commit()
    return {'message': 'Success'}


# TEST ROUTES

# GET ALL ORDERS FOR A USER
# fetch('/api/order/user/1').then(res=> res.json()).then(data=> console.log(data))

# GET ONE ORDER
# fetch('/api/order/3').then(res=> res.json()).then(data=> console.log(data))

# ADD NEW ORDER
# fetch('/api/order', {
#     method: 'POST',
#     headers: {"Content-Type": "application/json"},
#     body: JSON.stringify({
#         userId: 1,
#         gigId: 2,
#         deliveryInstructions: 'This is a new Test Order.',
#         placed: Date.now(),
#         due: Date.now(),
#     })
# })
# .then((res)=> res.json())
# .then((data)=> console.log(data))
