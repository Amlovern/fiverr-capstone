from .db import db
from sqlalchemy.sql import func

class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False, unique=True)
  createdAt = db.Column(db.DateTime, nullable=False,server_default=func.now())
  updatedAt = db.Column(db.DateTime, nullable=False,server_default=func.now(), onupdate=func.now())

  gigs = db.relationship('Gig', back_populates='category')