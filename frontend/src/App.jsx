import { useState } from "react";
import TrainingTab from "./components/TrainingTab";
import PredictionTab from "./components/PredictionTab";
import EvaluationTab from "./components/EvaluationTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import Footer from "./components/Footer";
import { useDarkMode } from "./providers/DarkModeProvider";
import Header from "./components/Header";
import CreditEvaluationForm from "./components/CreditEvaluationForm";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("training");

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Tabs defaultValue="training" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 gap-4 w-full">
            <TabsTrigger 
              value="training"
              className={`${
                activeTab === "training" 
                  ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } px-4 py-2 rounded-lg transition-colors`}
            >
              Training
            </TabsTrigger>
            <TabsTrigger 
              value="prediction"
              className={`${
                activeTab === "prediction" 
                  ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } px-4 py-2 rounded-lg transition-colors`}
            >
              Test Model
            </TabsTrigger>
            <TabsTrigger 
              value="evaluation"
              className={`${
                activeTab === "evaluation" 
                  ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } px-4 py-2 rounded-lg transition-colors`}
            >
              Evaluate Dataset
            </TabsTrigger>
            <TabsTrigger 
              value="credit-evaluation"
              className={`${
                activeTab === "credit-evaluation" 
                  ? "bg-indigo-600 text-white dark:bg-indigo-500" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              } px-4 py-2 rounded-lg transition-colors`}
            >
              Credit Evaluation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="training">
            <TrainingTab />
          </TabsContent>

          <TabsContent value="prediction">
            <PredictionTab />
          </TabsContent>

          <TabsContent value="evaluation">
            <EvaluationTab />
          </TabsContent>

          <TabsContent value="credit-evaluation">
            <CreditEvaluationForm />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

export default App;
