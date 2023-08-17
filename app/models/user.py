from flask_sqlalchemy import SQLAlchemy
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .like import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(40), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    first_name = Column(String(40))
    last_name = Column(String(40))
    bio = Column(String(255))
    profile_pic_url = Column(String(1024))
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    owned_songs = relationship('Song', back_populates='owner', cascade='all, delete-orphan')

    all_comments = relationship('Comment', back_populates='user', cascade='all, delete-orphan')

    liked_songs = relationship('Song', secondary=likes, back_populates='liked_users')

    playlists = relationship('Playlist', back_populates='owner', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'bio': self.bio,
            'profile_pic_url': self.profile_pic_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_public(self):
        return {
            'id': self.id,
            'username': self.username,
            'bio': self.bio,
            'profile_pic_url': self.profile_pic_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_comment(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_pic_url': self.profile_pic_url,
        }
