from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Manjaro', email='manjaro@demo.io', password='password')
    demo2 = User(
        username='Koma', email='koma@demo.io', password='password')
    demo3 = User(
        username='ShortyBrian', email='shortybrian@demo.io', password='password')
    demo4 = User(
        username='Vizkopu', email='vizkopu@demo.io', password='password')

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
