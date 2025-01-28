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

### Installing Python on Windows

1. Download Python from the official website: https://www.python.org/downloads/windows/

2. Run the installer and make sure to check "Add Python to PATH" during installation

3. To verify Python is installed, open Command Prompt and run:
   ```bash
   python --version
   ```

4. If Python is not recognized, manually add it to PATH:
   - Search for "Edit system environment variables" in Windows search
   - Click "Environment Variables"
   - Under "System variables", find and select "Path"
   - Click "Edit" 
   - Click "New"
   - Add the Python installation path (typically something like):
     ```
     C:\Users\YourUsername\AppData\Local\Programs\Python\Python3xx\python.exe
     ```
   - Click "OK" on all windows to save changes
   - Restart Command Prompt for changes to take effect

5. After Python is properly installed, you can follow the backend setup instructions above to run the application

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