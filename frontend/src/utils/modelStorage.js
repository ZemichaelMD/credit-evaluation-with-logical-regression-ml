const MODEL_STORAGE_KEY = 'selected_credit_model';

export const getSelectedModel = () => {
  return localStorage.getItem(MODEL_STORAGE_KEY) || 'logistic_regression'; // default model
};

export const setSelectedModel = (modelKey) => {
  localStorage.setItem(MODEL_STORAGE_KEY, modelKey);
};

export const MODEL_OPTIONS = {
  'logistic_regression': 'Logistic Regression',
  'random_forest': 'Random Forest',
  'svm': 'Support Vector Machine',
  'decision_tree': 'Decision Tree'
}; 