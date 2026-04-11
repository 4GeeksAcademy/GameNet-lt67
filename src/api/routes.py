"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Administrator, Company, Game, CompanyPost, Console, GameConsole, ConsoleFavorites, GameFavorites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy.orm import joinedload
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


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


# =========================
# CRUD COMPANY POST
# =========================

@api.route('/companypost', methods=['GET'])
def get_companyposts():

    all_company_posts = CompanyPost.query.all()
    results = list(map(lambda post: post.serialize(), all_company_posts))

    return jsonify(results), 200

@api.route('/companypost/<int:companypost_id>', methods=['GET'])
def get_companypost(companypost_id):

    companypost = CompanyPost.query.filter_by(id=companypost_id).first()
    if companypost is None:
        return jsonify({
            "error": "Company Post not found"
        }), 400 

    return jsonify(companypost.serialize()), 200


@api.route('/companypost/<int:companypost_id>', methods=['DELETE'])
def delete_companypost(companypost_id):

    companypost = CompanyPost.query.filter_by(id=companypost_id).first()
    if companypost is None:
        return jsonify({
            "error": "Company Post not found"
        }), 400 
    
    db.session.delete(companypost)
    db.session.commit()

    return jsonify({"message": "Company Post " + companypost.name + " deleted succesfully."}), 200

@api.route('/companypost', methods=['POST'])
def create_companypost():

    body = request.get_json()
    
   
    companypost = CompanyPost(**body)
    db.session.add(companypost)
    db.session.commit()

    response_body = {
        "message": "New Company Post created"
    }
    return jsonify(response_body), 200

@api.route('/companypost/<int:companypost_id>', methods=['PUT'])
def update_companypost(companypost_id):

    companypost = CompanyPost.query.filter_by(id=companypost_id).first()
    body = request.get_json()
    if companypost is None:
        return jsonify({
            "error": "Company Post not found"
        }), 400 
    
    companypost.message = body.get('message',companypost.message)
    companypost.image = body.get('image',companypost.image)
    companypost.post_date = body.get('post_date',companypost.post_date)
    
    db.session.commit()

    return jsonify(companypost.serialize()), 200

# =========================
# CRUD CONSOLE
# =========================

@api.route('/console', methods=['GET'])
def get_consoles():

    all_consoles = Console.query.all()
    results = list(map(lambda console: console.serialize(), all_consoles))

    return jsonify(results), 200

@api.route('/console/<int:console_id>', methods=['GET'])
def get_console(console_id):

    console = Console.query.filter_by(id=console_id).first()
    if console is None:
        return jsonify({
            "error": "Console not found"
        }), 400 

    return jsonify(console.serialize()), 200


@api.route('/console/<int:console_id>', methods=['DELETE'])
def delete_console(console_id):

    console = Console.query.filter_by(id=console_id).first()
    if console is None:
        return jsonify({
            "error": "Console not found"
        }), 400 
    
    db.session.delete(console)
    db.session.commit()

    return jsonify({"message": "Console " + console.name + " deleted succesfully."}), 200

@api.route('/console', methods=['POST'])
def create_console():

    body = request.get_json()
    console = Console.query.filter_by(name=body['name']).first()
    
    if console:
        return jsonify({
            "error": "This Console already exists"
        }), 401
    
    console = Console(**body)
    db.session.add(console)
    db.session.commit()

    response_body = {
        "message": "New Console created"
    }
    return jsonify(response_body), 200

@api.route('/console/<int:console_id>', methods=['PUT'])
def update_console(console_id):

    console = Console.query.filter_by(id=console_id).first()
    body = request.get_json()
    if console is None:
        return jsonify({
            "error": "Console not found"
        }), 400 
    
    console.name = body.get('name',console.name)
    console.price = body.get('price',console.price) 
    
    db.session.commit()

    return jsonify(console.serialize()), 200

# =========================
# GAME-CONSOLE
# =========================

@api.route('/gameconsole', methods=['GET'])
def get_gameconsoles():

    all_gameconsoles = db.session.query(GameConsole).options(
        joinedload(GameConsole.game),
        joinedload(GameConsole.console)
    ).all()

    results = list(map(lambda gameconsole: gameconsole.serialize(), all_gameconsoles))

    return jsonify(results), 200

@api.route('/gameconsole/<int:game_id>/<int:console_id>', methods=['POST'])
def add_game_console(game_id, console_id):

    exists = GameConsole.query.filter_by(game_id=game_id, console_id=console_id).first()
    
    if exists:
        return jsonify({"error": "This game is already assigned to this console"}), 400

    game = Game.query.get(game_id)
    if not game:
        return jsonify({"error": f"Game {game_id} not found"}), 404
    
    console = Console.query.get(console_id)
    if not console:
        return jsonify({"error": f"Console {console_id} not found"}), 404

    game_console = GameConsole(game_id=game_id, console_id=console_id)
    
    db.session.add(game_console)
    db.session.commit()

    response_body = {
        
            "message": "Success",
            "added": game_console.serialize()
        
    }
    return jsonify(response_body), 200

