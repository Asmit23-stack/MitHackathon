import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Load the dataset
train_df = pd.read_csv(r"C:\Users\sujal\OneDrive - SS tech\PROGRAMMING\Dipex\TEST 3\data\Training.csv").iloc[:, :-1]  # Remove the last unnecessary column

# Extract features and target
X = train_df.iloc[:, :-1]  # Symptoms
y = train_df["prognosis"]  # Disease

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# List of all possible symptoms
all_symptoms = X.columns.tolist()

def predict_disease(user_symptoms):
    """
    Predicts the disease based on user-provided symptoms.
    
    Parameters:
    user_symptoms (list): List of symptoms selected by the user (between 12 and 61).
    
    Returns:
    str: Predicted disease.
    """
    if not (12 <= len(user_symptoms) <= 61):
        return "Please enter between 12 and 61 symptoms."
    
    # Create an input array initialized to 0
    input_data = np.zeros(len(all_symptoms))
    
    # Set 1 for symptoms the user has entered
    for symptom in user_symptoms:
        if symptom in all_symptoms:
            input_data[all_symptoms.index(symptom)] = 1
    
    # Reshape for prediction
    input_data = input_data.reshape(1, -1)
    
    # Predict disease
    predicted_disease = model.predict(input_data)[0]
    return predicted_disease

if __name__ == "__main__":
    print("Enter symptoms separated by commas (at least 12, max 61):")
    user_input = input().split(",")
    user_input = [symptom.strip() for symptom in user_input]
    result = predict_disease(user_input)
    print("Predicted Disease:", result)
