from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier

class ModelFactory:
    @staticmethod
    def get_model(model_name):
        models = {
            'logistic_regression': LogisticRegression(max_iter=1000, solver='lbfgs'),
            'random_forest': RandomForestClassifier(n_estimators=100, random_state=42),
            'svm': SVC(kernel='rbf', probability=True),
            'decision_tree': DecisionTreeClassifier(random_state=42)
        }
        return models.get(model_name)

    @staticmethod
    def get_all_models():
        return {
            'Logistic Regression': 'logistic_regression',
            'Random Forest': 'random_forest',
            'Support Vector Machine': 'svm',
            'Decision Tree': 'decision_tree'
        } 