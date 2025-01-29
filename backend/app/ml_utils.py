import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib
import json
from .models import ModelFactory

# Create models directory if it doesn't exist
MODEL_DIR = 'models'
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)
    
def get_column_options(df):
    """
    Takes a dataframe and returns a list of dictionaries containing each column name
    and its unique values as options.
    """
    try:
        options = []
        for column in df.columns:
            unique_values = df[column].unique().tolist()
            # Convert numpy types to native Python types for JSON serialization
            unique_values = [str(val) for val in unique_values]
            options.append({
                "name": column,
                "options": sorted(unique_values)
            })
        return options
    except Exception as e:
        raise Exception(f"Error getting column options: {str(e)}")

def load_and_train_model(train_df):
    try:
        # get the column options
        column_options = get_column_options(train_df)

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

        # get the column options
        column_options = get_column_options(train_df)
        
        return {
            "success": True,
            "message": "Model trained successfully",
            "accuracy": accuracy_score(y_train, y_pred),
            "confusion_matrix": confusion_matrix(y_train, y_pred),
            "classification_report": classification_report(y_train, y_pred),
            "column_options": column_options if column_options else []
        }
    except Exception as e:
        raise Exception(f"Training error: {str(e)}")

def load_and_evaluate_model(test_df, model_key='logistic_regression'):
    try:
        # get the column options
        column_options = get_column_options(test_df)

        # Load the selected model
        model = joblib.load(os.path.join(MODEL_DIR, f'{model_key}.pkl'))
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
        y_pred = model.predict(X_test_scaled)
        
        return {
            "accuracy": accuracy_score(y_test, y_pred),
            "confusion_matrix": confusion_matrix(y_test, y_pred),
            "classification_report": classification_report(y_test, y_pred),
            "column_options": column_options,
        }
    except Exception as e:
        raise Exception(f"Prediction error: {str(e)}")

def load_and_evaluate_single(eval_df, model_key='logistic_regression'):
    try:
        # Load the selected model
        model = joblib.load(os.path.join(MODEL_DIR, f'{model_key}.pkl'))
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
        predictions = model.predict(X_eval_scaled)
        
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


# evaluate a single row of data
def evaluate_single_row(row, model_key='logistic_regression'):
    try:
        # check if the row is a dictionary
        if not isinstance(row, dict):
            raise Exception("Row is not a dictionary")
        
        # check if it is empty
        if not row:
            raise Exception("Row is empty")
        
        # Read from evaluation_form_inputs.json
        with open(os.path.join(os.path.dirname(__file__), 'evaluation_form_inputs.json'), 'r') as f:
            column_options = json.load(f)
        
        # Collect validation errors for each field
        validation_errors = {}
        
        # Check for missing required fields and validate existing values
        for field in column_options:
            field_id = field['id']
            if field_id == 'class':  # Skip the class field as it's the target
                continue
                
            # Check if field is missing
            if field_id not in row or not row[field_id]:
                validation_errors[field_id] = "This field is required"
                continue
            
            # Validate field value
            value = row[field_id]
            if field['type'] == 'select':
                valid_values = [opt['value'] for opt in field['options']]
                if value not in valid_values:
                    validation_errors[field_id] = f"Invalid value. Must be one of: {', '.join(valid_values)}"
                    
            else:  # number type
                try:
                    # change to number and add it to the row
                    row[field_id] = float(value)
                except ValueError:
                    validation_errors[field_id] = "Must be a valid number"
            
            # if the field has a backendType of number, convert the value to a number
            if 'backendType' in field and field['backendType'] == 'number':
                try:
                    row[field_id] = float(value)
                except ValueError:
                    validation_errors[field_id] = "Must be a valid number"

        # If there are validation errors, return them
        if validation_errors:
            return {
                "success": False,
                "message": "Validation failed",
                "errors": validation_errors
            }

        # If validation passes, proceed with evaluation
        df = pd.DataFrame([row])
        results = load_and_evaluate_single(df, model_key)
        return {
            "success": True,
            "message": "Evaluation successful",
            "predictions": results["predictions"],
            "data": results["data"]
        }
            
    except FileNotFoundError:
        raise Exception("evaluation_form_inputs.json not found in backend/app directory")
    except Exception as e:
        print(e)
        raise Exception(f"Evaluation form error: {str(e)}")

def train_all_models(train_df):
    try:
        # Prepare data (reuse your existing preprocessing code)
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

        # Train all models
        models_performance = {}
        for model_name, model_key in ModelFactory.get_all_models().items():
            model = ModelFactory.get_model(model_key)
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_train_scaled)
            
            # Save model
            joblib.dump(model, os.path.join(MODEL_DIR, f'{model_key}.pkl'))
            
            # Calculate metrics
            models_performance[model_key] = {
                "name": model_name,
                "accuracy": accuracy_score(y_train, y_pred),
                "confusion_matrix": confusion_matrix(y_train, y_pred).tolist(),
                "classification_report": classification_report(y_train, y_pred)
            }

        # Save preprocessors
        joblib.dump(label_encoders, os.path.join(MODEL_DIR, 'label_encoders.pkl'))
        joblib.dump(scaler, os.path.join(MODEL_DIR, 'scaler.pkl'))

        return {
            "success": True,
            "message": "Models trained successfully",
            "models": models_performance
        }
    except Exception as e:
        raise Exception(f"Training error: {str(e)}")