from jinja2 import DebugUndefined
from app.models import db, Order
from datetime import datetime

def seed_orders():
  christian = Order(
    userId=1,
    gigId=2,
    deliveryInstructions='Please mail directly to me.',
    placed=datetime(2022, 6, 5, 8, 10, 10, 10),
    due=datetime(2022, 6, 12, 8, 10, 10, 10)
  )
  james = Order(
    userId=4,
    gigId=4,
    deliveryInstructions='Please mail directly to me.',
    placed=datetime(2022, 5, 29, 8, 10, 10, 10),
    due=datetime(2022, 6, 8, 8, 10, 10, 10)
  )
  sherman = Order(
    userId=2,
    gigId=1,
    deliveryInstructions='Please mail directly to me.',
    placed=datetime(2022, 3, 11, 8, 10, 10, 10),
    due=datetime(2022, 4, 10, 8, 10, 10, 10)
  )
  brian = Order(
    userId=3,
    gigId = 3,
    deliveryInstructions='Please mail directly to me.',
    placed=datetime(2022, 6, 7, 8, 10, 10, 10),
    due=datetime(2022, 6, 10, 8, 10, 10, 10)
  )

  db.session.add(christian)
  db.session.add(james)
  db.session.add(sherman)
  db.session.add(brian)

  db.session.commit()

def undo_orders():
  db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
  db.session.commit()