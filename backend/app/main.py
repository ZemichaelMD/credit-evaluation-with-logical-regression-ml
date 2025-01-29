from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from .ml_utils import load_and_train_model, load_and_evaluate_model, load_and_evaluate_single, evaluate_single_row, train_all_models
import json
import pandas as pd
import io

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/train")
async def train_model(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        results = train_all_models(df)
        return results
    except Exception as e:
        return {"success": False, "message": str(e)}

@app.post("/predict")
async def predict(file: UploadFile = File(...), model_key: str = Form('logistic_regression')):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        results = load_and_evaluate_model(df, model_key)
        return {
            "success": True,
            "accuracy": results["accuracy"],
            "confusion_matrix": results["confusion_matrix"].tolist(),
            "classification_report": results["classification_report"],
            "column_options": results["column_options"]
        }
    except Exception as e:
        return {"success": False, "message": str(e)}

@app.post("/evaluate")
async def evaluate(file: UploadFile = File(...), model_key: str = Form('logistic_regression')):
    try:
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        results = load_and_evaluate_single(df, model_key)
        return {
            "success": True,
            "predictions": results["predictions"],
            "data": results["data"]
        }
    except Exception as e:
        return {"success": False, "message": str(e)}

@app.post("/evaluate-credit")
async def evaluate_credit(
    form_data: dict,
    model_key: str = Form('logistic_regression')
):
    try:
        results = evaluate_single_row(form_data, model_key)
        if results["success"]:
            return {
                "success": True,
                "message": results["message"],
                "predictions": results["predictions"],
                "data": results["data"]
            }
        else:
            return {
                "success": False,
                "message": results["message"],
                "errors": results["errors"]
            }
    except Exception as e:
        return {"success": False, "message": str(e)}