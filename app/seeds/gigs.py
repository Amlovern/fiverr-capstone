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

  tableTop1 = Gig(
    ownerId=1,
    categoryId=1,
    title='I will write lore for your video or tabletop game',
    image='https://nerdrr.s3.amazonaws.com/tabletop1.jpg',
    queue=0,
    description="Understanding that creative writing is not the main player in video game development, I will strive to fulfill your vision, writing in a way that goes well with your preexisting mechanics and general aesthetic. I will need you to inform me of your specific writing need and I'm willing to meet via video call to fully discuss the gig, so as to make the final product as close to your expectations as possible. Feel free to ask me any questions you may have before placing your order.",
    price=150,
    deliveryTimeline=7,
    returnTimeline=2
  )
  tableTop2 = Gig(
    ownerId=2,
    categoryId=1,
    title='I will write music for your tabletop rpg games',
    image='https://nerdrr.s3.amazonaws.com/tabletop2.jpg',
    queue=0,
    description="I want to be sure that you get the music you want so it might take some time to create the best theme song I can write to match your expectations, but when you get your theme I guarantee that you're gonna be satisfied.",
    price=25,
    deliveryTimeline=14,
    returnTimeline=10
  )
  tableTop3 = Gig(
    ownerId=3,
    categoryId=1,
    title='I will create fantasy city, region, and world maps for your tabletop games',
    image='https://nerdrr.s3.amazonaws.com/tabletop3.jpg',
    queue=0,
    description="Hi, there traveler! Take a seat by the fire and let me explain to you why I am the perfect place to spend your hard-earned adventurer's gold. Although I am relatively new on Nerdrr, as a forever DM I have been making battle maps for 12 years now. I have progressed from simple pen and paper maps at the dinner table to using professional software to create beautiful 2D and 3D maps in JPEG Form.",
    price=25,
    deliveryTimeline=5,
    returnTimeline=1
  )
  tableTop4 = Gig(
    ownerId=4,
    categoryId=1,
    title='I will paint tabletop game models',
    image='https://nerdrr.s3.amazonaws.com/tabletop4.jpg',
    queue=0,
    description="I love painting Warhammer models! I can do a variety of tabletop minis also. I've done models from Age of Sigmar, 40k, Warcry, Warmachine, D&D, custom 3D prints, terrain, and much more. I can paint already assembled or assemble according to instructions. I always use the best paints and glues to make sure the final results are durable.",
    price=80,
    deliveryTimeline=7,
    returnTimeline=0
  )
  tableTop5 = Gig(
    ownerId=5,
    categoryId=1,
    title='I will draw dnd character illustration or concept art',
    image='https://nerdrr.s3.amazonaws.com/tabletop5.jpg',
    queue=0,
    description="Start your DnD journey with a visual avatar of your DnD Character destined to make or break the world of fantasy! I will conjure your DnD Character from your imagination to reality. Before I get started, provide the name and backstory of your DnD Character that I may know it more. Provide me the most exciting details, your character's feats of valor, it's scheme and dread and I will do my best to bring perfection to the character art. So roll your dice, check those stats, and ready those spells. I will conjure your character into the realm of Dungeons and dragons!",
    price=55,
    deliveryTimeline=7,
    returnTimeline=1
  )
  tableTop6 = Gig(
    ownerId=1,
    categoryId=1,
    title='I will create a board game alongside you',
    image='https://nerdrr.s3.amazonaws.com/tabletop6.jpg',
    queue=0,
    description="The best and most cost-effective assistance you can have in your game project is working closely with who has field experience in game developing and publishing! Game design session alongside you through a call – if you seek other game design tutoring formats, let me know and we can come up with the best solution for your project.",
    price=30,
    deliveryTimeline=7,
    returnTimeline=0
  )
  tableTop7 = Gig(
    ownerId=2,
    categoryId=1,
    title='I will sculpt 3d printable miniatures and tabletop games and 3d printing from sketch',
    image='https://nerdrr.s3.amazonaws.com/tabletop7.jpeg',
    queue=0,
    description="I can sculpt from reference or from concept or concept design any sculpt you want, the sky is the limit! or is it ??.. Haha! can sculpt Aliens as well!... so.. no, it's not the limit if you were confused about that.",
    price=300,
    deliveryTimeline=7,
    returnTimeline=2
  )
  tableTop8 = Gig(
    ownerId=3,
    categoryId=1,
    title='I will design a board card game with a tabletop, box, and cards',
    image='https://nerdrr.s3.amazonaws.com/tabletop8.jpg',
    queue=0,
    description="We are a game development studio and publisher. We have over 5 years of experience in creating and designing games.",
    price=500,
    deliveryTimeline=30,
    returnTimeline=4
  )
  tableTop9 = Gig(
    ownerId=4,
    categoryId=1,
    title='I will create fantasy battlemaps for your tabletop games',
    image='https://nerdrr.s3.amazonaws.com/tabletop9.jpg',
    queue=0,
    description="Hi, there traveler! Take a seat by the fire and let me explain to you why I am the perfect place to spend your hard-earned adventurer's gold. Although I am relatively new on Nerdrr, as a forever DM I have been making battle maps for 12 years now. I have progressed from simple pen and paper maps at the dinner table to using professional software to create beautiful 2D and 3D maps.",
    price=20,
    deliveryTimeline=3,
    returnTimeline=1
  )
  tableTop10 = Gig(
    ownerId=5,
    categoryId=1,
    title='I will covert your pictures or illustrations into the jigsaw puzzle',
    image='https://nerdrr.s3.amazonaws.com/tabletop10.jpg',
    queue=0,
    description="Hey! In this gig, I will convert your photos, arts, designs, illustrations into jigsaw puzzles and other Photo effects. I can also make cartoon characters or illustrations and convert them into a jigsaw puzzle. Send me your photos, arts, designs, products, posters, or logos and I will do the rest according to your desire.",
    price=25,
    deliveryTimeline=4,
    returnTimeline=2
  )

  videoGame1 = Gig(
    ownerId=1,
    categoryId=3,
    title='I will record a character voice over for video games and animation',
    image='https://nerdrr.s3.amazonaws.com/videogame1.jpg',
    queue=0,
    description="MY #1 GOAL IS TO OFFER YOU KILLER MALE CARTOON, ANIMATION OR CHARACTER VOICES FOR VIDEOS GAMES, CARTOONS, ANIMATIONS, CHILDREN'S STORIES, APPS OR PHONE MESSAGES!",
    price=15,
    deliveryTimeline=1,
    returnTimeline=0
  )
  videoGame2 = Gig(
    ownerId=2,
    categoryId=3,
    title='I will do a funny gaming video edit for youtube',
    image='https://nerdrr.s3.amazonaws.com/videogame2.jpg',
    queue=0,
    description="I never like to Rush my edits, I prefer quality over quantity(Typical, Huh), and yes, I'm very much transparent with my work and Relationship with my Clients :)",
    price=70,
    deliveryTimeline=7,
    returnTimeline=2
  )
  videoGame3 = Gig(
    ownerId=3,
    categoryId=3,
    title='I will produce original professional music for your video game',
    image='https://nerdrr.s3.amazonaws.com/videogame3.jpg',
    queue=0,
    description="I will produce an original piece of music for your game. The song can be whatever style you need, I am fully flexible!",
    price=25,
    deliveryTimeline=7,
    returnTimeline=4
  )
  videoGame4 = Gig(
    ownerId=4,
    categoryId=3,
    title='I will 3d character modeling realistic or stylized for video games or animations',
    image='https://nerdrr.s3.amazonaws.com/videogame4.jpg',
    queue=0,
    description="Do you need a 3d model of a character? Hello, I adapt to many styles and I always try to make my work as good as possible.",
    price=185,
    deliveryTimeline=10,
    returnTimeline=3
  )
  videoGame5 = Gig(
    ownerId=5,
    categoryId=3,
    title='I will create professional mobile promo video for apps and games',
    image='https://nerdrr.s3.amazonaws.com/videogame5.jpg',
    queue=0,
    description="I will Create 30 Second Promo Video for your Apps/Games. I will record video or screenshots of your App and game from APK. I will add best captions to pointing out key features your app and game. I will add amazing intro and outro in your app game promo video. I will add best suitable music.",
    price=20,
    deliveryTimeline=2,
    returnTimeline=1
  )
  videoGame6 = Gig(
    ownerId=1,
    categoryId=3,
    title='I will record evil video game creature or cartoon character voice',
    image='https://nerdrr.s3.amazonaws.com/videogame6.jpg',
    queue=0,
    description="Hi, thanks for stopping by! I provide voice overs and voice acting for animation, cartoon and video game characters. I know what makes a character engaging and believable!",
    price=150,
    deliveryTimeline=3,
    returnTimeline=1
  )
  videoGame7 = Gig(
    ownerId=2,
    categoryId=3,
    title='I will compose chiptune or 8 bit music for your video game',
    image='https://nerdrr.s3.amazonaws.com/videogame7.jpg',
    queue=0,
    description="I will make you NES / Chiptune / 8 bit style music for you. I can make pretty much any style or vibes you want.",
    price=20,
    deliveryTimeline=7,
    returnTimeline=0
  )
  videoGame8 = Gig(
    ownerId=3,
    categoryId=3,
    title='I will create cinematic game trailer teaser promo video',
    image='https://nerdrr.s3.amazonaws.com/videogame8.jpg',
    queue=0,
    description="I will make a short cinematic and epic movie trailer, game trailer or, book trailer or teaser for you, Introducing a new High-Quality Epic Cinematic Trailer to perfectly feature your product in Top Listings.",
    price=10,
    deliveryTimeline=2,
    returnTimeline=1
  )
  videoGame9 = Gig(
    ownerId=4,
    categoryId=3,
    title='I will write your video game script or dialogue',
    image='https://nerdrr.s3.amazonaws.com/videogame9.jpg',
    queue=0,
    description="The code and the models are coming together. You've spent some time on the UI, on the cutscenes, and way too much time on the foliage. Your main character, in their first cut scene, sword sweeping wildly through the air--explosions going off in the background--turns to your Big Bad Guy, and says.... Well, what does he say? Whether you need a full plot and outline treatment of your story ideas, plucky dialogue options, or quests ideas, let me take care of that part for you.",
    price=45,
    deliveryTimeline=3,
    returnTimeline=3
  )
  videoGame10 = Gig(
    ownerId=5,
    categoryId=3,
    title='I will write excellent video game related articles',
    image='https://nerdrr.s3.amazonaws.com/videogame10.jpg',
    queue=0,
    description="With this Gig, I will provide a well written article on any facet of the gaming industry. Do you need a game reviewed? I can do that. Perhaps you need someone to cover a Nintendo Direct? I'm your guy. I am a lifelong gamer and am heavily invested in the industry, so from handhelds to PCs to cloud gaming, I can write about it all.",
    price=20,
    deliveryTimeline=2,
    returnTimeline=1
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
  db.session.add(tableTop1)
  db.session.add(tableTop2)
  db.session.add(tableTop3)
  db.session.add(tableTop4)
  db.session.add(tableTop5)
  db.session.add(tableTop6)
  db.session.add(tableTop7)
  db.session.add(tableTop8)
  db.session.add(tableTop9)
  db.session.add(tableTop10)

# Additional Video Game seed data
  db.session.add(videoGame1)
  db.session.add(videoGame2)
  db.session.add(videoGame3)
  db.session.add(videoGame4)
  db.session.add(videoGame5)
  db.session.add(videoGame6)
  db.session.add(videoGame7)
  db.session.add(videoGame8)
  db.session.add(videoGame9)
  db.session.add(videoGame10)

# Additional Card Game seed data

  db.session.commit()

def undo_gigs():
  db.session.execute('TRUNCATE gigs RESTART IDENTITY CASCADE;')
  db.session.commit()