from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, DateTime, Date
from sqlalchemy.orm import relationship
from datetime import datetime
from .like import likes
from .playlist_song import playlist_song

class Song(db.Model):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(256), nullable=False)
    artist = Column(String(256), nullable=False)
    album = Column(String(256))
    genre = Column(String(256))
    description = Column(String(1024))
    release_date = Column(Date)
    lyrics = Column(String(4096))
    play_count = Column(Integer, nullable=False, default=0)
    duration = Column(Integer)
    s3_key = Column(String(1024), nullable=False)
    file_size = Column(String(40))
    thumbnail_url = Column(String(1024))
    uploaded_by_user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    owner = relationship('User', back_populates='owned_songs')

    user_comments = relationship('Comment', back_populates='song', cascade='all, delete-orphan')

    liked_users = relationship('User', secondary=likes, back_populates='liked_songs')

    playlists = relationship('Playlist', secondary=playlist_song, back_populates='songs')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'artist': self.artist,
            'album': self.album,
            'genre': self.genre,
            'description': self.description,
            'release_date': self.release_date,
            'lyrics': self.lyrics,
            'play_count': self.play_count,
            'duration': self.duration,
            's3_key': self.s3_key,
            'file_size': self.file_size,
            'thumbnail_url': self.thumbnail_url,
            'uploaded_by_user_id': self.uploaded_by_user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_comment(self):
        return {
            'title': self.title,
            'artist': self.artist,
            'album': self.album,
            'thumbnail_url': self.thumbnail_url,
        }