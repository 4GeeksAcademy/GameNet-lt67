from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer, BigInteger, UniqueConstraint, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class Administrator(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email
            # do not serialize the password, its a security breach
        }

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nickname: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    
    likes: Mapped[list["PostLike"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    comments: Mapped[list["PostComment"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    consolefavorites = relationship("ConsoleFavorites", back_populates="user")
    gamefavorites = relationship("GameFavorites", back_populates="user")

    def serialize(self):
        return {
            "id": self.id,
            "nickname": self.nickname,
            "email": self.email
            # do not serialize the password, its a security breach
        }


class Company(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    verified: Mapped[bool] = mapped_column(Boolean, default=False)
    description: Mapped[str] = mapped_column(String(250))
    website_url: Mapped[str] = mapped_column(String(250))
    logo: Mapped[str] = mapped_column(Text)
    banner_img: Mapped[str] = mapped_column(Text, nullable=False)

    game = relationship("Game", back_populates="company")
    companypost = relationship("CompanyPost", back_populates="company")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "description": self.description,
            "website_url": self.website_url,
            "logo": self.logo,
            "banner_img": self.banner_img,
            "verified": self.verified
            # do not serialize the password, its a security breach
        }
    
class CompanyPost(db.Model):
    __tablename__ = 'company_post'
    id: Mapped[int] = mapped_column(primary_key=True)
    id_company: Mapped[int] = mapped_column(ForeignKey("company.id"), nullable=False)
    content_type: Mapped[str] = mapped_column(String(50), default="announcement")
    message: Mapped[str] = mapped_column(Text, nullable=False)
    image: Mapped[str] = mapped_column(Text, nullable=True)
    post_date: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    shares = db.Column(db.Integer, default=0)


    likes: Mapped[list["PostLike"]] = relationship(back_populates="post", cascade="all, delete-orphan")
    comments: Mapped[list["PostComment"]] = relationship(back_populates="post", cascade="all, delete-orphan")   
    company = relationship("Company", back_populates="companypost")

    def serialize(self):
        return {
            "id": self.id,
            "timestamp": self.post_date.strftime("%b %d, %Y") if self.post_date else "No date",
            "company": {
                "id_company": self.id_company,
                "name": self.company.name if self.company else "Unknown",
                "logo": self.company.logo if self.company else "",
                "verified": self.company.verified if self.company else False
            },
            "content": {
                "type": self.content_type,
                "text": self.message,
                "image": self.image
            },
            "stats": {
                "likes": len(self.likes) if self.likes else 0,
                "comments": len(self.comments) if self.comments else 0,
                "shares": self.shares if self.shares else 0
            }
        }
    
class Game(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_company: Mapped[int] = mapped_column(ForeignKey("company.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(200))
    trailer_url: Mapped[str] = mapped_column(Text, nullable=True)
    release_date: Mapped[str] = mapped_column(Text, nullable=True)
    total_sales: Mapped[int] = mapped_column(BigInteger, default=0)
    current_players: Mapped[int] = mapped_column(BigInteger, default=0)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    cover_img: Mapped[str] = mapped_column(Text, nullable=True)

    company = relationship("Company", back_populates="game")

    gameconsole = db.relationship('GameConsole', backref='games', cascade="all, delete-orphan")
    gamefavorites = relationship("GameFavorites", back_populates="game", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "id_company": self.id_company,
            "name": self.name,
            "trailer_url": self.trailer_url,
            "release_date": self.release_date,
            "total_sales": self.total_sales,
            "current_players": self.current_players,
            "description": self.description,
            "cover_img": self.cover_img
            # do not serialize the password, its a security breach
        }

class Console(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    price: Mapped[str] = mapped_column(String(120))

    gameconsole = relationship("GameConsole", back_populates="console")
    consolefavorites = relationship("ConsoleFavorites", back_populates="console")


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price
            # do not serialize the password, its a security breach
        }

class GameConsole(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    game_id: Mapped[int] = mapped_column(ForeignKey("game.id"), nullable=False)
    console_id: Mapped[int] = mapped_column(ForeignKey("console.id"), nullable=False)

    __table_args__ = (UniqueConstraint('game_id', 'console_id', name='_game_console_uc'),)

    game = db.relationship("Game", back_populates="gameconsole")
    console = relationship("Console", back_populates="gameconsole")

    def serialize(self):
        return {
            "id": self.id,
            "game_id": self.game_id,
            "console_id": self.console_id,
            "game_name": self.game.name if self.game else "Unknown Game",
            "console_name": self.console.name if self.console else "Unknown Console"
            # do not serialize the password, its a security breach
        }
    
class ConsoleFavorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    console_id: Mapped[int] = mapped_column(ForeignKey("console.id"), nullable=False)

    __table_args__ = (UniqueConstraint('user_id', 'console_id', name='_user_console_uc'),)

    user = relationship("User", back_populates="consolefavorites")
    console = relationship("Console", back_populates="consolefavorites")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "console_id": self.console_id,
            "user_name": self.user.nickname if self.user else "Unknown User",
            "console_name": self.console.name if self.console else "Unknown Console"
            # do not serialize the password, its a security breach
        }
    

class GameFavorites(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    game_id: Mapped[int] = mapped_column(ForeignKey("game.id"), nullable=False)

    __table_args__ = (UniqueConstraint('user_id', 'game_id', name='_user_game_uc'),)

    user = relationship("User", back_populates="gamefavorites")
    game = relationship("Game", back_populates="gamefavorites")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id,
            "user_name": self.user.nickname if self.user else "Unknown User",
            "game_name": self.game.name if self.game else "Unknown Game",
            "game_image": self.game.cover_img if self.game else "Uknown Game"
            # do not serialize the password, its a security breach
        }


class PostLike(db.Model):
    __tablename__ = 'post_like'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    post_id: Mapped[int] = mapped_column(ForeignKey("company_post.id"))

    user: Mapped["User"] = relationship(back_populates="likes")
    post: Mapped["CompanyPost"] = relationship(back_populates="likes")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "post_id": self.post_id
            # do not serialize the password, its a security breach
        }
    

class PostComment(db.Model):
    __tablename__ = 'post_comment'
    id: Mapped[int] = mapped_column(primary_key=True)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    post_id: Mapped[int] = mapped_column(ForeignKey("company_post.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="comments")
    post: Mapped["CompanyPost"] = relationship(back_populates="comments")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "created_at": self.created_at,
            "user_name": self.user.nickname if self.user else "Unknown User"
            # do not serialize the password, its a security breach
        }