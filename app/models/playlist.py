from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, DateTime, Date
from sqlalchemy.orm import relationship
from datetime import datetime
from .playlist_song import playlist_song

class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(40), nullable=False)
    genre = Column(String(40))
    description = Column(String(255))
    created_by_user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    songs = relationship('Song', secondary=playlist_song, back_populates='playlists')

    owner = relationship('User', back_populates='playlists')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'description': self.description,
            'created_by_user_id': self.created_by_user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }