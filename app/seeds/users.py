from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    # demo = User(username='Demo', email='demo@aa.io', password='password')
    # marnie = User(username='marnie', email='marnie@aa.io', password='password')
    # bobbie = User(username='bobbie', email='bobbie@aa.io', password='password')

    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    user1 = User(
        password='password',
        first_name='David',
        last_name='Smith',
        username='david2755',
        email='david@aa.io',
        bio='I like trance music and progressive metal music',
        profile_pic_url='https://media.istockphoto.com/id/465021633/photo/young-boy-dressed-as-a-gentleman-with-sunglasses.jpg?s=612x612&w=0&k=20&c=90ILhXLf-H7YHH0LrGGR0cRYYNwd9L5mJtoZr38cEik=',
    )
    user2 = User(
        password='password',
        first_name='Jenny',
        last_name='Lee',
        username='JennyL7714',
        email='jenny@aa.io',
        bio='I like pop music and Talor Swift',
        profile_pic_url='https://sf2.be.com/wp-content/uploads/sites/2/2016/05/screen-shot-2016-05-18-at-12.54.32-pm-417x410.png',
    )
    user3 = User(
        password='password',
        first_name='Alex',
        last_name='Berg',
        username='alexb117',
        email='alex@aa.io',
        bio='I like rock music',
        profile_pic_url='https://www.billboard.com/wp-content/uploads/2023/02/Bram-van-den-Berg-billboard-1548.jpg?w=942&h=623&crop=1',
    )
    user4 = User(
        password='password',
        first_name='Chadwick',
        last_name='Boseman',
        username='blackpanther1990',
        email='chad@aa.io',
        bio='I like dj and rap',
        profile_pic_url='https://www.syfy.com/sites/syfy/files/2020/12/chadwick-boseman-black-panther.jpg',
    )
    user5 = User(
        password='password',
        first_name='Terry',
        last_name='Ma',
        username='TM945',
        email='terry@aa.io',
        bio='I like Chinese pop music',
        profile_pic_url='https://img.buzzfeed.com/buzzfeed-static/static/2015-07/16/16/enhanced/webdr01/original-1836-1437079228-4.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto',
    )
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()