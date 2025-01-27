import TrainingTab from "./components/TrainingTab";
import PredictionTab from "./components/PredictionTab";
import EvaluationTab from "./components/EvaluationTab";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import Footer from "./components/Footer";
import { useDarkMode } from "./providers/DarkModeProvider";
import Header from "./components/Header";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      id="content-all"
      className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <Header />
      
      <div className="container py-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
          >
            {isDarkMode ? "🌙" : "☀️"} {isDarkMode ? "Is Now Dark" : "Is Now Light"}
          </button>
        </div>
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-4">
            <TabsTrigger
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
              value="training"
            >
              Training
            </TabsTrigger>
            <TabsTrigger
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
              value="prediction"
            >
              Test Model
            </TabsTrigger>
            <TabsTrigger
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
              value="evaluation"
            >
              Evaluation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="mt-6">
            <TrainingTab />
          </TabsContent>

          <TabsContent value="prediction" className="mt-6">
            <PredictionTab />
          </TabsContent>

          <TabsContent value="evaluation" className="mt-6">
            <EvaluationTab />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default App;
