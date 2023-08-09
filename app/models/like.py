from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

likes = db.Table(
    'likes',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True ),
    db.Column('song_id', db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id'))),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('created_at', db.DateTime, default=datetime.now)
)

if environment == "production":
    likes.schema = SCHEMA