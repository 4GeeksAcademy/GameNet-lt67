"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Administrator
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

