import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib

# Create models directory if it doesn't exist
MODEL_DIR = 'models'
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

def load_and_train_model(train_df):
    try:
        # Apply label encoding to categorical columns
        label_encoders = {}
        for column in train_df.select_dtypes(include=['object']).columns:
            le = LabelEncoder()
            train_df[column] = le.fit_transform(train_df[column])
            label_encoders[column] = le

        # Fill missing values
        train_df = train_df.fillna(train_df.mean())

        # Split features and target
        X_train = train_df.drop('class', axis=1)
        y_train = train_df['class']

        # Scale the features
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)

        # Train logistic regression model
        logistic_regression = LogisticRegression(max_iter=1000, solver='lbfgs')
        logistic_regression.fit(X_train_scaled, y_train)

        # Save the model, encoders, and scaler
        joblib.dump(logistic_regression, os.path.join(MODEL_DIR, 'lg_model.pkl'))
        joblib.dump(label_encoders, os.path.join(MODEL_DIR, 'label_encoders.pkl'))
        joblib.dump(scaler, os.path.join(MODEL_DIR, 'scaler.pkl'))

        # evaluate the model and return the accuracy
        # Make predictions on training data
        y_pred = logistic_regression.predict(X_train_scaled)
        
        return {
            "success": True,
            "message": "Model trained successfully",
            "accuracy": accuracy_score(y_train, y_pred),
            "confusion_matrix": confusion_matrix(y_train, y_pred),
            "classification_report": classification_report(y_train, y_pred)
        }
    except Exception as e:
        raise Exception(f"Training error: {str(e)}")

def load_and_evaluate_model(test_df):
    try:
        # Load the model and encoders
        lg_model_loaded = joblib.load(os.path.join(MODEL_DIR, 'lg_model.pkl'))
        label_encoders = joblib.load(os.path.join(MODEL_DIR, 'label_encoders.pkl'))
        scaler = joblib.load(os.path.join(MODEL_DIR, 'scaler.pkl'))

        # Process test data similarly to training data
        for column in test_df.select_dtypes(include=['object']).columns:
            if column in label_encoders:
                le = label_encoders[column]
                test_df[column] = le.transform(test_df[column])

        # Fill missing values
        test_df = test_df.fillna(test_df.mean())
        
        # Split features and target
        X_test = test_df.drop('class', axis=1)
        y_test = test_df['class']

        # Scale features
        X_test_scaled = scaler.transform(X_test)

        # Make predictions
        y_pred = lg_model_loaded.predict(X_test_scaled)
        
        return {
            "accuracy": accuracy_score(y_test, y_pred),
            "confusion_matrix": confusion_matrix(y_test, y_pred),
            "classification_report": classification_report(y_test, y_pred)
        }
    except Exception as e:
        raise Exception(f"Prediction error: {str(e)}")

def load_and_evaluate_single(eval_df):
    try:
        # Load the model and encoders
        lg_model_loaded = joblib.load(os.path.join(MODEL_DIR, 'lg_model.pkl'))
        label_encoders = joblib.load(os.path.join(MODEL_DIR, 'label_encoders.pkl'))
        scaler = joblib.load(os.path.join(MODEL_DIR, 'scaler.pkl'))

        # Make a copy of the original data to return
        original_data = eval_df.copy()

        # Process data similarly to training data
        for column in eval_df.select_dtypes(include=['object']).columns:
            if column in label_encoders:
                le = label_encoders[column]
                eval_df[column] = le.transform(eval_df[column])

        # Fill missing values
        eval_df = eval_df.fillna(eval_df.mean())
        
        # Prepare features
        X_eval = eval_df.drop('class', axis=1) if 'class' in eval_df.columns else eval_df
        
        # Scale features
        X_eval_scaled = scaler.transform(X_eval)

        # Make predictions
        predictions = lg_model_loaded.predict(X_eval_scaled)
        
        # Convert predictions to "Good" or "Bad"
        prediction_labels = ["Good" if pred == 1 else "Bad" for pred in predictions]
        
        # Prepare the data for return
        result_data = original_data.to_dict('records')
        for idx, row in enumerate(result_data):
            row['prediction'] = prediction_labels[idx]
            
        return {
            "predictions": prediction_labels,
            "data": result_data
        }
    except Exception as e:
        raise Exception(f"Evaluation error: {str(e)}")
