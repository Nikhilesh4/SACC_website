from flask import Flask, request, redirect, url_for, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
	return jsonify({'data': 'Hello World!'})

if __name__ == '__main__':
	    app.run(debug=True, host="0.0.0.0", port=80)

# Other routes and app configuration
