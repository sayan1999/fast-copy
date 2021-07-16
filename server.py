#!/usr/bin/python3
# serve.py
from datetime import datetime
from flask import Flask, jsonify, request
from flask import render_template
from clip import enlistcopy

globalsync=datetime.now()

import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

import socket

print(f'----------------Visit http://{socket.gethostbyname(socket.gethostname())}:5000 on browser-----------')
# creates a Flask application, named app
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# a route where we will display a welcome message via an HTML template
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/sync")
def fetchsync():
    return jsonify([globalsync])

@app.route("/fetch")
def fetch():
    return jsonify(enlistcopy())

@app.route("/posttext", methods=['POST'])
def posttext():
    global globalsync
    globalsync=datetime.now()
    return jsonify(enlistcopy(request.json['text']))

# run the application
if __name__ == "__main__":
    app.run(host="0.0.0.0")