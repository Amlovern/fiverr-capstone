from app.models import db, Category

def seed_categories():
  tabletop = Category(
    name='Tabletop'
  )
  card_game = Category(
    name='Card Game'
  )
  video_game = Category(
    name='Video Game'
  )
  anime = Category(
    name='Anime'
  )

  db.session.add(tabletop)
  db.session.add(card_game)
  db.session.add(video_game)
  db.session.add(anime)

  db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
