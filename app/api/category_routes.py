from flask import Blueprint
from app.models import Category, db

category_routes = Blueprint('category', __name__)

# Get All Categories
@category_routes.route('')
def get_all_categories():
    categories = Category.query.all()

    # list of category dictionaries
    categories_dict_list = [category.to_dict() for category in categories]

    # normalize category dictionaries by categoryId
    categories_by_categoryId = {category['id']: category for category in categories_dict_list}

    return categories_by_categoryId

# TEST ROUTES

# GET ALL CATEGORIES
# fetch('/api/category').then(res=> res.json()).then(data=> console.log(data))