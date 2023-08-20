from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, DateTime, Date
from sqlalchemy.orm import relationship
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True, autoincrement=True)
    song_id = Column(Integer, ForeignKey(add_prefix_for_prod('songs.id')))
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    text = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    song = relationship("Song", back_populates="user_comments")

    user = relationship("User", back_populates="all_comments")

    def to_dict(self):
        return {
            'id': self.id,
            'song_id': self.song_id,
            'user_id': self.user_id,
            'text': self.text,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict_comment(),
            'song': self.song.to_dict_comment()
        }