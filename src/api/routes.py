"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Administrator, Company, Game
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# =========================
# CRUD ADMINISTRATOR
# =========================

@api.route('/administrator', methods=['GET'])
def get_administrators():

    all_administrators = Administrator.query.all()
    results = list(map(lambda admin: admin.serialize(), all_administrators))

    return jsonify(results), 200

@api.route('/administrator/<int:admin_id>', methods=['GET'])
def get_administrator(admin_id):

    admin = Administrator.query.filter_by(id=admin_id).first()
    if admin is None:
        return jsonify({
            "error": "Admin not found"
        }), 400 

    return jsonify(admin.serialize()), 200


@api.route('/administrator/<int:admin_id>', methods=['DELETE'])
def delete_administrator(admin_id):

    admin = Administrator.query.filter_by(id=admin_id).first()
    if admin is None:
        return jsonify({
            "error": "Admin not found"
        }), 400 
    
    db.session.delete(admin)
    db.session.commit()

    return jsonify({"message": "Admin " + admin.name + " deleted succesfully."}), 200

@api.route('/administrator', methods=['POST'])
def create_admin():

    body = request.get_json()
    admin = Administrator.query.filter_by(email=body['email']).first()
    
    if admin:
        return jsonify({
            "error": "This email already exists"
        }), 401
    
    admin = Administrator(**body)
    db.session.add(admin)
    db.session.commit()

    response_body = {
        "message": "New Admin created"
    }
    return jsonify(response_body), 200

@api.route('/administrator/<int:admin_id>', methods=['PUT'])
def update_administrator(admin_id):

    admin = Administrator.query.filter_by(id=admin_id).first()
    body = request.get_json()
    if admin is None:
        return jsonify({
            "error": "Admin not found"
        }), 400 
    
    admin.name = body.get('name',admin.name)
    admin.email = body.get('email',admin.email) 
    
    db.session.commit()

    return jsonify(admin.serialize()), 200

# =========================
# CRUD USER
# =========================

@api.route('/user', methods=['GET'])
def get_users():

    all_users = User.query.all()
    results = list(map(lambda user: user.serialize(), all_users))

    return jsonify(results), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({
            "error": "User not found"
        }), 400 

    return jsonify(user.serialize()), 200


@api.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return jsonify({
            "error": "User not found"
        }), 400 
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User " + user.name + " deleted succesfully."}), 200

@api.route('/user', methods=['POST'])
def create_user():

    body = request.get_json()
    user = User.query.filter_by(email=body['email']).first()
    
    if user:
        return jsonify({
            "error": "This email already exists"
        }), 401
    
    user = User(**body)
    db.session.add(user)
    db.session.commit()

    response_body = {
        "message": "New User created"
    }
    return jsonify(response_body), 200

@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    body = request.get_json()
    if user is None:
        return jsonify({
            "error": "User not found"
        }), 400 
    
    user.nickname = body.get('nickname',user.nickname)
    user.email = body.get('email',user.email) 
    
    db.session.commit()

    return jsonify(user.serialize()), 200

# =========================
# CRUD COMPANY
# =========================

@api.route('/company', methods=['GET'])
def get_companies():

    all_companies = Company.query.all()
    results = list(map(lambda company: company.serialize(), all_companies))

    return jsonify(results), 200

@api.route('/company/<int:company_id>', methods=['GET'])
def get_company(company_id):

    company = Company.query.filter_by(id=company_id).first()
    if company is None:
        return jsonify({
            "error": "Company not found"
        }), 400 

    return jsonify(company.serialize()), 200


@api.route('/company/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):

    company = Company.query.filter_by(id=company_id).first()
    if company is None:
        return jsonify({
            "error": "Company not found"
        }), 400 
    
    db.session.delete(company)
    db.session.commit()

    return jsonify({"message": "Company " + company.name + " deleted succesfully."}), 200

@api.route('/company', methods=['POST'])
def create_company():

    body = request.get_json()
    company = Company.query.filter_by(email=body['email']).first()
    
    if company:
        return jsonify({
            "error": "This email already exists"
        }), 401
    
    company = Company(**body)
    db.session.add(company)
    db.session.commit()

    response_body = {
        "message": "New Company created"
    }
    return jsonify(response_body), 200

@api.route('/company/<int:company_id>', methods=['PUT'])
def update_company(company_id):

    company = Company.query.filter_by(id=company_id).first()
    body = request.get_json()
    if company is None:
        return jsonify({
            "error": "Company not found"
        }), 400 
    
    company.name = body.get('name',company.name)
    company.email = body.get('email',company.email)
    company.description = body.get('description',company.description)
    company.website_url = body.get('website_url',company.website_url) 
    company.logo_img = body.get('logo_img',company.logo_img)
    company.banner_img = body.get('banner_img',company.banner_img)  
    
    db.session.commit()

    return jsonify(company.serialize()), 200

# =========================
# CRUD GAME
# =========================

@api.route('/game', methods=['GET'])
def get_games():

    all_games = Game.query.all()
    results = list(map(lambda game: game.serialize(), all_games))

    return jsonify(results), 200

@api.route('/game/<int:game_id>', methods=['GET'])
def get_game(game_id):

    game = Game.query.filter_by(id=game_id).first()
    if game is None:
        return jsonify({
            "error": "Game not found"
        }), 400 

    return jsonify(game.serialize()), 200


@api.route('/game/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):

    game = Game.query.filter_by(id=game_id).first()
    if game is None:
        return jsonify({
            "error": "Game not found"
        }), 400 
    
    db.session.delete(game)
    db.session.commit()

    return jsonify({"message": "Game " + game.name + " deleted succesfully."}), 200

@api.route('/game', methods=['POST'])
def create_game():

    body = request.get_json()
    game = Game.query.filter_by(name=body['name']).first()
    
    if game:
        return jsonify({
            "error": "This game already exists"
        }), 401
    
    game = Game(**body)
    db.session.add(game)
    db.session.commit()

    response_body = {
        "message": "New Game created"
    }
    return jsonify(response_body), 200

@api.route('/game/<int:game_id>', methods=['PUT'])
def update_game(game_id):

    game = Game.query.filter_by(id=game_id).first()
    body = request.get_json()
    if game is None:
        return jsonify({
            "error": "Game not found"
        }), 400 
    
    game.name = body.get('name',game.name)
    game.trailer_url = body.get('trailer_url',game.trailer_url)
    game.release_date = body.get('release_date',game.release_date)
    game.total_sales = body.get('total_sales',game.total_sales) 
    game.current_players = body.get('current_players',game.current_players)
    game.description = body.get('description',game.description)
    game.cover_img = body.get('cover_img',game.cover_img)  
    
    db.session.commit()

    return jsonify(game.serialize()), 200

