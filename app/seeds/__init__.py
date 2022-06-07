from flask.cli import AppGroup

from .categories import seed_categories, undo_categories
from .users import seed_users, undo_users
from .gigs import seed_gigs, undo_gigs
from .orders import seed_orders, undo_orders

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_gigs()
    seed_orders()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_gigs()
    undo_orders()
    # Add other undo functions here
