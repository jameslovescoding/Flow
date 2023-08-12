from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():

    # songs for user 1, trance and progressive metal

    song1 = Song(
      title="Northern Lights Everything (Dave' Sonar 3am. Mashup)",
      artist="Alexander Kasyarumov, Sergey Stepanovich, Danny Cullen, Kevin Murphy, Daniela Glogojeanu, Esmee Bor Stotijn, Jhonathan David Monsalve Torres",
      album="Orchestral Trance Year Mix 2016",
      genre="uplifting trance",
      s3_key="aws-s3-key",
      thumbnail_url="https://i.scdn.co/image/ab67616d0000b2739c6ecfda15118f7c2c57bff8",
      uploaded_by_user_id=1
    )
    song2 = Song(
      title="All Over Again",
      artist="BRYAN KEARNEY ft. Plumb",
      album="Live at Transmission Bangkok 2017",
      genre="uplifting trance",
      s3_key="aws-s3-key",
      thumbnail_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGE1l7b3-nO2FL7W0P_7L0k_Ev5BMlzTpxpg&usqp=CAU",
      uploaded_by_user_id=1
    )
    song3 = Song(
      title="I Love You",
      artist="KEY4050 & Plumb",
      album="Live at Transmission Prague 2019",
      genre="uplifting trance",
      s3_key="aws-s3-key",
      thumbnail_url="https://godinallthings.com/wp-content/uploads/2013/08/god-is-love.jpg",
      uploaded_by_user_id=1
    )
    song4 = Song(
      title="BWV 846 Prelude no. 1 in C Major Remix Version 2",
      artist="Johann Sebastian Bach, The Rad Man",
      album="The Rad Man - Classics Trance Remix",
      genre="trance classics",
      s3_key="aws-s3-key",
      thumbnail_url="https://upload.wikimedia.org/wikipedia/commons/6/6a/Johann_Sebastian_Bach.jpg",
      uploaded_by_user_id=1
    )
    song5 = Song(
      title="Canon in D - Pachelbel Trance Remix",
      artist="Johann Pachelbel, The Rad Man",
      album="The Rad Man - Classics Trance Remix",
      genre="trance classics",
      s3_key="aws-s3-key",
      thumbnail_url="https://f4.bcbits.com/img/a3399630193_65",
      uploaded_by_user_id=1
    )

    # songs for user 2, pop music and Talor Swift

    song6 = Song(
      title="Shake It Off",
      artist="Taylor Swift",
      album="Shake It Off",
      genre="pop country folk rock alternative",
      s3_key="aws-s3-key",
      thumbnail_url="https://slm-assets.secondlife.com/assets/10273499/view_large/Taylor-Swift-Shake-It-Off.jpg?1410312641",
      uploaded_by_user_id=2
    )
    song7 = Song(
      title="Blank Space",
      artist="Taylor Swift",
      album="Blank Space",
      genre="pop country folk rock alternative",
      s3_key="aws-s3-key",
      thumbnail_url="https://realworldmusictheory.com/content/images/size/w2000/2021/01/Taylor-Swift-blank-space.jpg",
      uploaded_by_user_id=2
    )
    song8 = Song(
      title="Bad Blood ft. Kendrick Lamar",
      artist="Taylor Swift",
      album="Bad Blood",
      genre="pop country folk rock alternative",
      s3_key="aws-s3-key",
      thumbnail_url="https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/16/ac/6f/16ac6fdc-f3cd-6588-bd58-163cf41f7e58/00843930018314.rgb.jpg/632x632bb.webp",
      uploaded_by_user_id=2
    )
    song9 = Song(
      title="You Belong With Me",
      artist="Taylor Swift",
      album="You Belong With Me",
      genre="pop country folk rock alternative",
      s3_key="aws-s3-key",
      thumbnail_url="https://hips.hearstapps.com/hmg-prod/images/you-belong-with-me-1503945709.png?crop=1xw:1xh;center,top&resize=980:*",
      uploaded_by_user_id=2
    )
    song10 = Song(
      title="Look What You Made Me Do",
      artist="Taylor Swift",
      album="Look What You Made Me Do",
      genre="pop country folk rock alternative",
      s3_key="aws-s3-key",
      thumbnail_url="https://i.guim.co.uk/img/media/70f659fc1e80bec0ff635c9ca3bcb625658d6696/197_0_985_591/master/985.png?width=620&dpr=2&s=none",
      uploaded_by_user_id=2
    )

    # songs for user 3, rock music

    song11 = Song(
      title="I. DOGMA",
      artist="Mick Gordon",
      album="DOOM - Original Game Soundtrack",
      genre="Metal",
      s3_key="aws-s3-key",
      thumbnail_url="https://www.superjumpmagazine.com/content/images/size/w2000/2022/12/doometernalartwork.jpg",
      uploaded_by_user_id=3
    )
    song12 = Song(
      title="Rip & Tear",
      artist="Mick Gordon",
      album="DOOM - Original Game Soundtrack",
      genre="Metal",
      s3_key="aws-s3-key",
      thumbnail_url="https://www.superjumpmagazine.com/content/images/2022/12/doom1.webp",
      uploaded_by_user_id=3
    )
    song13 = Song(
      title="II. DEMIGOD",
      artist="Mick Gordon",
      album="DOOM - Original Game Soundtrack",
      genre="Metal",
      s3_key="aws-s3-key",
      thumbnail_url="https://www.superjumpmagazine.com/content/images/size/w2400/2022/12/doom2016art.webp",
      uploaded_by_user_id=3
    )
    song14 = Song(
      title="The Only Thing They Fear Is You",
      artist="Mick Gordon",
      album="DOOM - Original Game Soundtrack",
      genre="Metal",
      s3_key="aws-s3-key",
      thumbnail_url="https://cdn.gaminggorilla.com/wp-content/uploads/2020/03/Doom-Eternal-Wallpaper.png",
      uploaded_by_user_id=3
    )
    song15 = Song(
      title="BFG Division",
      artist="Mick Gordon",
      album="DOOM - Original Game Soundtrack",
      genre="Metal",
      s3_key="aws-s3-key",
      thumbnail_url="https://cdn.mos.cms.futurecdn.net/hxhjWu67RvF5aStMtq4voY-1920-80.jpg.webp",
      uploaded_by_user_id=3
    )

    # songs for user 4, dj and rap

    song16 = Song(
      title="Lose Yourself",
      artist="Eminem",
      album="Lose Yourself",
      genre="rap",
      s3_key="aws-s3-key",
      thumbnail_url="https://media.npr.org/assets/music/news/2010/06/eminem-52893634f7c035450a7b5ff2e040cacb4012395e-s600-c85.webp",
      uploaded_by_user_id=4
    )
    song17 = Song(
      title="Till I Collapse",
      artist="Eminem",
      album="Till I Collapse",
      genre="rap",
      s3_key="aws-s3-key",
      thumbnail_url="https://cdn.britannica.com/63/136263-050-7FBFFBD1/Eminem.jpg",
      uploaded_by_user_id=4
    )
    song18 = Song(
      title="The Real Slim Shady",
      artist="Eminem",
      album="The Marshall Mathers LP",
      genre="rap",
      s3_key="aws-s3-key",
      thumbnail_url="https://www.rollingstone.com/wp-content/uploads/2015/09/EminemLead.jpg?w=1581&h=1054&crop=1",
      uploaded_by_user_id=4
    )
    song19 = Song(
      title="Stan ft. Dido",
      artist="Eminem",
      album="Stan",
      genre="rap",
      s3_key="aws-s3-key",
      thumbnail_url="https://imagez.tmz.com/image/a6/4by3/2020/11/04/a6e1a146a0db488892e71a9071be4dd9_md.jpg",
      uploaded_by_user_id=4
    )
    song20 = Song(
      title="Sing For The Moment",
      artist="Eminem",
      album="Sing For The Moment",
      genre="rap",
      s3_key="aws-s3-key",
      thumbnail_url="https://www.billboard.com/wp-content/uploads/2020/03/Eminem-Stan-Dido-2020-billboard-1548-1585144435.jpg?w=942&h=623&crop=1",
      uploaded_by_user_id=4
    )

    # songs for user 5, Chinese pop music

    song21 = Song(
      title="Ding Dong Song",
      artist="Song by Günther & The Sunshine Girls",
      album="Pleasureman",
      genre="pop, new age",
      s3_key="aws-s3-key",
      thumbnail_url="https://1.bp.blogspot.com/-NsdbcXAen7c/YNUmZM315FI/AAAAAAAAyTQ/KP_f07aDaXsm_5JlW5-PnHiTtWQ8SZbuwCLcBGAsYHQ/s320/Gu%25CC%2588nther.jpg",
      uploaded_by_user_id=5
    )
    song22 = Song(
      title="Barbie Girl",
      artist="Aqua",
      album="Aquarium",
      genre="eurodance, bubblegum dance, pop",
      s3_key="aws-s3-key",
      thumbnail_url="https://cdn-focoe.nitrocdn.com/xSsPHwpAkYPNEyeeWdIKGzKpVUOqbmas/assets/images/optimized/rev-52428ff/wp-content/uploads/2023/05/Barbie-Girl-790x350.jpg",
      uploaded_by_user_id=5
    )
    song23 = Song(
      title="Caramelldansen",
      artist="Caramella Girls",
      album="Caramelldansen",
      genre="pop",
      s3_key="aws-s3-key",
      thumbnail_url="https://upload.wikimedia.org/wikipedia/en/7/7c/Caramelldansen.jpg",
      uploaded_by_user_id=5
    )
    song24 = Song(
      title="HEYYEYAAEYAAAEYAEYAA",
      artist="HEYYEYAAEYAAAEYAEYAA",
      album="HEYYEYAAEYAAAEYAEYAA",
      genre="pop",
      s3_key="aws-s3-key",
      thumbnail_url="https://static.wikia.nocookie.net/trollopolis/images/a/a0/He_man_said_hey_by_cottommy-d48epne.jpg/revision/latest?cb=20111118164815",
      uploaded_by_user_id=5
    )
    song25 = Song(
      title="Better Off Alone",
      artist="Alice Deejay",
      album="Better Off Alone",
      genre="dance, electronic",
      s3_key="aws-s3-key",
      thumbnail_url="https://m.media-amazon.com/images/I/31QCXBC2ARL._QL70_FMwebp_.jpg",
      uploaded_by_user_id=5
    )
    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)
    db.session.add(song21)
    db.session.add(song22)
    db.session.add(song23)
    db.session.add(song24)
    db.session.add(song25)
    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
    db.session.commit()