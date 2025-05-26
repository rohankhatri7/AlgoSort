from flask import Flask, request, jsonify
from algorithms import get_algorithm
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route('/sort', methods=['POST'])
def sort():
    data = request.json
    arr = data['array']
    algo = data['algorithm']
    algo_func = get_algorithm(algo)
    if not algo_func:
        return jsonify({'error': 'Algorithm not found'}), 400
    steps = algo_func(arr)
    return jsonify({'steps': steps})

if __name__ == '__main__':
    app.run(debug=True) 