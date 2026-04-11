from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer, BigInteger, UniqueConstraint, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

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
    description: Mapped[str] = mapped_column(String(250))
    website_url: Mapped[str] = mapped_column(String(250))
    logo_img: Mapped[str] = mapped_column(String(250))
    banner_img: Mapped[str] = mapped_column(String(250))

    game = relationship("Game", back_populates="company")
    companypost = relationship("CompanyPost", back_populates="company")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "description": self.description,
            "website_url": self.website_url,
            "logo_img": self.logo_img,
            "banner_img": self.banner_img
            # do not serialize the password, its a security breach
        }
    
class CompanyPost(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    id_company: Mapped[int] = mapped_column(ForeignKey("company.id"), nullable=False)
    message: Mapped[str] = mapped_column(String(250))
    image: Mapped[str] = mapped_column(String(250))
    post_date: Mapped[str] = mapped_column(String(250))

    company = relationship("Company", back_populates="companypost")

    def serialize(self):
        return {
            "id": self.id,
            "id_company": self.id_company,
            "message": self.message,
            "image": self.image,
            "post_date": self.post_date
            # do not serialize the password, its a security breach
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
    gameconsole = relationship("GameConsole", back_populates="game")
    gamefavorites = relationship("GameFavorites", back_populates="game")

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

    game = relationship("Game", back_populates="gameconsole")
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
            "game_name": self.game.name if self.game else "Unknown Game"
            # do not serialize the password, its a security breach
        }