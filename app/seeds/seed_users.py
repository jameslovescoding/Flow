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
        password='Password123$',
        username='david2755',
        email='david@aa.io',
    )
    user2 = User(
        password='Password123$',
        username='JennyL7714',
        email='jenny@aa.io',
    )
    user3 = User(
        password='Password123$',
        username='alexb117',
        email='alex@aa.io',
    )
    user4 = User(
        password='Password123$',
        username='blackpanther1990',
        email='chad@aa.io',
    )
    user5 = User(
        password='Password123$',
        username='TM945',
        email='terry@aa.io',
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