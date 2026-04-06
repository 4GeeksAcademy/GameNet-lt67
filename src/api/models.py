from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey, Integer, BigInteger
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
    name: Mapped[str] = mapped_column(String(120))
    trailer_url: Mapped[str] = mapped_column(String(250))
    release_date: Mapped[str] = mapped_column(String(250))
    total_sales: Mapped[int] = mapped_column(BigInteger)
    current_players: Mapped[int] = mapped_column(BigInteger)
    description: Mapped[str] = mapped_column(String(250))
    cover_img: Mapped[str] = mapped_column(String(250))

    company = relationship("Company", back_populates="game")

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

    


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price
            # do not serialize the password, its a security breach
        }