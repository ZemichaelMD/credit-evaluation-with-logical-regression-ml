import { MODEL_OPTIONS, getSelectedModel } from '../utils/modelStorage'

export default function Header() {
  const selectedModel = getSelectedModel()
  const modelName = MODEL_OPTIONS[selectedModel]

  return (
    <header className="ml-10 mr-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
        Credit Evaluation with Machine Learning
      </h1>
      <p className="mt-4 text-sm text-muted-foreground dark:text-gray-400">
        Currently using: <span className="font-medium">{modelName}</span>
      </p>
    </header>
  );
}