@api.route('/gameconsole/<int:gameconsole_id>', methods=['DELETE'])
def del_game_console(gameconsole_id):

    game_console = db.session.get(GameConsole, gameconsole_id)
    if not game_console:
        return jsonify({"error": f"Game in console {gameconsole_id} not found"}), 404
    
    
    db.session.delete(game_console)
    db.session.commit()

    response_body = {
        
            "message": "Successfully deleted"
        
    }
    return jsonify(response_body), 200

# =========================
# CONSOLE FAVORITES
# =========================

@api.route('/console/favorites/<int:user_id>', methods=['GET'])
def get_console_favorites(user_id):

    user_favorites = db.session.query(ConsoleFavorites).filter(
        ConsoleFavorites.user_id == user_id
    ).options(
        joinedload(ConsoleFavorites.user),
        joinedload(ConsoleFavorites.console)
    ).all()

    if not user_favorites:
        return jsonify({"msg": "No se encontraron favoritos para este usuario"}), 404

    results = list(map(lambda consolefavorites: consolefavorites.serialize(), user_favorites))

    return jsonify(results), 200

@api.route('/console/favorites/<int:user_id>/<int:console_id>', methods=['POST'])
def add_favorite_console(user_id, console_id):

    exists = ConsoleFavorites.query.filter_by(user_id=user_id, console_id=console_id).first()
    
    if exists:
        return jsonify({"error": "This console is already assigned to your favorites"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": f"Game {user_id} not found"}), 404
    
    console = Console.query.get(console_id)
    if not console:
        return jsonify({"error": f"Console {console_id} not found"}), 404

    console_favorite = ConsoleFavorites(user_id=user_id, console_id=console_id)
    
    db.session.add(console_favorite)
    db.session.commit()

    response_body = {
        
            "message": "Success",
            "added": console_favorite.serialize()
        
    }
    return jsonify(response_body), 200


@api.route('/console/favorites/<int:user_id>/<int:consolefavorites_id>', methods=['DELETE'])
def del_console_favorite(user_id, consolefavorites_id):

    favorite = db.session.get(ConsoleFavorites, consolefavorites_id)

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    if favorite.user_id != user_id:
        return jsonify({"error": "You are not authorized to delete this favorite"}), 403

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"message": "Successfully deleted from your favorites"}), 200


# =========================
# GAME FAVORITES
# =========================

@api.route('/game/favorites/<int:user_id>', methods=['GET'])
def get_game_favorites(user_id):

    user_favorites = db.session.query(GameFavorites).filter(
        GameFavorites.user_id == user_id
    ).options(
        joinedload(GameFavorites.user),
        joinedload(GameFavorites.game)
    ).all()

    if not user_favorites:
        return jsonify({"msg": "No se encontraron favoritos para este usuario"}), 404

    results = list(map(lambda gamefavorites: gamefavorites.serialize(), user_favorites))

    return jsonify(results), 200

@api.route('/game/favorites/<int:user_id>/<int:game_id>', methods=['POST'])
def add_favorite_game_admin(user_id, game_id):


    exists = GameFavorites.query.filter_by(user_id=user_id, game_id=game_id).first()
    
    if exists:
        return jsonify({"error": "This game is already assigned to your favorites"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": f"Game {user_id} not found"}), 404
    
    game = Game.query.get(game_id)
    if not game:
        return jsonify({"error": f"Game {game_id} not found"}), 404

    game_favorite = GameFavorites(user_id=user_id, game_id=game_id)
    
    db.session.add(game_favorite)
    db.session.commit()

    response_body = {
        
            "message": "Success",
            "added": game_favorite.serialize()
        
    }
    return jsonify(response_body), 200


@api.route('/game/favorites/<int:game_id>', methods=['POST', 'DELETE'])
@jwt_required()
def toggle_favorite(game_id):
    user_id = int(get_jwt_identity())
    
    # Buscamos si ya existe el favorito
    favorite = GameFavorites.query.filter_by(user_id=user_id, game_id=game_id).first()

    if request.method == 'DELETE' or (request.method == 'POST' and favorite):
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            return jsonify({"message": "Removed from favorites", "action": "removed"}), 200
        return jsonify({"error": "Favorite not found"}), 404

    # Si es POST y no existe, lo creamos
    new_fav = GameFavorites(user_id=user_id, game_id=game_id)
    db.session.add(new_fav)
    db.session.commit()
    return jsonify({"message": "Added to favorites", "action": "added"}), 201


@api.route('/game/favorites/<int:user_id>/<int:gamefavorites_id>', methods=['DELETE'])
def del_game_favorite(user_id, gamefavorites_id):

    favorite = db.session.get(GameFavorites, gamefavorites_id)

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    if favorite.user_id != user_id:
        return jsonify({"error": "You are not authorized to delete this favorite"}), 403

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"message": "Successfully deleted from your favorites"}), 200


# =========================
# USER LOGIN
# =========================

@api.route('/user/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"message": "Bad email or password"}), 401
    if password != user.password:
        return jsonify({"message": "Bad email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200

# =========================
# USER SIGN-UP
# =========================

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    if user is not None:
        return jsonify({"message": "This email already exists"}), 401
    
    user = User(**body)
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "User created correctly"
    }

    return jsonify(response_body), 201