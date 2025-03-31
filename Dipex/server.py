from flask import Flask, render_template, request, jsonify
import predict_disease  # Your Python prediction script

app = Flask(__name__)

# Serve the frontend
@app.route('/')
def home():
    return render_template('index.html')

# API endpoint for predictions
@app.route('/predict', methods=['POST'])
def predict():
    symptoms = request.json.get('symptoms')
    # Call your Python prediction logic
    result = predict_disease.predict(symptoms)
    return jsonify({'disease': result})

if __name__ == '__main__':
    app.run(debug=True)