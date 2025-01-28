## ********** THE PROJECT **********

A web app that uses logical regression (machine learning) to evaluate credit.

### Backend

The backend is a FastAPI application that runs on port 8000. It serves as the core engine handling all business logic, data processing, and API endpoints for the application.

#### Setup Environment, install dependencies and run the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

> **Note:** To exit the virtual environment and return to your system's default Python environment, run: `deactivate`

---

### Frontend

The frontend is a React application that runs on port 5173. It is the main application that handles the UI for the application.

```bash
cd frontend
npm install
npm run dev
```

---

### Sample Data

There are two sample data files in the `data` folder.

- `training_data.csv` is a CSV file containing sample data for the training of the machine learning model.
- `test_data.csv` is a CSV file containing sample data to test the machine learning model after training.

> **Note:** The data is in the format of a CSV file with 21 instances.