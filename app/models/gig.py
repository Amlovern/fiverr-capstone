from unicodedata import category
from .db import db
from sqlalchemy.sql import func

class Gig(db.Model):
  __tablename__ = 'gigs'

  id = db.Column(db.Integer, primary_key=True)
  ownerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  title = db.Column(db.String(100), nullable=False)
  image = db.Column(db.String(1000))
  queue = db.Column(db.Integer, nullable=False)
  description = db.Column(db.Text)
  price = db.Column(db.Integer, nullable=False)
  deliveryTimeline = db.Column(db.Integer, nullable=False)
  returnTimeline = db.Column(db.Integer, nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False,server_default=func.now())
  updatedAt = db.Column(db.DateTime, nullable=False,server_default=func.now(), onupdate=func.now())

  user = db.relationship('User', back_populates='gigs')
  orders = db.relationship('Order', back_populates='gig', cascade='all, delete, delete-orphan')
  category = db.relationship('Category', back_populates='gigs')

  def to_dict(self):
    return {
      'id': self.id,
      'ownerId': self.ownerId,
      'categoryId': self.categoryId,
      'title': self.title,
      'image': self.image,
      'queue': self.queue,
      'description': self.description,
      'price': self.price,
      'deliveryTimeline': self.deliveryTimeline,
      'returnTimeline': self.returnTimeline,
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }