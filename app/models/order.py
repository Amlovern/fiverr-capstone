from unicodedata import category
from .db import db
from sqlalchemy.sql import func

class Order(db.Model):
  __tablename__ = 'orders'

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  gigId = db.Column(db.Integer, db.ForeignKey('gigs.id'), nullable=False)
  placed = db.Column(db.DateTime, nullable=False)
  due = db.Column(db.DateTime, nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False,server_default=func.now())
  updatedAt = db.Column(db.DateTime, nullable=False,server_default=func.now(), onupdate=func.now())

  user = db.relationship('User', back_populates='orders')
  gig = db.relationship('Gig', back_populates='orders')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'gigId': self.gigId,
      'placed': self.placed,
      'due': self.due,
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }