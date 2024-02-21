from flask import Flask, request, jsonify
from flask_cors import CORS

#app instance
app = Flask(__name__)
CORS(app)
#route
@app.route('/api/home', methods=['GET'])
def return_home():
	return jsonify({'data': 'Hello World!'})

if __name__ == '__main__':
	app.run(debug=True, port=8080)