from flask import Blueprint
from app.models import Gig, db

search_routes = Blueprint('search', __name__)

# Query DB based on Search String
@search_routes.route('/<string:searchString>')
def get_search_result(searchString):
    print('SEARCH STRING INSIDE ROUTE========================', searchString)
    results = Gig.query.filter(Gig.title.ilike(f'%{searchString}%')).all()

    gigs_dict_list = [gig.to_dict() for gig in results]

    gigs_by_gigId = {gig['id']: gig for gig in gigs_dict_list}
        
    return {
        'gigsByGigId': gigs_by_gigId
    }