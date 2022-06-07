from unicodedata import category
from app.models import db, Gig

def seed_gigs():
  christian = Gig(
    ownerId=1,
    categoryId=3,
    queue=2,
    description='I can make you the game of your dreams. My epic skills are beyond your comprehension.',
    price=500,
    deliveryTimeline=30,
    returnTimeline=3
  )
  james = Gig(
    ownerId=4,
    categoryId=4,
    queue=10,
    description='I can make you into an anime character. I am able to draw any style from your favorite studios.',
    price=25,
    deliveryTimeline=7,
    returnTimeline=1
  )
  sherman = Gig(
    ownerId=2,
    categoryId=4,
    queue=1,
    description='I can create an AMV to your favorite song. No matter the song or anime, I can make it work.',
    price=5,
    deliveryTimeline=3,
    returnTimeline=0
  )
  brian = Gig(
    ownerId=3,
    categoryId=1,
    queue=0,
    description='I can 3D print you a custom mini for your next D&D campaign.',
    price=43,
    deliveryTimeline=10,
    returnTimeline=4
  )

  db.session.add(christian)
  db.session.add(james)
  db.session.add(sherman)
  db.session.add(brian)

  db.session.commit()

def undo_gigs():
  db.session.execute('TRUNCATE gigs RESTART IDENTITY CASCADE;')
  db.session.commit()