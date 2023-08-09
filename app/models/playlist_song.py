from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

playlist_song = db.Table(
    'playlist_song',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True ),
    db.Column('song_id', db.Integer, db.ForeignKey('songs.id')),
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlists.id')),
    db.Column('created_at', db.DateTime, default=datetime.now)
)

if environment == "production":
    playlist_song.schema = SCHEMA