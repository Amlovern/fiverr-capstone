from unicodedata import category
from app.models import db, Gig

def seed_gigs():
  christian = Gig(
    ownerId=1,
    categoryId=3,
    title='Game Creation for those who want the best.',
    image='https://nerdrr.s3.amazonaws.com/indie-game.jpg',
    queue=1,
    description='I can make you the game of your dreams. My epic skills are beyond your comprehension.',
    price=500,
    deliveryTimeline=30,
    returnTimeline=3
  )
  james = Gig(
    ownerId=4,
    categoryId=4,
    title='Anime yourself!',
    image='https://nerdrr.s3.amazonaws.com/fruits-basket.jpg',
    queue=1,
    description='I can make you into an anime character. I am able to draw any style from your favorite studios.',
    price=25,
    deliveryTimeline=7,
    returnTimeline=1
  )
  sherman = Gig(
    ownerId=2,
    categoryId=4,
    title='Your song can be an anime.',
    image='https://nerdrr.s3.amazonaws.com/demon-slayer.jpg',
    queue=1,
    description='I can create an AMV to your favorite song. No matter the song or anime, I can make it work.',
    price=5,
    deliveryTimeline=3,
    returnTimeline=0
  )
  brian = Gig(
    ownerId=3,
    categoryId=1,
    title='Custom mini for D&D',
    image='https://nerdrr.s3.amazonaws.com/dnd-mini.jpg',
    queue=1,
    description='I can 3D print you a custom mini for your next D&D campaign.',
    price=43,
    deliveryTimeline=10,
    returnTimeline=4
  )
  anime1 = Gig(
    ownerId=1,
    categoryId=4,
    title='I will draw cute and detailed chibi anime',
    image='https://nerdrr.s3.amazonaws.com/anime1.jpg',
    queue=0,
    description="If you're looking for a cute and high detailed chibi drawing with affordable price, you've come to the right person! Just tell me what you have in mind and I can make it happen for you.",
    price=40,
    deliveryTimeline=7,
    returnTimeline=2
  )
  anime2= Gig(
    ownerId=2,
    categoryId=4,
    title='I will draw anime style cover for your book, light novel, manga',
    image='https://nerdrr.s3.amazonaws.com/anime2.jpg',
    queue=0,
    description="Hello, I will draw an beautiful art for your book/comic cover, light novel or wattpad with my style.",
    price=35,
    deliveryTimeline=10,
    returnTimeline=2
  )
  anime3 = Gig(
    ownerId=3,
    categoryId=4,
    title='I will draw a cute anime icon or profile picture',
    image='https://nerdrr.s3.amazonaws.com/anime3.jpg',
    queue=0,
    description="I will draw you or the person or character you want in a cute chibi anime style for your social media (Profile picture, icons, logo, twitch emote...) can be an original character or a fanart, also could be a real person. I'm also able to draw roblox and minecraft characters. You just have to send me references and a little description about the final illustration you want and I'll provide you a drawing about that. I'll be updating you, since the sketch to the final product. I love drawing backgrounds, but sky and mountains are my specialty! I'm a talented artist with years of experience, but I'm also a really patience person, I will help you with everything you need, the communication with me is really fluent. I'm looking fordward to work with you!",
    price=10,
    deliveryTimeline=2,
    returnTimeline=2
  )
  anime4 = Gig(
    ownerId=4,
    categoryId=4,
    title='I will draw your character to an anime illustration',
    image='https://nerdrr.s3.amazonaws.com/anime4.jpg',
    queue=0,
    description="Hi there. If you want to get an anime-style illustration of you, your character, your friend etc, you came into the right place. I'm here to offer you high quality anime-style illustration.",
    price=40,
    deliveryTimeline=6,
    returnTimeline=2
  )
  anime5 = Gig(
    ownerId=5,
    categoryId=4,
    title='I will make godlike anime music video amv and gmv',
    image='https://nerdrr.s3.amazonaws.com/anime5.jpg',
    queue=0,
    description="I do anime edits, amv and lyric videos. I have 4 years experience in video editing.",
    price=25,
    deliveryTimeline=6,
    returnTimeline=1
  )
  anime6 = Gig(
    ownerId=1,
    categoryId=4,
    title='I will teach you how to draw in any anime style',
    image='https://nerdrr.s3.amazonaws.com/anime6.jpg',
    queue=0,
    description="I want to help you meet your goals and draw better! My specialty is in an anime style in a digital medium. Subject matter is completely up to you, whatever it is you want to draw I will help you to achieve the skills you need to do so! I will teach you anything from the basics, to how to draw specifically in any style of your choosing, or even my own! In depth and step-by-step.",
    price=25,
    deliveryTimeline=7,
    returnTimeline=7
  )
  anime7 = Gig(
    ownerId=2,
    categoryId=4,
    title='I will design japanese or anime streetwear style for t shirt',
    image='https://nerdrr.s3.amazonaws.com/anime7.jpg',
    queue=0,
    description="Are you looking for awesome, streetwear Japanese and anime style t-shirt design? You are in the right gigs!, you'll get it here with high quality design. I will design streetwear from anime, japanese style and etc. I'm professional t-shirt designer and I do merch for anything.",
    price=75,
    deliveryTimeline=7,
    returnTimeline=3
  )
  anime8 = Gig(
    ownerId=3,
    categoryId=4,
    title='I will do the best anime banner header',
    image='https://nerdrr.s3.amazonaws.com/anime8.jpg',
    queue=0,
    description="If you are looking for a header or banner you are in the right place, my service is fast, safe and of quality.",
    price=10,
    deliveryTimeline=2,
    returnTimeline=0
  )
  anime9 = Gig(
    ownerId=4,
    categoryId=4,
    title='I will make an exclusive game or anime lofi remix for you',
    image='https://nerdrr.s3.amazonaws.com/anime9.jpg',
    queue=0,
    description="I listened to a lot of BGM since I was young. These type of music make me feel joyful and emotional and I also have many experiences for making lofi beats. Every remixes I made are completely royalty free and I made them from the scratch ( no template ). I will make sure that you are happy for the result before complete the order!",
    price=400,
    deliveryTimeline=30,
    returnTimeline=5
  )
  anime10 = Gig(
    ownerId=5,
    categoryId=4,
    title='I will write fantastic anime articles, scripts, and recaps for you',
    image='https://nerdrr.s3.amazonaws.com/anime10.jpg',
    queue=0,
    description="Are you looking for a supremely-talented copywriter for Anime? Someone who can deliver A+ content within or beyond your expectations, then you came to the right place! I am a die-hard Anime enthusiast with a passion for writing. I have been watching Anime for a long time now; I have basically grown with them.",
    price=25,
    deliveryTimeline=7,
    returnTimeline=3
  )

# Initial seed data
  db.session.add(christian)
  db.session.add(james)
  db.session.add(sherman)
  db.session.add(brian)

# Additional Anime seed data
  db.session.add(anime1)
  db.session.add(anime2)
  db.session.add(anime3)
  db.session.add(anime4)
  db.session.add(anime5)
  db.session.add(anime6)
  db.session.add(anime7)
  db.session.add(anime8)
  db.session.add(anime9)
  db.session.add(anime10)

# Additional Tabletop seed data

# Additional Video Game seed data

# Additional Card Game seed data

  db.session.commit()

def undo_gigs():
  db.session.execute('TRUNCATE gigs RESTART IDENTITY CASCADE;')
  db.session.commit()